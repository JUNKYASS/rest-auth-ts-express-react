import logger from 'jet-logger';
import { Client, QueryResult } from 'pg';
import { users, usersInitializer, auth_tokens, auth_tokensInitializer } from '../models';
import db from '.';

export const authTokensQueries = (client: Client) => {
  const addAuthToken = async (data: auth_tokensInitializer, callback?: (err: Error, result: QueryResult<auth_tokens>) => void): Promise<QueryResult<auth_tokens> | undefined> => {
    try {
      const { user_id, token } = data;

      const q = "INSERT INTO auth_tokens (user_id, token) VALUES ($1, $2) RETURNING *";

      return await db.query(q, [user_id, token], callback);
    } catch (e) {
      logger.err(e);
    }
  }

  return {
    addAuthToken
  };
};