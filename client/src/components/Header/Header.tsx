import React from 'react'

import styles from './Header.module.scss';

import Links from './Links/Links';

const Header: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.logo}>MODIMIO TEST WEB APPLICATION</div>

      <Links className={styles.links} />
    </div>
  );
};

export default Header;