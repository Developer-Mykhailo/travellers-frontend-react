import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchTravellerByIdApi,
  fetchTravellersApi,
} from '../api/travellersApi';

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
  async ({ id }, thunkApi) => {
    try {
      const response = await fetchTravellerByIdApi(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
