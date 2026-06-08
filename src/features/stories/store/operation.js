import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPublicStoriesApi } from '../api/storiesApi';

//!
export const fetchPublicStories = createAsyncThunk(
  'publicStories/fetchPublicStories',
  async ({ page, perPage, category }, thunkApi) => {
    try {
      const response = await fetchPublicStoriesApi(page, perPage, category);

      return { response, page };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// !
export const fetchPublicStoryByIdApi = async (id) => {
  try {
    const response = await axios.get(`/stories/${id}`);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// !
export const fetchCategoriesApi = async () => {
  try {
    const response = await axios.get('/stories/categories', {});

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
