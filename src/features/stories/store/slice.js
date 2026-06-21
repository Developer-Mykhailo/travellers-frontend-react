import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCategories,
  fetchPublicStories,
  fetchPublicStoryById,
} from './operation';

const publicStoriesSlice = createSlice({
  name: 'publicStories',

  initialState: {
    stories: {
      items: [],
      hasNextPage: false,
      totalItems: 0,
      storePage: 1,
      isFetchingStories: false,
      storiesError: null,
    },

    categories: {
      items: [],
      selectedCategory: null,
      isFetchingCategories: false,
      categoriesError: null,
    },

    story: {
      storyData: {},
      isfetchingStoryById: false,
      storyError: null,
    },
  },

  reducers: {
    setCategory: (state, { payload }) => {
      state.categories.selectedCategory = payload;
    },
    deleteCategory: (state) => {
      state.categories.selectedCategory = null;
    },

    setStorePage: (state, { payload }) => {
      state.stories.storePage = payload;
    },
  },

  //!---------------------------
  extraReducers: (builder) => {
    builder
      // #region Public Stories
      .addCase(fetchPublicStories.pending, (state) => {
        state.stories.isFetchingStories = true;
      })
      .addCase(fetchPublicStories.fulfilled, (state, action) => {
        state.stories.isFetchingStories = false;
        state.stories.storiesError = null;

        action.meta.arg.page === 1
          ? (state.stories.items = action.payload.data)
          : state.stories.items.push(...action.payload.data);

        state.stories.hasNextPage = action.payload.hasNextPage;
        state.stories.totalItems = action.payload.totalItems;
      })
      .addCase(fetchPublicStories.rejected, (state, action) => {
        state.stories.isFetchingStories = false;
        state.stories.storiesError = action.payload;
      })
      // #endregion Public Stories

      // #region Categories
      .addCase(fetchCategories.pending, (state) => {
        state.categories.isFetchingCategories = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories.isFetchingCategories = false;
        state.categories.items = payload;
      })
      .addCase(fetchCategories.rejected, (state, { payload }) => {
        state.categories.isFetchingCategories = false;
        state.categories.categoriesError = payload;
      })
      // #endregion Categories

      // #region Story By Id
      .addCase(fetchPublicStoryById.pending, (state) => {
        state.isfetchingStoryById = true;
      })
      .addCase(fetchPublicStoryById.fulfilled, (state, { payload }) => {
        state.isfetchingStoryById = false;
        state.story.storyData = payload;
        state.story.storyError = null;
      })
      .addCase(fetchPublicStoryById.rejected, (state, { payload }) => {
        state.isfetchingStoryById = false;
        state.story.storyError = payload;
      })
      // #endregion Story By Id

      .addDefaultCase();
  },
});

export const { setCategory, deleteCategory, setStorePage } =
  publicStoriesSlice.actions;

export default publicStoriesSlice.reducer;
