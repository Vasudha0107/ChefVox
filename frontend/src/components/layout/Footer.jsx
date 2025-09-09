import React from 'react';
import { ChefHat, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <ChefHat size={24} className="text-primary-500" />
              <span className="text-xl font-bold">VoiceChef</span>
            </Link>
            <p className="mt-2 text-neutral-300 max-w-md">
              Your voice-guided cooking assistant that makes cooking easy and fun
              with step-by-step audio instructions and voice commands.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                Explore
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-neutral-300 hover:text-primary-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/recipes" className="text-neutral-300 hover:text-primary-500">
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link to="/ingredient-search" className="text-neutral-300 hover:text-primary-500">
                    Ingredient Search
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-neutral-300 hover:text-primary-500">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-300 hover:text-primary-500">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-300 hover:text-primary-500">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-400">
            &copy; {new Date().getFullYear()} VoiceChef. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0 text-sm text-neutral-400">
            Made with <Heart size={16} className="text-primary-500 mx-1" /> using MERN Stack
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;