// components/ChartCard.jsx
import React from 'react';

const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-md font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
};

export default ChartCard;

