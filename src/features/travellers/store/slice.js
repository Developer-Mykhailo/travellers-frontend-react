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
  // reducers: {
  //   setTravellers: (state, action) => {
  //     state.items = action.payload.data;
  //     state.hasNextPage = action.payload.hasNextPage;
  //   },

  //   appendTravellers: (state, action) => {
  //     state.items.push(...action.payload.data);
  //     state.hasNextPage = action.payload.hasNextPage;
  //   },

  //   setUser: (state, action) => {
  //     state.user = action.payload;
  //   },

  //   setUserPublicStories: (state, action) => {
  //     state.userPublicStories = action.payload;
  //   },

  //   appendUserPublicStories: (state, action) => {
  //     state.userPublicStories.push(...action.payload);
  //   },
  // },
  extraReducers: (builder) => {
    builder
      // travellers
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

      // traveller by id
      .addCase(fetchTravellerById.pending, (state) => {
        state.oneTraveller.isOneTravellerFetching = true;
      })
      .addCase(fetchTravellerById.fulfilled, (state, { payload }) => {
        state.oneTraveller.isOneTravellerFetching = false;
        state.oneTraveller.data = payload;
      })
      .addCase(fetchTravellerById.rejected, (state, { payload }) => {
        state.oneTraveller.isOneTravellerFetching = false;
        state.oneTraveller.travellerError = payload;
      })

      // traveller public stories
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
      });
  },
});

export const {
  setTravellers,
  appendTravellers,
  setUser,
  appendUserPublicStories,
  setUserPublicStories,
} = travellersSlice.actions;
export default travellersSlice.reducer;
