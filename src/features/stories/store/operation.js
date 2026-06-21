import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCategoriesApi,
  fetchPublicStoriesApi,
  fetchPublicStoryByIdApi,
} from '../api/storiesApi';

//!
export const fetchPublicStories = createAsyncThunk(
  'publicStories/fetchPublicStories',
  async (queryParams, thunkApi) => {
    try {
      const response = await fetchPublicStoriesApi(queryParams);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// !
export const fetchPublicStoryById = createAsyncThunk(
  'publicStories/fetchPublicStoryById',
  async (id, thunkApi) => {
    try {
      const response = await fetchPublicStoryByIdApi(id);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// !
export const fetchCategories = createAsyncThunk(
  'publicStories/fetchCategories',

  async (_, thunkApi) => {
    try {
      const response = await fetchCategoriesApi();

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
