import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaChevronDown, FaChevronUp,
  FaChevronLeft, FaChevronRight,
  FaUser, FaMoneyCheckAlt, FaWallet, FaImage,
  FaCogs, FaSyncAlt, FaExchangeAlt, FaMoon,
  FaBook, FaBox, FaPercent, FaDatabase
} from 'react-icons/fa';

const menuItems = [
  { label: 'Customer Management', icon: <FaUser />, subItems: [
    { name: 'View Customers', path: '/view-customers' },
    { name: 'Clients List', path: '/clients-list' },
  ]},
  { label: 'Deposits', icon: <FaMoneyCheckAlt />, subItems: [
    { name: 'Make Deposit', path: '/make-deposit' },
    { name: 'Deposit History', path: '/deposit-history' }
  ]},
  { label: 'Advance & Collateral', icon: <FaWallet />, subItems: [
    { name: 'Request Advance', path: '/request-advance' },
    { name: 'View Collateral', path: '/view-collateral' }
  ]},
  { label: 'Image Uploads', icon: <FaImage />, subItems: [
    { name: 'Upload Image', path: '/upload-image' },
    { name: 'View Files', path: '/view-files' }
  ]},
  { label: 'Loan Settings', icon: <FaCogs />, subItems: [
    { name: 'Loan Products', path: '/loan-products' },
    { name: 'Rates & Terms', path: '/rates-and-terms' }
  ]},
  { label: 'Loan Processing', icon: <FaSyncAlt />, subItems: [
    { name: 'Apply Loan', path: '/apply-loan' },
    { name: 'Approve Loan', path: '/approve-loan' }
  ]},
  { label: 'Transactions', icon: <FaExchangeAlt />, subItems: [
    { name: 'All Transactions', path: '/all-transactions' },
    { name: 'Failed Transactions', path: '/failed-transactions' }
  ]},
  { label: 'Nightly Processing', icon: <FaMoon />, subItems: [
    { name: 'Schedule Processing', path: '/schedule-processing' },
    { name: 'Night Reports', path: '/night-reports' }
  ]},
  { label: 'General Ledger', icon: <FaBook />, subItems: [
    { name: 'Ledger View', path: '/ledger-view' },
    { name: 'Add Entry', path: '/add-entry' }
  ]},
  { label: 'Products', icon: <FaBox />, subItems: [
    { name: 'Add Product', path: '/add-product' },
    { name: 'Manage Products', path: '/manage-products' }
  ]},
  { label: 'Charges & Rates', icon: <FaPercent />, subItems: [
    { name: 'Add Charge', path: '/add-charge' },
    { name: 'Interest Config', path: '/interest-config' }
  ]},
  { label: 'Static Data', icon: <FaDatabase />, subItems: [
    { name: 'Lookup Tables', path: '/lookup-tables' },
    { name: 'System Settings', path: '/system-settings' }
  ]},
];

const Sidebar = ({ activePath }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="relative h-full">
      <div
        className={`bg-gray-800 text-white transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        } h-full flex flex-col`}
      >
        <div className="flex justify-center items-center p-4 border-b border-gray-700">
          {!collapsed && <h1 className="text-lg font-bold">Dashboard</h1>}
        </div>

        <ul className="flex-1 overflow-y-auto">
          {menuItems.map(({ label, icon, subItems }) => {
            const isOpen = openMenus[label];
            return (
              <li key={label} className="mb-1">
                <div
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => toggleMenu(label)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{icon}</span>
                    {!collapsed && <span>{label}</span>}
                  </div>
                  {!collapsed && (
                    isOpen ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />
                  )}
                </div>

                {!collapsed && isOpen && (
                  <ul className="ml-10 mt-1 space-y-1 text-sm">
                    {subItems.map((sub) => (
                      <li
                        key={sub.path}
                        className={`hover:bg-gray-700 p-1 rounded cursor-pointer ${
                          activePath === sub.path ? 'bg-blue-600 text-white' : ''
                        }`}
                        onClick={() => navigate(sub.path)}
                      >
                        {sub.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Collapse/Expand Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-1/2 -right-3 transform -translate-y-1/2 
                   bg-gray-700 text-white p-1 rounded-full shadow-lg hover:bg-gray-600"
      >
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
    </div>
  );
};

export default Sidebar;
