import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserApi, logoutUserApi, registerUserApi } from '../api/authApi';

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

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//!
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      await logoutUserApi();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
