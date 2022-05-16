// @generated
// Automatically generated. Don't change this file manually.

export type usersId = number & { " __flavor"?: 'users' };

export default interface users {
  /** Primary key. Index: users_pkey */
  id: usersId;

  login: string;

  email: string;

  password: string;

  is_admin: boolean;

  is_activated: boolean;

  activation_id: string | null;
}

export interface usersInitializer {
  login: string;

  email: string;

  password: string;

  /** Default value: false */
  is_admin?: boolean;

  /** Default value: false */
  is_activated?: boolean;

  activation_id?: string | null;
}
