import { createSlice } from '@reduxjs/toolkit';
import { fetchUserPublicStoriesByIds } from './operation';

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
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },

    clearUser(state) {
      state.data = {};
    },
  },
  extraReducers: (buider) => {
    buider

      // #region User Public Stories
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
      })
      // #endregion User Public Stories

      .addDefaultCase(() => {});
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
