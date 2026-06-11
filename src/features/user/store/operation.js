import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserApi } from '../api/userApi';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkApi) => {
    try {
      const { data } = await fetchUserApi();
      console.log(data);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
