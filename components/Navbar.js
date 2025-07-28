"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

// SVG Icons
const Icons = {
  Menu: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  ),
  Notification: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  ),
  User: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  ChevronDown: () => (
    <svg
      className="w-4 h-4 ml-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  ),
};

export default function Navbar({ onMenuToggle, pageTitle = "Dashboard", user, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    onLogout();
  };

  return (
    <header className="bg-white border-b border-secondary-200 shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md text-secondary-500 hover:text-secondary-700 hover:bg-primary-50 transition-colors"
          >
            <span className="sr-only">Open sidebar</span>
            <Icons.Menu />
          </button>
          
          {/* Page title */}
          <h2 className="text-lg font-semibold text-secondary-900 hidden sm:block">
            {pageTitle}
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-primary-50 rounded-md transition-colors relative">
            <Icons.Notification />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User Menu */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center p-2 text-secondary-500 hover:text-secondary-700 hover:bg-primary-50 rounded-md transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-sm font-medium text-secondary-900">
                      {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="hidden md:block text-left mr-2">
                    <p className="text-sm font-medium text-secondary-900 truncate">
                      {user.name || 'User'}
                    </p>
                    <p className="text-xs text-secondary-500 truncate">
                      {user.email || ''}
                    </p>
                  </div>
                </div>
                <Icons.ChevronDown />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 py-1">
                  <div className="px-4 py-2 border-b border-secondary-200 md:hidden">
                    <p className="text-sm font-medium text-secondary-900 truncate">
                      {user.name || 'User'}
                    </p>
                    <p className="text-xs text-secondary-500 truncate">
                      {user.email || ''}
                    </p>
                  </div>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-secondary-700 hover:bg-primary-50 hover:text-secondary-900"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile Settings
                  </a>
                  <button
                    onClick={handleLogoutClick}
                    className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-primary-50 hover:text-secondary-900"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
