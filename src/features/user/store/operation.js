import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserApi, toggleSaveStoryApi } from '../api/userApi';
import { fetchPublicStoryByIdApi } from '../../stories/api/storiesApi';
import { setUser } from './slice';

//!
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkApi) => {
    try {
      const userResponse = await fetchUserApi();

      thunkApi.dispatch(setUser(userResponse.data));
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

//!
export const toggleSaveStory = createAsyncThunk(
  'user/toggleSaveStory',
  async (id, thunkApi) => {
    try {
      const responce = await toggleSaveStoryApi(id);

      return responce;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
