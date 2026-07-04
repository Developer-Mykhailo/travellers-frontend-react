import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserPublicStoriesByIds,
  fetchUserSavedStoriesByIds,
} from './operation';

const initialState = {
  isUserLoading: false,
  userError: null,
  data: {},

  userPublicStories: {
    isPublicStoriesLoading: false,
    publicStoriesError: null,
    items: [],
  },

  userSavedStories: {
    isSavedStoriesLoading: false,
    savedStoriesError: null,
    items: [],
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
      const item = state.userPublicStories.items.find(
        (item) => item._id === payload._id
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

      // #region User Public Stories
      .addCase(fetchUserSavedStoriesByIds.pending, (state) => {
        state.isSavedStoriesLoading = true;
        state.userSavedStories.savedStoriesError = null;
      })
      .addCase(fetchUserSavedStoriesByIds.fulfilled, (state, action) => {
        state.isSavedStoriesLoading = false;

        action.meta.arg.page === 1
          ? (state.userSavedStories.items = action.payload.response)
          : state.userSavedStories.items.push(...action.payload.response);
      })
      .addCase(fetchUserSavedStoriesByIds.rejected, (state, { payload }) => {
        state.isSavedStoriesLoading = false;
        state.userSavedStories.savedStoriesError = payload;
      })
      // #endregion User Public Stories

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
