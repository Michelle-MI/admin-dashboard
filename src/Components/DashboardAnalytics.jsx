// components/DashboardAnalytics.jsx
import React from 'react';
import Chart from 'react-apexcharts';
import ChartCard from './ChartCard';

const DashboardAnalytics = () => {
  const transactionData = {
    options: {
      chart: { id: 'daily-transactions' },
      xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    },
    series: [{ name: 'Transactions', data: [30, 40, 45, 50, 49, 60, 70] }],
  };

  const loanData = {
    options: {
      labels: ['Personal Loans', 'Business Loans', 'Education Loans'],
    },
    series: [44, 33, 23],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChartCard title="Daily Transactions">
        <Chart options={transactionData.options} series={transactionData.series} type="line" height={250} />
      </ChartCard>

      <ChartCard title="Loan Type Distribution">
        <Chart options={loanData.options} series={loanData.series} type="pie" height={250} />
      </ChartCard>
    </div>
  );
};

export default DashboardAnalytics;

