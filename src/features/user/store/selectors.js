export const selectUser = (state) => state.user.data;

export const selectUserPublicStories = (state) =>
  state.user.userPublicStories.items;
