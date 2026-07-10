import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserPublicStoriesByIds,
  fetchUserSavedStoriesByIds,
  toggleSaveStory,
} from './operation';

const initialState = {
  isUserLoading: false,
  userError: null,
  data: {},

  userPublicStories: {
    items: [],
    loading: false,
    error: null,
  },

  userSavedStories: {
    items: [],
    loading: false,
    error: null,
  },

  toggleSaveStory: {
    loading: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    clearUser(state) {
      state.data = {};
    },

    changeSavedStories(state, { payload }) {
      state.data.savedStories = payload;
    },

    changeSavedStoriesItems(state, { payload }) {
      state.userSavedStories.items = payload;
    },

    setUpdatedStoryItem(state, { payload }) {
      const item = state.userPublicStories?.items?.find(
        (item) => item.id === payload._id
      );

      if (item) {
        const preparedData = {
          ...payload,
          category: payload.category.name,
          isChanged: true,
        };

        Object.assign(item, preparedData);
      }
    },

    changePublicStoriesIds(state, { payload }) {
      state.data.publicStories = state.data.publicStories.filter(
        (id) => id !== payload
      );
    },

    changePublicStoriesItems(state, { payload }) {
      state.userPublicStories.items = state.userPublicStories.items.filter(
        (item) => item._id !== payload
      );
    },
  },

  //!
  extraReducers: (buider) => {
    buider

      // #region User Public Stories
      .addCase(fetchUserPublicStoriesByIds.pending, (state) => {
        state.loading = true;
        state.userPublicStories.error = null;
      })
      .addCase(fetchUserPublicStoriesByIds.fulfilled, (state, action) => {
        state.loading = false;

        action.meta.arg.page === 1
          ? (state.userPublicStories.items = action.payload.response)
          : state.userPublicStories.items.push(...action.payload.response);
      })
      .addCase(fetchUserPublicStoriesByIds.rejected, (state, { payload }) => {
        state.loading = false;
        state.userPublicStories.error = payload;
      })
      // #endregion User Public Stories

      // #region User Saved Stories
      .addCase(fetchUserSavedStoriesByIds.pending, (state) => {
        state.loading = true;
        state.userSavedStories.error = null;
      })
      .addCase(fetchUserSavedStoriesByIds.fulfilled, (state, action) => {
        state.loading = false;

        action.meta.arg.page === 1
          ? (state.userSavedStories.items = action.payload.response)
          : state.userSavedStories.items.push(...action.payload.response);
      })
      .addCase(fetchUserSavedStoriesByIds.rejected, (state, { payload }) => {
        state.loading = false;
        state.userSavedStories.error = payload;
      })
      // #endregion User Saved Stories

      // #region Toggle Saved Story
      .addCase(toggleSaveStory.pending, (state) => {
        state.toggleSaveStory.loading = true;
      })
      .addCase(toggleSaveStory.fulfilled, (state, { payload }) => {
        state.toggleSaveStory.loading = false;

        const isSaved = payload.data.saved;
        const story = payload.data.updatedStory;

        if (isSaved) {
          state.data.savedStories.unshift(story._id);
          state.userSavedStories.items.unshift(story); //
        } else {
          state.data.savedStories = state.data.savedStories.filter(
            (elem) => elem !== story._id
          );

          state.userSavedStories.items = state.userSavedStories.items.filter(
            (elem) => elem._id !== story._id
          );
        }
      })
      .addCase(toggleSaveStory.rejected, (state, { payload }) => {
        state.toggleSaveStory.loading = false;
        state.toggleSaveStory.error = payload;
      })
      // #endregion Toggle Saved Story Stories

      .addDefaultCase(() => {});
  },
});

export const {
  setUser,
  clearUser,
  setUserStorePage,
  changeSavedStoriesItems,
  changeSavedStories,
  setUpdatedStoryItem,
  changePublicStoriesIds,
  changePublicStoriesItems,
} = userSlice.actions;

export default userSlice.reducer;
