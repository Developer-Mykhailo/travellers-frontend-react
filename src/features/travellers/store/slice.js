import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'travellers',

  initialState: {
    items: [],
    hasNextPage: false,
  },
  reducers: {
    setTravellers: (state, action) => {
      state.items = action.payload.data;
      state.hasNextPage = action.payload.hasNextPage;
    },

    appendTravellers: (state, action) => {
      state.items.push(...action.payload.data);
      state.hasNextPage = action.payload.hasNextPage;
    },
  },
});

export const { setTravellers, appendTravellers } = slice.actions;
export default slice.reducer;
