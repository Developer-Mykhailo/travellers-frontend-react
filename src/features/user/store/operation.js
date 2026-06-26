import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserApi } from '../api/userApi';
import { fetchPublicStoryByIdApi } from '../../stories/api/storiesApi';

//!
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

//!
export const fetchUserPublicStoriesByIds = createAsyncThunk(
  'user/fetchUserPublicStoriesByIds',
  async ({ page, storiesIds }, thunkApi) => {
    try {
      const response = await Promise.all(
        storiesIds.map((id) => fetchPublicStoryByIdApi(id))
      );

      return { response, page };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//!
export const fetchUserSavedStoriesByIds = createAsyncThunk(
  'user/fetchUserSavedStoriesByIds',
  async ({ page, storiesIds }, thunkApi) => {
    try {
      const response = await Promise.all(
        storiesIds.map((id) => fetchPublicStoryByIdApi(id))
      );

      return { response, page };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
