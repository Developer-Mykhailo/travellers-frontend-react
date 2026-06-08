export const selectTravellers = (state) => state.travellers.travellersData;

export const selectTravellerData = (state) => state.travellers.oneTraveller;

// export const selectPublicStoriesIds = (state) =>
//   state.travellers.user.publicStories;

export const selectTravellerPublicStories = (state) =>
  state.travellers.oneTraveller.travellerPublicStories.items;
