import { useRoutes } from 'react-router';

import Homepage from './homepage/Homepage';
import Registration from './registrartion/Registration';
import Users from './users/Users';
import Profile from './profile/Profile';
import Admin from './admin/Admin';

import { HOMEPAGE_ROUTE, REGISTRATION_ROUTE, USERS_ROUTE, PROFILE_ROUTE, ADMIN_ROUTE } from '../constants/routes';

const AppRoutes = () => {
  const element = useRoutes([
    { path: HOMEPAGE_ROUTE, element: <Homepage /> },
    { path: REGISTRATION_ROUTE, element: <Registration /> },
    { path: USERS_ROUTE, element: <Users /> },
    { path: PROFILE_ROUTE, element: <Profile /> },
    { path: ADMIN_ROUTE, element: <Admin /> },
  ]);

  return element;
}

export default AppRoutes;