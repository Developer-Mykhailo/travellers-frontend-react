import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTravellersApi } from '../api/travellersApi';

// !

export const fetchTravellers = createAsyncThunk(
  'travellers/fetchTravellers',
  async ({ page, perPage }, thunkApi) => {
    try {
      const response = await fetchTravellersApi(page, perPage);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// !
// export const fetchTravellerByIdApi = async (id) => {
//   try {
//     const response = await axios.get(`/users/public/${id}`);

//     return response.data.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
