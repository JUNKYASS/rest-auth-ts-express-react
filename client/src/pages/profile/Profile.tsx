import React, { useContext } from 'react';
import { useLogout } from '../../hooks/useLogout';
import AuthContext from '../../store/Auth/AuthContext';

import styles from './Profile.module.scss';

const Profile: React.FC = () => {
  const logout = useLogout();
  const { user } = useContext(AuthContext);

  const login = user?.login;
  const email = user?.email;
  const is_activated = user?.is_activated;

  const handleLogoutClick = async () => await logout();

  const renderUserInfo = () => {
    return (
      <div className={styles.info}>
        {login && <div className={styles.option}>
          <div className={styles.title}>Login</div>
          <div className={styles.value}>{login}</div>
        </div>}
        {email && <div className={styles.option}>
          <div className={styles.title}>Email</div>
          <div className={styles.value}>{email}</div>
        </div>}
        <div className={styles.option}>
          <div className={styles.title}>Status</div>
          <div className={styles.value}>{is_activated ? 'Activated' : 'Not activated'}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      {user && renderUserInfo()}
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default Profile;