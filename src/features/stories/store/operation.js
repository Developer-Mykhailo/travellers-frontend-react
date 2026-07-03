import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createStoryApi,
  fetchCategoriesApi,
  fetchPublicStoriesApi,
  fetchPublicStoryByIdApi,
  updateStoryApi,
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

// !
export const createStory = createAsyncThunk(
  'publicStories/createStory',

  async (values, thunkApi) => {
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('article', values.article);
    formData.append('category', values.category);
    formData.append('photo', values.photo);

    try {
      const response = await createStoryApi(formData);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// !
export const updateStory = createAsyncThunk(
  'publicStories/updateStory',

  async ({ id, values }, thunkApi) => {
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('article', values.article);
    formData.append('category', values.category);
    formData.append('photo', values.photo);

    try {
      const response = await updateStoryApi(id, formData);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
