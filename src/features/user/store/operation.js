import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserApi } from '../api/userApi';
import { fetchPublicStoryByIdApi } from '../../stories/api/storiesApi';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkApi) => {
    try {
      const { data } = await fetchUserApi();

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchUserPublicStoriesByIds = createAsyncThunk(
  'user/fetchUserPublicStoriesByIds',
  async ({ page, publicIds }, thunkApi) => {
    try {
      const response = await Promise.all(
        publicIds.map((id) => fetchPublicStoryByIdApi(id))
      );

      return { response, page };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
