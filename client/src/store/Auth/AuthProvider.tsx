import React, { useState } from 'react';

import AuthContext, { initialState } from './AuthContext';

import { IUser } from '../../types/commonTypes';

interface IAuthProviderProps {
  children?: React.ReactNode,
}

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | undefined>(initialState.user);

  const handleSetUser = (value: IUser | undefined) => {
    console.log('handle works!');
    setUser(value);
  }

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;