// src/Components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  const branch = localStorage.getItem('selectedBranch');

  if (!token || !branch) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
