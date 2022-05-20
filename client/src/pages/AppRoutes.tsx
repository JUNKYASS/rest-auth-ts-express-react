import { useRoutes } from 'react-router';

import Homepage from './homepage/Homepage';
import Registration from './registrartion/Registration';
import Users from './users/Users';
import Profile from './profile/Profile';
import Admin from './admin/Admin';
import NotFound from './notFound/NotFound';

import { HOMEPAGE_ROUTE, REGISTRATION_ROUTE, USERS_ROUTE, PROFILE_ROUTE, ADMIN_ROUTE } from '../constants/routes';
import { useContext } from 'react';
import AuthContext from '../store/Auth/AuthContext';

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  const element = useRoutes([
    { path: HOMEPAGE_ROUTE, element: <Homepage /> },
    { path: REGISTRATION_ROUTE, element: <Registration /> },
    { path: USERS_ROUTE, element: user?.is_admin ? <Users /> : <NotFound /> },
    { path: PROFILE_ROUTE, element: user ? <Profile /> : <NotFound /> },
    { path: ADMIN_ROUTE, element: <Admin /> },
    { path: "*", element: <NotFound /> },
  ]);

  return element;
}

export default AppRoutes;