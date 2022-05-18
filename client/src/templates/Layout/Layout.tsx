import React, { useContext, useEffect } from 'react'
import cn from 'classnames';

import styles from './Layout.module.scss';

import Header from '../../components/Header/Header';
import { decodeAuthToken } from '../../utils/authToken';
import AuthContext from '../../store/Auth/AuthContext';

interface ILayoutProps {
  className?: string,
  children?: React.ReactNode,
}

const Layout: React.FC<ILayoutProps> = props => {
  const { className, children } = props;

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    decodeAuthToken() // Check if user authorized and get user's data
      .then(data => {
        if (data) setUser(data);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <div className={cn(styles.root, className)}>
      <Header />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default Layout