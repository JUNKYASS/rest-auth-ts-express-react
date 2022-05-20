import React, { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import styles from './Login.module.scss';

import { LOGIN, LOGIN_FAILED } from '../../../constants/api';
import { PROFILE_ROUTE, REGISTRATION_ROUTE } from '../../../constants/routes';
import AuthContext from '../../../store/Auth/AuthContext';
import { IUserResponse } from '../../../types/commonTypes';

interface ILoginProps {
  error?: string | string[],
  adminAuth?: boolean,
}

const Login: React.FC<ILoginProps> = (props) => {
  const receivedError = props.error;
  const adminAuth = props.adminAuth;

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState<string | string[] | undefined>(receivedError);
  const [password, setPassword] = useState<string>('');
  const [login, setLogin] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(undefined); // Clear error messages

    if (!(password && login)) {
      setError('Login and password must be specified');

      return;
    }

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ login, password, is_admin: adminAuth })
    };

    const data = await fetch(LOGIN, options);
    const result: IUserResponse = await data.json();

    if (result && !!result.success && result.data) {
      setUser(result.data);
      navigate(PROFILE_ROUTE);
    } else {
      setError(result.message || LOGIN_FAILED);
    }
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          autoComplete="off"
          placeholder={!adminAuth ? "Login or email" : "email"}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          placeholder="Password"
        />

        <button type="submit">Log in</button>
        {!adminAuth && <p>No account? <Link to={REGISTRATION_ROUTE}>Register new one</Link></p>}
      </form>
      {error && (
        <p className={styles.error}>{error}</p>
      )}

      {/* <button onClick={handleCheck}>Check</button> */}
    </div>
  );
}

export default Login;