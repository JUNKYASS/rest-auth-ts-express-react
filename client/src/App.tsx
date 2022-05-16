import React, { useEffect } from 'react';
import { useRoutes } from 'react-router';

import './App.css';

import Homepage from './pages/homepage/Homepage';
import Registration from './pages/registrartion/Registration';
import Users from './pages/users/Users';
import Profile from './pages/profile/Profile';
import Admin from './pages/admin/Admin';

const App: React.FC = () => {
  const element = useRoutes([
    { path: '/', element: <Homepage /> },
    { path: '/registration', element: <Registration /> },
    { path: '/users', element: <Users /> },
    { path: '/profile', element: <Profile /> },
    { path: '/admin', element: <Admin /> },
  ]);

  return element;
}

export default App;
