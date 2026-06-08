import { createSlice } from '@reduxjs/toolkit';
import { fetchTravellerById, fetchTravellers } from './operation';

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
      isOneTravellerFetching: false,
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
