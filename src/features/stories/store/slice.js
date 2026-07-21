import { createSlice } from '@reduxjs/toolkit';
import {
  createStory,
  fetchCategories,
  fetchPublicStories,
  fetchPublicStoryById,
  updateStory,
} from './operation';

const initialState = {
  stories: {
    items: [],
    isFetched: false,
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
    isLoading: false,
    storyError: null,
  },

  draftCreateStory: {},
  draftEditStory: {},
};

const publicStoriesSlice = createSlice({
  name: 'publicStories',

  initialState,

  reducers: {
    clearStories: (state) => {
      state.stories.items = [];
    },

    setCategory: (state, { payload }) => {
      state.categories.selectedCategory = payload;
    },
    deleteCategory: (state) => {
      state.categories.selectedCategory = null;
    },

    setStorePage: (state, { payload }) => {
      state.stories.storePage = payload;
    },

    updateCreateDraft: (state, { payload }) => {
      state.draftCreateStory = payload;
    },
    updateEditDraft: (state, { payload }) => {
      state.draftEditStory = payload;
    },

    updatePublicStoriesList: (state, { payload }) => {
      state.stories.items = state.stories.items?.filter(
        (elem) => elem._id !== payload
      );
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
        state.stories.isFetched = true;

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
        state.story.isLoadingStory = true;
      })
      .addCase(fetchPublicStoryById.fulfilled, (state, { payload }) => {
        state.story.isLoading = false;
        state.story.storyData = payload;
        state.story.storyError = null;
      })
      .addCase(fetchPublicStoryById.rejected, (state, { payload }) => {
        state.story.isLoading = false;
        state.story.storyError = payload;
      })
      // #endregion Story By Id

      // #region Create Story
      .addCase(createStory.pending, (state) => {
        state.story.isLoading = true;
        state.story.storyError = null;
      })
      .addCase(createStory.fulfilled, (state, { payload }) => {
        state.story.isLoading = false;
        state.story.storyData = payload;
        state.stories.items.unshift(payload);
      })
      .addCase(createStory.rejected, (state, { payload }) => {
        state.story.isLoading = false;
        state.story.storyError = payload;
      })
      // #endregion Create Story

      // #region Update Story
      .addCase(updateStory.pending, (state) => {
        state.story.isLoading = true;
        state.story.storyError = null;
      })
      .addCase(updateStory.fulfilled, (state, { payload }) => {
        state.story.isLoading = false;
        state.story.storyData = payload;
      })
      .addCase(updateStory.rejected, (state, { payload }) => {
        state.story.isLoading = false;
        state.story.storyError = payload;
      })
      // #endregion Update Story

      .addDefaultCase();
  },
});

export const {
  clearStories,
  setCategory,
  deleteCategory,
  setStorePage,
  updateEditDraft,
  updateCreateDraft,
  updatePublicStoriesList,
} = publicStoriesSlice.actions;

export default publicStoriesSlice.reducer;
