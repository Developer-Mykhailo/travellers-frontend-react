import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchPublicStories } from './operation';

const slice = createSlice({
  name: 'publicStories',

  initialState: {
    items: [],
    hasNextPage: false,

    categories: [],
    isFetchingStories: false,
    isFetchingCategories: false,

    error: null,
  },

  //!---------------------------
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicStories.pending, (state) => {
        state.isFetchingStories = true;
      })
      .addCase(fetchPublicStories.fulfilled, (state, action) => {
        state.isFetchingStories = false;
        state.error = null;

        action.meta.arg.page === 1
          ? (state.items = action.payload.data)
          : state.items.push(...action.payload.data);

        state.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(fetchPublicStories.rejected, (state, action) => {
        state.isFetchingStories = false;
        state.error = action.payload;
      })

      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.isFetchingCategories = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
      });
  },
});

export const { setPublicStories, appendPublicStories, setCategories } =
  slice.actions;
export default slice.reducer;
