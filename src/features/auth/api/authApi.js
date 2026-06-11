import { api } from '../../../api/client';

const setToken = (token) =>
  (api.defaults.headers.common.Authorization = `Bearer ${token}`);

export const registerUserApi = async (formData) => {
  const { data } = await api.post('auth/register', formData);
  return data;
};

export const loginUserApi = async (formData) => {
  const { data } = await api.post('auth/login', formData);
  const accessToken = data.data.accessToken;

  setToken(accessToken);

  return data;
};
