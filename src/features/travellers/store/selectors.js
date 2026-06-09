export const selectTravellers = (state) => state.travellers.travellersData;

export const selectTravellerData = (state) => state.travellers.oneTraveller;

export const selectTravellerPublicStories = (state) =>
  state.travellers.oneTraveller.travellerPublicStories.items;

export const selectTravellerError = (state) =>
  state.travellers.oneTraveller.travellerError;
