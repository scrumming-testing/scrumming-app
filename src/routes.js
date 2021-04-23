import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import ProductList from 'src/pages/ProductList';
import Settings from 'src/pages/Settings';
import User from 'src/pages/User';
import Roles from 'src/pages/Roles';
import Organizations from 'src/pages/Organizations';
import BusinessUnits from 'src/pages/BusinessUnits';
import Sites from 'src/pages/Sites';
import ProjectsPage from 'src/pages/projects-page/projects-page.component';

import Home from './pages/Home';

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
      { path: 'home', element: <Home /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  { path: '/', element: <Navigate to="/app/home" /> }
];

export default routes;
