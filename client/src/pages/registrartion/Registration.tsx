import React from 'react';

import styles from './Registration.module.scss';

import RegistrationForm from '../../components/Form/Registration/Registration';

const Registration: React.FC = () => {
  return (
    <div className={styles.root}>
      <RegistrationForm />
    </div >
  );
}

export default Registration;