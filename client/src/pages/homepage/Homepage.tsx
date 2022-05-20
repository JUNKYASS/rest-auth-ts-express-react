import React, { useContext } from 'react';

import styles from './Homepage.module.scss';

import Login from '../../components/Form/Login/Login';
import AuthContext from '../../store/Auth/AuthContext';

const Homepage: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.root}>
      {user ? <div>Welcome home, <b>{user.login}</b></div> : <Login />}
    </div>
  );
}

export default Homepage;