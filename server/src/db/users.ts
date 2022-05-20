import logger from 'jet-logger';
import { Client, QueryResult } from 'pg';

import { users, usersInitializer } from '../models';
import db from '.';

export const usersQueries = (client: Client) => {
  const getAllUsers = async (): Promise<QueryResult<users | users[]> | undefined> => {
    try {
      const q = 'SELECT * FROM users ORDER BY id ASC';
      const result = await client.query(q);

      return result;
    } catch (e) {
      logger.err(e);
    }
  };

  const getUsersWithOffset = async (offset: number, count: number): Promise<{ total?: number } & QueryResult<users | users[]> | undefined> => {
    try {
      const q = 'SELECT * FROM users ORDER BY id ASC OFFSET $1 LIMIT $2';
      const result: { total?: number } & QueryResult<any> = await client.query(q, [offset, count]);
      const usersCount = await getAllUsers();

      if (usersCount) result.total = usersCount.rowCount;

      return result;
    } catch (e) {
      logger.err(e);
    }
  };

  const getUserByLoginOrEmail = async (login: string, email?: string): Promise<users | undefined> => {
    try {
      const q = 'SELECT * FROM users WHERE login = $1 OR email = $2';
      const result = await client.query(q, [login, email ?? login]);

      return result.rows[0];
    } catch (e) {
      logger.err(e);
    }
  };

  const getUserByActivationId = async (activation_id: string): Promise<users | undefined> => {
    try {
      const q = 'SELECT * FROM users WHERE activation_id = $1';
      const result = await client.query(q, [activation_id]);

      return result.rows[0];
    } catch (e) {
      logger.err(e);
    }
  };

  const activateUser = async (user_id: string): Promise<users | undefined> => {
    try {
      const q = 'UPDATE users SET is_activated = true WHERE id = $1 RETURNING *';
      const result = await client.query(q, [user_id]);

      return result.rows[0];
    } catch (e) {
      logger.err(e);
    }
  };

  const addUser = async (user: usersInitializer, callback?: (err: Error, result: QueryResult<users>) => void): Promise<users | undefined> => {
    try {
      const { login, password, email, is_admin, activation_id } = user;

      const q = 'INSERT INTO users (login, password, email, is_admin, activation_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const result: QueryResult<users> = await db.query(q, [login, password, email, is_admin, activation_id], callback);

      return result.rows[0];
    } catch (e) {
      logger.err(e);
    }
  };

  return {
    getAllUsers,
    getUsersWithOffset,
    getUserByLoginOrEmail,
    getUserByActivationId,
    activateUser,
    addUser
  };
};