import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { HOMEPAGE_ROUTE } from '../constants/routes';

import AuthContext from '../store/Auth/AuthContext';

export const useLogout = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
  };

  return async () => {
    const data = await fetch('/api/auth/logout', options);
    const result = await data.json();

    if (result && result.success) {
      setUser(undefined);
      navigate(HOMEPAGE_ROUTE);
    }

    return result;
  };
};