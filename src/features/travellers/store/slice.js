import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTravellerById,
  fetchTravellers,
  fetchTravellerStoriesByIds,
} from './operation';

const travellersSlice = createSlice({
  name: 'travellers',

  initialState: {
    travellersData: {
      items: [],
      totalItems: 0,
      hasNextPage: false,
      isTravellersFetching: false,
      travellersError: null,
    },

    storePage: 1,

    oneTraveller: {
      data: {},
      isOneTravellerFetching: false,
      travellerError: null,

      travellerPublicStories: {
        items: [],
        isPublicStoriesFetching: false,
        publicStoriesError: false,
      },
    },
  },

  reducers: {
    setTravellersStorePage: (state, { payload }) => {
      state.storePage = payload;
    },
  },

  //!
  extraReducers: (builder) => {
    builder
      // #region travellers
      .addCase(fetchTravellers.pending, (state) => {
        state.travellersData.isTravellersFetching = true;
      })
      .addCase(fetchTravellers.fulfilled, (state, action) => {
        state.travellersData.isTravellersFetching = false;

        action.meta.arg.page === 1
          ? (state.travellersData.items = action.payload.data)
          : state.travellersData.items.push(...action.payload.data);

        state.travellersData.hasNextPage = action.payload.hasNextPage;
        state.travellersData.totalItems = action.payload.totalItems;
        state.travellersData.travellersError = null;
      })
      .addCase(fetchTravellers.rejected, (state, { payload }) => {
        state.travellersData.isTravellersFetching = false;
        state.travellersData.travellersError = payload;
      })
      // #endregion travellers

      // #region traveller by id
      .addCase(fetchTravellerById.pending, (state) => {
        state.oneTraveller.isOneTravellerFetching = true;
        state.oneTraveller.data = {};
        state.oneTraveller.travellerPublicStories.items = [];
        state.oneTraveller.travellerError = null;
      })
      .addCase(fetchTravellerById.fulfilled, (state, { payload }) => {
        state.oneTraveller.isOneTravellerFetching = false;
        state.oneTraveller.data = payload;
      })
      .addCase(fetchTravellerById.rejected, (state, { payload }) => {
        state.oneTraveller.isOneTravellerFetching = false;
        state.oneTraveller.travellerError = payload;
      })
      // #endregion traveller by id

      // #region traveller public stories
      .addCase(fetchTravellerStoriesByIds.pending, (state) => {
        state.oneTraveller.travellerPublicStories.isPublicStoriesFetching = true;
      })
      .addCase(
        fetchTravellerStoriesByIds.fulfilled,
        (state, { payload: { page, response } }) => {
          state.oneTraveller.travellerPublicStories.isPublicStoriesFetching = false;

          page === 1
            ? (state.oneTraveller.travellerPublicStories.items = response)
            : state.oneTraveller.travellerPublicStories.items.push(...response);
        }
      )
      .addCase(fetchTravellerStoriesByIds.rejected, (state, payload) => {
        state.oneTraveller.travellerPublicStories.isPublicStoriesFetching = false;
        state.oneTraveller.travellerPublicStories.publicStoriesError = payload;
      })
      // #endregion traveller public stories
      .addDefaultCase();
  },
});

export const { setTravellersStorePage } = travellersSlice.actions;
export default travellersSlice.reducer;
