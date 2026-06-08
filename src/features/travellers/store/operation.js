import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchTravellerByIdApi,
  fetchTravellersApi,
} from '../api/travellersApi';

import { fetchPublicStoryByIdApi } from '../../stories/api/storiesApi';

// !
export const fetchTravellers = createAsyncThunk(
  'travellers/fetchTravellers',
  async ({ page, perPage }, thunkApi) => {
    try {
      return await fetchTravellersApi(page, perPage);
      //
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// !
export const fetchTravellerById = createAsyncThunk(
  'travellers/fetchTravellerById',
  async (id, thunkApi) => {
    try {
      const response = await fetchTravellerByIdApi(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// !
export const fetchTravellerStoriesByIds = createAsyncThunk(
  'travellers/fetchTravellerStoriesByIds',
  async ({ page, ids }, thunkApi) => {
    try {
      const response = await Promise.all(
        ids.map((id) => fetchPublicStoryByIdApi(id))
      );

      return { response, page };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
