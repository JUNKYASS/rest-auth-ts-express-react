import React from 'react';

import { IAuthContext } from '../../types/commonTypes';

export const initialState = {
  user: undefined,
  setUser: () => { }
};

const AuthContext = React.createContext<IAuthContext>(initialState);

export default AuthContext;