import { createSlice } from '@reduxjs/toolkit';
import { fetchPublicStories } from './operation';

const slice = createSlice({
  name: 'publicStories',

  initialState: {
    items: [],
    hasNextPage: false,
    categories: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // setPublicStories: (state, action) => {
    //   state.items = action.payload.data;
    //   state.hasNextPage = action.payload.hasNextPage;
    // },

    // appendPublicStories: (state, action) => {
    //   state.items.push(...action.payload.data);
    //   state.hasNextPage = action.payload.hasNextPage;
    // },

    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },

  //!---------------------------
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicStories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPublicStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const { response, page } = action.payload;

        page === 1
          ? (state.items = response.data)
          : state.items.push(...response.data);

        state.hasNextPage = response.hasNextPage;
      })
      .addCase(fetchPublicStories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPublicStories, appendPublicStories, setCategories } =
  slice.actions;
export default slice.reducer;
