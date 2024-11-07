// DropdownMenu.jsx
import React, { useState, useRef, useEffect } from 'react';
import { RiNetflixFill } from "react-icons/ri";
import { FaAppStoreIos } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import { FaSteamSquare } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";
import { FaPlaystation } from "react-icons/fa";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Listen for clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 px-8 py-4 bg-white text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          More
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-opacity duration-300 ease-in-out">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="https://www.netflix.com" className="flex items-center block px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300">
              <RiNetflixFill className="mr-2 w-8 h-8" />
              Netflix
            </a>
            <a href="https://www.apple.com" className="flex items-center block px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300">
              <FaAppStoreIos className="mr-2 w-8 h-8" />
              Apple
            </a>
            <a href="https://www.epicgames.com" className="flex items-center block px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300">
              <SiEpicgames className="mr-2 w-8 h-8" />
              Epic Games
            </a>
            <a href="https://store.steampowered.com" className="flex items-center block px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300">
              <FaSteamSquare className="mr-2 w-8 h-8" />
              Steam Store
            </a>
            <a href="https://www.microsoft.com" className="flex items-center block px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300">
              <FaMicrosoft className="mr-2 w-8 h-8" />
              Microsoft
            </a>
            <a href="https://www.playstation.com" className="flex items-center block px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300">
              <FaPlaystation className="mr-2 w-8 h-8" />
              PlayStation
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
