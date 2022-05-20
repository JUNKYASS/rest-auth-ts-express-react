import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import styles from './Users.module.scss';

import { useLogout } from '../../hooks/useLogout';
import { GET_ALL_USERS } from '../../constants/api';
import { IUser } from '../../types/commonTypes';

const Users: React.FC = () => {
  const logout = useLogout();

  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);

    fetch(GET_ALL_USERS)
      .then(data => data.json())
      .then(result => {
        if (result && result.data) {
          const data = result.data.map((item: IUser) => {
            (item as any).key = item.id;
            (item as any).is_activated = item.is_activated ? 'Activated' : 'Not activated';

            return item;
          });

          setUsers(data);

        }
      })
      .finally(() => setLoading(false));
  };

  const columns = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'id'
    },
    {
      key: 'login',
      title: 'Login',
      dataIndex: 'login',
      filters: users?.map((item: any) => ({ text: item.login, value: item.login })),
      onFilter: (value: any, record: any) => record.login.startsWith(value),
      filterSearch: (input: string, record: any) => record && record?.value?.indexOf(input) > -1,
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      filters: users?.map((item: any) => ({ text: item.email, value: item.email })),
      onFilter: (value: any, record: any) => record.email.startsWith(value),
      filterSearch: (input: string, record: any) => record && record?.value?.indexOf(input) > -1,
    },
    {
      key: 'id',
      title: 'Status',
      dataIndex: 'is_activated'
    }
  ];

  const handleLogoutClick = async () => {
    await logout();
  };

  return (
    <div className={styles.root}>
      {/* <PaginatedList
        fetchUrl={GET_ALL_USERS}
        itemsPerPage={2}
      /> */}

      <Table columns={columns} dataSource={users} loading={loading} pagination={{ defaultPageSize: 3, position: ['topLeft'] }} />

      <button className={styles.logoutBtn} onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default Users;