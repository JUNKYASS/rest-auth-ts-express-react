import React, { FormEvent, useEffect, useState } from 'react';
import styles from './Login.module.scss';

import { LOGIN, LOGIN_FAILED } from '../../../constants/api';

interface ILoginProps {
  error?: string | string[],
}

const Login: React.FC<ILoginProps> = (props) => {
  const receivedError = props.error;

  const [error, setError] = useState<string | string[] | undefined>(receivedError);
  const [password, setPassword] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [auth, setAuth] = useState<boolean>(false);


  useEffect(() => {
    const newUser = {
      login: 'son1',
      password: 'pass123',
      password_confirm: 'pass123',
      email: 'hhh1@gmail.com',
      is_admin: false
    };

    const existingUser = {
      login: 'son1',
      password: 'pass123',
    }



    // fetch('/api/auth/registration', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(newUser)
    // })
    //   .then(res => res.json())
    //   .then(data => console.log(data));
  }, []);

  const handleCheck = async () => {
    const data = await fetch('/api/auth/token/verify', {
      method: 'GET',
    });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(undefined); // Clear error messages

    // if (!(password && login)) {
    //   setError('Login and password must be specified');

    //   return;
    // }

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ login, password })
    };

    const data = await fetch(LOGIN, options);
    const result = await data.json();

    if (result && !!result.success) {
      console.log(result);
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
          placeholder="Login or email"
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
      </form>
      {error && (
        <p className={styles.error}>{error}</p>
      )}

      <button onClick={handleCheck}>Check</button>
    </div>
  );
}

export default Login;