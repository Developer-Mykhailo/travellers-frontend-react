import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, fetchUserPublicStoriesByIds } from './operation';

const userSlice = createSlice({
  name: 'user',

  initialState: {
    isUserLoading: false,
    userError: null,
    data: {},

    userPublicStories: {
      isPublicStoriesLoading: false,
      publicStoriesError: null,
      items: [],
    },
  },
  extraReducers: (buider) => {
    buider
      // User
      .addCase(fetchUser.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.isUserLoading = false;
        state.userError = null;
        state.data = payload;
      })
      .addCase(fetchUser.rejected, (state, { payload }) => {
        state.isUserLoading = false;
        state.userError = payload;
      })

      //User Public Stories
      .addCase(fetchUserPublicStoriesByIds.pending, (state) => {
        state.isPublicStoriesLoading = true;
        state.userPublicStories.publicStoriesError = null;
      })
      .addCase(fetchUserPublicStoriesByIds.fulfilled, (state, action) => {
        state.isPublicStoriesLoading = false;

        action.meta.arg.page === 1
          ? (state.userPublicStories.items = action.payload.response)
          : state.userPublicStories.items.push(...action.payload.response);
      })
      .addCase(fetchUserPublicStoriesByIds.rejected, (state, { payload }) => {
        state.isPublicStoriesLoading = false;
        state.userPublicStories.publicStoriesError = payload;
      });
  },
});

export default userSlice.reducer;
