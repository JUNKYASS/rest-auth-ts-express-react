import logger from 'jet-logger';
import { Client, QueryResult } from 'pg';
import { users, usersInitializer } from '../models';
import db from '.';

export const usersQueries = (client: Client) => {
  const getUserByLoginOrEmail = async (login: string, email?: string): Promise<users | undefined> => {
    try {
      const q = 'SELECT * FROM users WHERE login = $1 OR email = $2';

      const result = await client.query(q, [login, email ?? login]);

      return result.rows[0];
    } catch (e) {
      logger.err(e);
    }
  };

  const addUser = async (user: usersInitializer, callback?: (err: Error, result: QueryResult<any>) => void): Promise<QueryResult<any> | undefined> => {
    try {
      const { login, password, email, is_admin, activation_link } = user;

      const q = 'INSERT INTO users (login, password, email, is_admin, activation_link) VALUES ($1, $2, $3, $4, $5)';

      return await db.query(q, [login, password, email, is_admin, activation_link], callback);
    } catch (e) {
      logger.err(e);
    }
  };

  return {
    getUserByLoginOrEmail,
    addUser
  }
};