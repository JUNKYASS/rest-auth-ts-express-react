import React, { useContext, useEffect } from 'react';

import styles from './Admin.module.scss';

import AuthContext from '../../store/Auth/AuthContext';
import Login from '../../components/Form/Login/Login';

const Admin: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.root}>
      {user ? <div>Welcome home, <b>{user.login}</b></div> : <Login adminAuth={true} />}
    </div>
  );
}

export default Admin;