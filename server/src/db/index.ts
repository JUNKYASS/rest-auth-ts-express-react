import logger from 'jet-logger';
import { Client, QueryResult } from 'pg';
import dotenv from 'dotenv';

import { usersQueries } from './users';
import { authTokensQueries } from './authTokens';

dotenv.config();

const client = new Client(process.env.DB_CONN_STRING);

client.connect((err) => {
  if (err) {
    logger.err(err);
  } else {
    logger.info('Database connected...');
  }
});

// Common database query with the ability to pass a callback and get a result response
const query = async (text: string, params?: any[], callback?: (err: Error, result: QueryResult<any>) => void): Promise<QueryResult<any>> => {
  return new Promise(async (resolve, reject) => {
    try {
      return await client.query(text, params || [], (err, result) => {
        if (err) reject(err);
        if (callback) callback(err, result);
        if (result) resolve(result);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  ...usersQueries(client), // Users queries
  ...authTokensQueries(client), // Auth_tokens queries
  query,
};