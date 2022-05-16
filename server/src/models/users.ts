// @generated
// Automatically generated. Don't change this file manually.

export type usersId = number & { " __flavor"?: 'users' };

export default interface users {
  /** Primary key. Index: users_pkey */
  id: usersId;

  /** Index: login_index */
  login: string;

  password: string;

  /** Index: email_index */
  email: string;

  /** Index: isAdmin_index */
  is_admin: boolean;

  is_activated: boolean;

  activation_link: string | null;
}

export interface usersInitializer {
  /** Index: login_index */
  login: string;

  password: string;

  /** Index: email_index */
  email: string;

  /**
   * Default value: false
   * Index: isAdmin_index
   */
  is_admin?: boolean;

  /** Default value: false */
  is_activated?: boolean;

  activation_link?: string | null;
}
