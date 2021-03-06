import { VERIFY_TOKEN } from '../constants/api';
import { IUserResponse, IUser } from '../types/commonTypes';

export const decodeAuthToken = async (): Promise<IUser | null> => {
  const data = await fetch(VERIFY_TOKEN);
  const result: IUserResponse = await data.json();

  if (result.success && result.data) {
    return result.data;
  }

  return null;
};