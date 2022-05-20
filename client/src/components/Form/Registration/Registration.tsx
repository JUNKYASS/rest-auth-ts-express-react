import React, { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Registration.module.scss';

import { REG, REG_FAILED } from '../../../constants/api';
import AuthContext from '../../../store/Auth/AuthContext';

import { HOMEPAGE_ROUTE, PROFILE_ROUTE } from '../../../constants/routes';

interface IRegistrationProps {
  error?: string | string[],
  isAdmin?: boolean,
}

const Registration: React.FC<IRegistrationProps> = (props) => {
  const receivedError = props.error;
  const isAdmin = props.isAdmin || false;

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | string[] | undefined>(receivedError);
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [login, setLogin] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(undefined); // Clear error messages

    if (!(password && login && email && passwordConfirm)) {
      setError('All the fields must be specified');

      return;
    }

    if (password !== passwordConfirm) {
      setError('Passwords must be equal');

      return;
    }

    setLoading(true);

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ login, password, email, password_confirm: passwordConfirm, is_admin: isAdmin })
    };

    const data = await fetch(REG, options);
    const result = await data.json();

    if (result && !!result.success) {
      setUser(result.data);
      navigate(PROFILE_ROUTE);
    } else {
      setError(result.message || REG_FAILED);
    }

    setLoading(false);
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
          placeholder="Login"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          placeholder="Password"
        />
        <input
          type="password"
          name="password_confirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          autoComplete="off"
          placeholder="Password confirm"
        />

        {!loading ? <button type="submit">Reg</button> : 'Loading...'}
        <p>Have an account? <Link to={HOMEPAGE_ROUTE}>Log in</Link></p>
      </form>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Registration;