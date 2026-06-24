import { appStore } from '../app/appStore';
import { setAccessTokenObj } from '../Features/AUTH/store/slice';
import { api } from './client';

export const setupInterseptors = () => {
  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== '/auth/refresh'
      ) {
        originalRequest._retry = true;

        try {
          const { data } = await api.post('auth/refresh');

          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;

          appStore.dispatch(
            setAccessTokenObj({
              accessToken: data.data.accessToken,
              accessTokenValidUntil: data.data.accessTokenValidUntil,
            })
          );

          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};
