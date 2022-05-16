// @generated
// Automatically generated. Don't change this file manually.

import auth_tokens, { auth_tokensInitializer, auth_tokensId } from './auth_tokens';
import users, { usersInitializer, usersId } from './users';

type Model =
  | auth_tokens
  | users

interface ModelTypeMap {
  'auth_tokens': auth_tokens;
  'users': users;
}

type ModelId =
  | auth_tokensId
  | usersId

interface ModelIdTypeMap {
  'auth_tokens': auth_tokensId;
  'users': usersId;
}

type Initializer =
  | auth_tokensInitializer
  | usersInitializer

interface InitializerTypeMap {
  'auth_tokens': auth_tokensInitializer;
  'users': usersInitializer;
}

export type {
  auth_tokens, auth_tokensInitializer, auth_tokensId,
  users, usersInitializer, usersId,

  Model,
  ModelTypeMap,
  ModelId,
  ModelIdTypeMap,
  Initializer,
  InitializerTypeMap
};
