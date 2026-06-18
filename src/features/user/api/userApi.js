import { api } from '../../../api/client';
// import { setToken } from '../../auth/api/authApi';

//!
export const fetchUserApi = async () => {
  const { data } = await api.get('users/my-profile');

  return data;
};
