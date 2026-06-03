export const selectTravellers = (state) => state.travellers;

export const selectUserData = (state) => state.travellers.user;

export const selectPublicStoriesIds = (state) =>
  state.travellers.user.publicStories;

export const selectLoadedPublilcStories = (state) =>
  state.travellers.userPublicStories;
