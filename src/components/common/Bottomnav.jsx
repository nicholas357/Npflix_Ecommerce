import React from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import firebase from 'firebase/app';
import 'firebase/auth';
import { useEffect, useState } from 'react';

const Bottomnav = () => {
  const history = useHistory(); // Initialize history
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed z-50 w-full h-20 max-w-lg -translate-x-1/2 bg-white border border-gray-400 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600 md:hidden"> 
      {/* md:hidden hides the component on medium screens and above */}
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {/* Home Button */}
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={() => history.push('/')} // Navigate to home
        >
          <svg className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
        </button>
        <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Home
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        {/* Shop Button */}
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={() => history.push('/shop')} // Navigate to shop
        >
          <svg className="w-11 h-11 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M16 6h-2.293l-1.853-1.854A.5.5 0 0 0 11.5 4h-3a.5.5 0 0 0-.354.146L6.293 6H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2ZM7.5 8h5a.5.5 0 0 1 .354.146L13.707 9H6.293l.853-.854A.5.5 0 0 1 7.5 8ZM4 10h12v7H4v-7Z" />
          </svg>
        </button>
        <div id="tooltip-shop" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Shop
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        {/* Profile Button */}
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={() => history.push(isLoggedIn ? '/account' : '/signin')}
        >
          <svg className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Bottomnav;
