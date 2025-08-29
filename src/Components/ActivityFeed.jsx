// components/ActivityFeed.jsx
import React from 'react';

const mockActivity = [
  { id: 1, message: 'Admin John approved a loan.', time: '5 mins ago' },
  { id: 2, message: 'Customer Mary uploaded ID proof.', time: '30 mins ago' },
  { id: 3, message: 'Admin Jane added a new product.', time: 'Today, 9:15 AM' },
];

const ActivityFeed = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
      <ul className="space-y-3 max-h-64 overflow-y-auto">
        {mockActivity.map(item => (
          <li key={item.id} className="border-l-4 border-blue-500 pl-3">
            <p className="text-sm">{item.message}</p>
            <p className="text-xs text-gray-500">{item.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;

