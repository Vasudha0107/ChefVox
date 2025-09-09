// backend/routes/imageProxy.js
import express from 'express';
import axios from 'axios';
import { URL } from 'url';

const router = express.Router();

// simple whitelist — expand as you trust hosts you will fetch images from
const HOST_WHITELIST = [
  'images.pexels.com',
  'images.unsplash.com',
  'pixabay.com',
  'cdn.pixabay.com',
  'images.unsplash.com',
  'images.pexels.com',
  'i.pximg.net',
  'archanaskitchen.com',
  'tarladalal.com',
  'static.toiimg.com',
  'www.archanaskitchen.com'
];

function isAllowedUrl(u) {
  try {
    const parsed = new URL(u);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    return HOST_WHITELIST.some(h => parsed.hostname.endsWith(h));
  } catch {
    return false;
  }
}

router.get('/', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('Missing url');

  if (!isAllowedUrl(url)) {
    return res.status(403).send('Image host not allowed.');
  }

  try {
    // Stream remote image to client (relay). Set a short timeout.
    const r = await axios.get(url, {
      responseType: 'stream',
      timeout: 10000,
      headers: {
        // some hosts require a referer; you can adjust or add a referer header
        // 'Referer': 'https://yourdomain.example' 
      }
    });

    // Copy content-type and cache headers
    res.setHeader('Content-Type', r.headers['content-type'] || 'image/*');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // cache 1 day
    r.data.pipe(res);
  } catch (err) {
    console.warn('Image proxy error for', url, err?.message || err);
    // fallback to a local/default image URL (you can host this in frontend/public)
    res.redirect('/fallback-images/fallback.jpg'); // ensure this exists in your frontend public folder
  }
});

export default router;
