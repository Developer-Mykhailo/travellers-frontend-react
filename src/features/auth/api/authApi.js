import { api } from '../../../api/client';

export const setToken = (token) =>
  (api.defaults.headers.common.Authorization = `Bearer ${token}`);

export const clearToken = () => {
  delete api.defaults.headers.common.Authorization;
};

//!
export const registerUserApi = async (formData) => {
  const { data } = await api.post('auth/register', formData);

  return data;
};

//!
export const loginUserApi = async (formData) => {
  const { data } = await api.post('auth/login', formData);
  const accessToken = data.data.accessToken;

  setToken(accessToken);

  return data;
};

//!
export const refreshUserApi = async () => {
  const { data } = await api.post('auth/refresh');
  const accessToken = data.data.accessToken;

  setToken(accessToken);

  return data;
};

//!
export const logoutUserApi = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error(error);
  }

  clearToken();
};
