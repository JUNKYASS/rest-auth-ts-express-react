import React from 'react';

import styles from './UsersList.module.scss';

import { IUser } from '../../types/commonTypes';

interface IUsersListProps {
  data?: IUser[]
}

const UsersList: React.FC<IUsersListProps> = props => {
  const { data } = props;

  if (!data) return null;

  return (
    <div className={styles.root}>
      <table>
        <thead>
          <th>Login</th>
          <th>Email</th>
        </thead>
        <tbody>
          {data && data.length > 0 && (
            data.map(user => (
              <tr key={user.id}>
                <td>{user.login}</td><td>{user.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
};

export default UsersList;