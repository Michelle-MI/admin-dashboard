import React from 'react';
import { FaBell, FaCaretDown } from 'react-icons/fa';

const Topbar = ({ openTab, onLogout }) => {
  return (
    <div className="w-full h-12 px-4 bg-gray-900 text-white flex justify-between items-center">
      {/* Left: Logo + version + nav items */}
      <div className="flex items-center gap-6">
        {/* Logo + version */}
        <div className="font-bold text-lg">
          Bank App <span className="text-gray-400 text-xs">v3.1</span>
        </div>

        {/* Navigation items */}
        <div className="flex items-center gap-4 text-sm">
          <span
            className="hover:text-gray-300 cursor-pointer"
            onClick={() => openTab('/dashboard')}
          >
            Platform
          </span>
          <span className="hover:text-gray-300 cursor-pointer">Mall</span>
          <span className="hover:text-gray-300 cursor-pointer">Finance</span>
          <span className="hover:text-gray-300 cursor-pointer">Mobile phone</span>
        </div>
      </div>

      {/* Right: Notification + User + Logout */}
      <div className="flex items-center gap-6 text-sm">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FaBell className="text-lg" />
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
            1
          </span>
        </div>

        {/* User section */}
        <div className="flex items-center gap-1 cursor-pointer">
          <span>Admin</span>
          <FaCaretDown />
        </div>

        {/* Logout button */}
        <button
          onClick={onLogout}
          className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
