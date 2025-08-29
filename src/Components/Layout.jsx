// src/Components/Layout.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { routeMap } from '../routes';

const getTabName = (route) => {
  if (!route?.name) return 'Untitled';
  return route.name.includes('>') ? route.name.split('>').pop().trim() : route.name.trim();
};

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const [tabs, setTabs] = useState(() => {
    const saved = localStorage.getItem('tabs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((tab) => {
          const route = routeMap[tab.path];
          return route ? { name: getTabName(route), path: route.path } : null;
        }).filter(Boolean);
      } catch {
        return [{ name: 'Dashboard', path: '/dashboard' }];
      }
    }
    return [{ name: 'Dashboard', path: '/dashboard' }];
  });

  const [activePath, setActivePath] = useState(() => localStorage.getItem('activeTab') || '/dashboard');

  useEffect(() => {
    const route = routeMap[location.pathname];
    if (route) {
      if (!tabs.some((tab) => tab.path === location.pathname)) {
        setTabs([...tabs, { name: getTabName(route), path: location.pathname }]);
      }
      setActivePath(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
    localStorage.setItem('activeTab', activePath);
  }, [tabs, activePath]);

  const openTab = (path) => {
    const route = routeMap[path];
    if (!route) return;

    if (!tabs.some((tab) => tab.path === path)) {
      setTabs([...tabs, { name: getTabName(route), path }]);
    }
    setActivePath(path);
    navigate(path);
  };

  const closeTab = (path) => {
    const filtered = tabs.filter((tab) => tab.path !== path);
    setTabs(filtered);

    if (activePath === path) {
      if (filtered.length > 0) {
        navigate(filtered[filtered.length - 1].path);
      } else {
        navigate('/dashboard');
        setTabs([{ name: 'Dashboard', path: '/dashboard' }]);
      }
    }
  };

  // ✅ New logout handler
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('selectedBranch');
    localStorage.removeItem('tabs');
    localStorage.removeItem('activeTab');

    navigate('/login', { replace: true });
  };

  return (
    <div className="flex flex-col h-screen">
      <Topbar 
        openTab={openTab} 
        onToggleSidebar={() => setCollapsed(!collapsed)}
        onLogout={handleLogout} // ✅ Pass it to Topbar!
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onSubItemClick={openTab}
          activePath={activePath}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="bg-gray-100 p-2 border-b overflow-x-auto whitespace-nowrap flex no-scrollbar">
            {tabs.map((tab) => (
              <div
                key={tab.path}
                className={`inline-flex items-center px-4 py-1 mr-2 rounded-t-md cursor-pointer ${
                  activePath === tab.path ? 'bg-white border-t border-l border-r' : 'bg-gray-300'
                }`}
                onClick={() => navigate(tab.path)}
              >
                <span className="mr-1">{tab.name}</span>
                {tab.path !== '/dashboard' && (
                  <button
                    className="relative flex items-center justify-center w-5 h-5 ml-3 text-sm text-gray-700 hover:text-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.path);
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Routes */}
          <div className="flex-1 overflow-y-auto p-4">
            <Routes>
              {Object.entries(routeMap).map(([path, { component: Component }]) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
