import React from 'react';

const DashboardCard = ({ title, children }) => (
  <div className="bg-white p-4 rounded shadow mb-4">
    <h2 className="font-semibold mb-2 text-lg">{title}</h2>
    {children}
  </div>
);

export default DashboardCard;
