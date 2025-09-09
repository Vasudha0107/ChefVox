import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <img
        src="https://images.pexels.com/photos/6248985/pexels-photo-6248985.jpeg"
        alt="404 Error"
        className="w-64 h-64 object-cover rounded-full mb-8 shadow-lg"
      />
      <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
      <p className="text-neutral-600 mb-8 max-w-md">
        The recipe you're looking for seems to have gone missing. Let's get you back to the kitchen!
      </p>
      <Link to="/" className="btn-primary flex items-center">
        <HomeIcon size={20} className="mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;