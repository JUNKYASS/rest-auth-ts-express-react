import { HOMEPAGE_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE, USERS_ROUTE } from '../../../constants/routes';
import { ILinksData } from '../../../types/commonTypes';

export const linksData: ILinksData[] = [
  {
    auth: false,
    links: [
      {
        to: HOMEPAGE_ROUTE,
        text: 'Login',
      },
      {
        to: REGISTRATION_ROUTE,
        text: 'Registration',
      },
    ]
  },
  {
    auth: true,
    links: [
      {
        to: PROFILE_ROUTE,
        text: 'Profile',
      },
      {
        to: USERS_ROUTE,
        text: 'Users list',
        adminOnly: true
      }
    ]
  }
];