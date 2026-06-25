import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  clearToken,
  loginUserApi,
  logoutUserApi,
  refreshUserApi,
  registerUserApi,
  setToken,
} from '../api/authApi';
import { fetchUserApi } from '../../user/api/userApi';
import { clearUser, setUser } from '../../user/store/slice';

//!
export const registerUser = createAsyncThunk(
  'auth/register',
  async (formData, thunkApi) => {
    try {
      const { data } = await registerUserApi(formData);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//!
export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const { data } = await loginUserApi(formData);

      const userResponse = await fetchUserApi();

      thunkApi.dispatch(setUser(userResponse.data));

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//!
export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const { data } = await refreshUserApi();

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//!
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.accessToken;
      setToken(token);

      if (!token) return null;

      const userResponse = await fetchUserApi();

      thunkApi.dispatch(setUser(userResponse.data));
    } catch (error) {
      clearToken();

      thunkApi.dispatch(clearUser());

      return thunkApi.rejectWithValue({
        message: error.message,
        status: error.status,
      });
    }
  },
  {
    condition(_, { getState }) {
      const { auth } = getState();
      return Boolean(auth.accessToken);
    },
  }
);

//!
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      await logoutUserApi();

      thunkApi.dispatch(clearUser());
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
