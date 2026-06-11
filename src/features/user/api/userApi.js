import { api } from '../../../api/client';

//!
export const fetchUserApi = async () => {
  const { data } = await api.get('users/my-profile');

  return data;
};
