// src/routes.jsx
import React from "react";
import Dashboard from "./Pages/Dashboard";
import ViewCustomers from "./Pages/ViewCustomers";
import ClientsList from "./ClientsList"; // ✅ matches file location

const DummyPage = ({ name }) => (
  <div className="p-6 text-xl font-bold text-gray-700">
    {name} (Coming Soon)
  </div>
);

const LazyPage = (name) => () => <DummyPage name={name} />;

export const routeMap = {
  "/dashboard": {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  "/add-customer": {
    path: "/add-customer",
    name: "Customer Management > Add Customer",
    component: LazyPage("Add Customer"),
  },
  "/view-customers": {
    path: "/view-customers",
    name: "Customer Management > View Customers",
    component: ViewCustomers,
  },
  "/clients-list": {
    path: "/clients-list",
    name: "Customer Management > Clients List",
    component: ClientsList, // ✅ Only here, not in App.jsx
  },
  "/customer-kyc": {
    path: "/customer-kyc",
    name: "Customer Management > Customer KYC",
    component: LazyPage("Customer KYC"),
  },
  "/make-deposit": {
    path: "/make-deposit",
    name: "Deposits > Make Deposit",
    component: LazyPage("Make Deposit"),
  },
};
