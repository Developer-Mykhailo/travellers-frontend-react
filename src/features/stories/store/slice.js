import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'publicStories',

  initialState: {
    items: [],
    hasNextPage: false,
    //
    categories: [],
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

    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setPublicStories, appendPublicStories, setCategories } =
  slice.actions;
export default slice.reducer;
