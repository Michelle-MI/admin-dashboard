import React from 'react';

const Tabs = ({ tabs, activeTab, onTabClick, onCloseTab }) => {
  return (
    <div className="w-full overflow-x-auto whitespace-nowrap border-b bg-gray-100 px-2 py-2 flex gap-2">
      {tabs.map((tab) => (
        <div
          key={tab.path}
          className={`flex items-center px-4 py-2 rounded-md text-sm cursor-pointer shadow-sm transition-all 
            ${activeTab === tab.path ? 'bg-white border text-black' : 'bg-gray-200 text-gray-600'}
          `}
          onClick={() => onTabClick(tab.path)}
        >
          <span className="mr-1">{tab.title}</span>

          {tab.path !== '/dashboard' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.path);
              }}
              className="relative flex items-center justify-center w-5 h-5 ml-3 text-sm text-gray-700 hover:text-black transition-colors duration-200 focus:outline-none"
            >
              <span className="relative z-10 leading-none">×</span>
              <span className="absolute inset-0 rounded-full hover:bg-gray-300 transition duration-200"></span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
