export interface ILink {
  to: string,
  text: string,
  adminOnly?: boolean
}

export interface ILinksData {
  auth: boolean,
  links: ILink[]
}

export interface IUser {
  id?: string,
  login?: string,
  email?: string,
  is_admin?: boolean,
  is_activated?: boolean,
}

export interface IUserResponse {
  message?: string,
  success?: boolean,
  data?: IUser
}

export interface IAuthContext {
  user?: IUser,
  setUser: (value: IUser | undefined) => void,
}