import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'publicStories',
  initialState: {
    items: [],
    hasNextPage: false,
  },
  reducers: {
    setPublicStories: (state, action) => {
      state.items = action.payload.data;
      state.hasNextPage = action.payload.hasNextPage;
    },

    appendPublicStories: (state, action) => {
      state.items.push(...action.payload.data);
      state.hasNextPage = action.payload.hasNextPage;
    },
  },
});

export const { setPublicStories, appendPublicStories } = slice.actions;
export default slice.reducer;
