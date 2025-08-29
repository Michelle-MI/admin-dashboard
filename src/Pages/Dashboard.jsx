import React from 'react';
import DashboardCard from '../Components/DashboardCard';
import DashboardAnalytics from '../Components/DashboardAnalytics';
import ActivityFeed from '../Components/ActivityFeed';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <DashboardCard title="Welcome, Admin!">
            <p>You are using <strong>Admin Dashboard v1.0</strong></p>
            <p>Login Count: 18</p>
            <p>Last Login IP: 222.5.131.79</p>
            <p>Last Login Time: 3 July 2025, 11:15:55</p>
          </DashboardCard>

          <DashboardCard title="Information Statistics">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th>Category</th>
                  <th>News</th>
                  <th>Images</th>
                  <th>Products</th>
                  <th>Users</th>
                  <th>Admins</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Total</td><td>92</td><td>9</td><td>0</td><td>8</td><td>20</td></tr>
                <tr><td>Today</td><td>0</td><td>0</td><td>0</td><td>0</td><td>8</td></tr>
                <tr><td>Yesterday</td><td>0</td><td>0</td><td>0</td><td>0</td><td>8</td></tr>
                <tr><td>This Month</td><td>2</td><td>2</td><td>0</td><td>0</td><td>20</td></tr>
              </tbody>
            </table>
          </DashboardCard>

          <DashboardCard title="Server Info">
            <p>Server Address: http://127.0.0.1/</p>
            <p>Server IP: 192.168.1.1</p>
          </DashboardCard>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <DashboardAnalytics />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
