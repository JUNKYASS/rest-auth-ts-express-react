import React, { FormEvent, useEffect, useState } from 'react';

import styles from './Homepage.module.scss';

import Login from '../../components/Form/Login/Login';

const Homepage: React.FC = () => {
  return (
    <div className={styles.root}>
      <Login />
    </div>
  );
}

export default Homepage;