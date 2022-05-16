// @generated
// Automatically generated. Don't change this file manually.

import { usersId } from './users';

export type auth_tokensId = number & { " __flavor"?: 'auth_tokens' };

export default interface auth_tokens {
  /** Primary key. Index: authTokens_pkey */
  id: auth_tokensId;

  user_id: usersId;

  token: string;
}

export interface auth_tokensInitializer {
  user_id: usersId;

  token: string;
}
