export const selectUser = (state) => state.user.data;

export const selectUserPublicStoriesItems = (state) =>
  state.user.userPublicStories.items;

export const selectUserSavedStoriesItems = (state) =>
  state.user.userSavedStories.items;
