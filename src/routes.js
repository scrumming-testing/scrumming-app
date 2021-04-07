import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import User from 'src/pages/User';
import Roles from 'src/pages/Roles';
import Organizations from 'src/pages/Organizations';
import BusinessUnits from 'src/pages/BusinessUnits';
import Sites from 'src/pages/Sites';

/* eslint-disable react/prop-types */
const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: 'users', element: <User /> },
      { path: 'roles', element: <Roles /> },
      { path: 'organizations', element: <Organizations /> },
      { path: 'sites', element: <Sites /> },
      { path: 'business-units', element: <BusinessUnits /> },
      { path: 'organizations/:organizationID/business-unit/', element: <BusinessUnits /> },
      { path: 'business-units/:businessUnitID/sites', element: <Sites /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
