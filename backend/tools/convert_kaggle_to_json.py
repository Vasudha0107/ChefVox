# backend/tools/convert_kaggle_to_json.py
import pandas as pd
import json
import os
import sys

# Set paths
DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
os.makedirs(DATA_DIR, exist_ok=True)

# Find CSV file in data dir (simple heuristic)
files = [f for f in os.listdir(DATA_DIR) if f.lower().endswith('.csv')]
if not files:
    print("No CSV file found in backend/data. Please put the Kaggle csv there.")
    sys.exit(1)

csv_path = os.path.join(DATA_DIR, files[0])
print("Using CSV:", csv_path)

df = pd.read_csv(csv_path, low_memory=False)

def first_existing(row, candidates):
    for c in candidates:
        if c in row and pd.notna(row[c]) and str(row[c]).strip() != '':
            return row[c]
    return None

records = []
for idx, row in df.iterrows():
    # Name/title
    name = first_existing(row, ['name','title','recipe_name','recipe']) or f"Recipe {idx+1}"
    name = str(name).strip()

    # Description
    description = first_existing(row, ['description','summary','desc']) or ''

    # Ingredients: try common column names
    ingr_raw = first_existing(row, ['ingredients','ingredient','ingr','ingredients_list','ingredient_list'])
    ingredients = []
    if isinstance(ingr_raw, str) and ingr_raw.strip():
        # split by newline, semicolon, pipe, or comma (try best)
        parts = []
        if '\n' in ingr_raw:
            parts = [p.strip() for p in ingr_raw.splitlines() if p.strip()]
        elif ';' in ingr_raw:
            parts = [p.strip() for p in ingr_raw.split(';') if p.strip()]
        elif '|' in ingr_raw:
            parts = [p.strip() for p in ingr_raw.split('|') if p.strip()]
        else:
            # last resort split by comma but keep items with parentheses intact
            parts = [p.strip() for p in ingr_raw.split(',') if p.strip()]

        for p in parts:
            ingredients.append({"name": p, "quantity": "to taste"})
    else:
        # maybe ingredients are in JSON or list-like
        ingredients = []

    # Steps / instructions
    steps_raw = first_existing(row, ['instructions','steps','direction','directions','method','preparation'])
    steps = []
    if isinstance(steps_raw, str) and steps_raw.strip():
        # try to split into sentences (simple)
        parts = [s.strip() for s in steps_raw.split('.') if s.strip()]
        for p in parts:
            steps.append({"instruction": p, "duration": 0})
    else:
        # no steps available in dataset
        steps = []

    # times and other fields
    prepTime = 0
    cookTime = 0
    try:
        prepTime = int(first_existing(row, ['prepTime','prep_time','preptime','prep_minutes']) or 0)
    except:
        prepTime = 0
    try:
        cookTime = int(first_existing(row, ['cookTime','cook_time','cooktime','cook_minutes']) or 0)
    except:
        cookTime = 0

    servings = 4
    try:
        servings = int(first_existing(row, ['servings','yield','serves']) or 4)
    except:
        servings = 4

    difficulty = (first_existing(row, ['difficulty','level']) or 'easy').lower()
    if difficulty not in ['easy','medium','hard']:
        difficulty = 'easy'

    cuisine = first_existing(row, ['cuisine','region','origin']) or 'Indian'

    # tags/categories mapping: try to map to 'veg'/'non-veg' and 'starter'/'main'/'dessert'
    cat = first_existing(row, ['category','tags','course','dish_type']) or ''
    tags = []
    if isinstance(cat, str):
        low = cat.lower()
        if 'veg' in low or 'vegetarian' in low or 'veggie' in low:
            tags.append('veg')
        if 'non' in low or 'chicken' in low or 'mutton' in low or 'fish' in low or 'egg' in low:
            tags.append('non-veg')
        if 'starter' in low or 'snack' in low or 'appetizer' in low:
            tags.append('starter')
        if 'main' in low or 'entree' in low or 'lunch' in low or 'dinner' in low:
            tags.append('main')
        if 'dessert' in low or 'sweet' in low:
            tags.append('dessert')

    if not tags:
        # fallback guess from name/ingredients
        name_l = name.lower()
        if any(x in name_l for x in ['cake','kheer','gulab','jalebi','halwa','dessert','sweet']):
            tags.append('veg'); tags.append('dessert')
        elif any(x in name_l for x in ['soup','tikki','starter','pakora','chaat','kebab','tikka','cutlet']):
            tags.append('veg'); tags.append('starter')
        else:
            tags.append('veg'); tags.append('main')

    rec = {
        "name": name,
        "description": description,
        "prepTime": prepTime,
        "cookTime": cookTime,
        "servings": servings,
        "difficulty": difficulty,
        "cuisine": cuisine,
        "ingredients": ingredients,
        "steps": steps,
        "image": "",
        "tags": tags
    }
    records.append(rec)

# Write JSON
out_path = os.path.join(DATA_DIR, 'recipes.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(records, f, indent=2, ensure_ascii=False)

print(f"Wrote {len(records)} recipes to {out_path}")
