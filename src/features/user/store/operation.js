import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteMyStoryApi,
  fetchUserApi,
  toggleSaveStoryApi,
  udateUserInfoApi,
} from '../api/userApi';
import { fetchPublicStoryByIdApi } from '../../stories/api/storiesApi';
import {
  changePublicStoriesIds,
  changePublicStoriesItems,
  setUser,
} from './slice';

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
export const udateUserInfo = createAsyncThunk(
  'user/udateUserInfo',
  async (changedData, thunkApi) => {
    try {
      const userResponse = await udateUserInfoApi(changedData);

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
      const response = await toggleSaveStoryApi(id);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//!
export const deleteMyStory = createAsyncThunk(
  'publicStories/deleteStory',

  async (id, thunkApi) => {
    try {
      await deleteMyStoryApi(id);

      thunkApi.dispatch(changePublicStoriesIds(id));
      thunkApi.dispatch(changePublicStoriesItems({ id }));
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
