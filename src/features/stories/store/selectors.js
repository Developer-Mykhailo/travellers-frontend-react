export const selectPublicStories = (state) => state.publicStories.stories;

export const selectCategories = (state) => state.publicStories.categories.items;

export const selectStory = (state) => state.publicStories.story.storyData;

export const selectCurrentCategory = (state) =>
  state.publicStories.categories.selectedCategory;

export const selectStorePage = (state) => state.publicStories.stories.storePage;
