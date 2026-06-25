import { appStore } from '../app/appStore';
import { logoutUser, refreshToken } from '../features/auth/store/operation';
import { api } from './client';

export const setupInterseptors = () => {
  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          if (originalRequest.url === 'auth/refresh') throw error;

          const payload = await appStore.dispatch(refreshToken()).unwrap();

          originalRequest.headers.Authorization = `Bearer ${payload.accessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          appStore.dispatch(logoutUser());

          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};
