export const selectPublicStories = (state) => state.publicStories.stories;

export const selectCategories = (state) => state.publicStories.categories.items;

export const selectStory = (state) => state.publicStories.story.storyData;

export const selectCurrentCategory = (state) =>
  state.publicStories.categories.selectedCategory;

export const selectStorePage = (state) => state.publicStories.stories.storePage;

export const selectDraftCreateStory = (state) =>
  state.publicStories.draftCreateStory;

export const selectDraftEditStory = (state) =>
  state.publicStories.draftEditStory;

export const selectIsFetched = (state) => state.publicStories.stories.isFetched;
