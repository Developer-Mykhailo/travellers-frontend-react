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
      isFetchingStories: false,
      storiesError: null,
    },

    categories: {
      items: [],
      isFetchingCategories: false,
      categoriesError: null,
    },

    story: {
      storyData: {},
      isfetchingStoryById: false,
      storyError: null,
    },
  },

  //!---------------------------
  extraReducers: (builder) => {
    builder
      // Public Stories
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
      })
      .addCase(fetchPublicStories.rejected, (state, action) => {
        state.stories.isFetchingStories = false;
        state.stories.storiesError = action.payload;
      })

      // Categories
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

      // Story By Id
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
      });
  },
});

export default publicStoriesSlice.reducer;
