import React from 'react'
import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

import { HOMEPAGE_ROUTE } from '../../constants/routes';

const NotFound = () => {
  return (
    <div className={styles.root}>
      <div>404 Not found</div>

      <Link to={HOMEPAGE_ROUTE}>Homepage</Link>
    </div>
  )
};

export default NotFound;