import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'travellers',

  initialState: {
    items: [],
    hasNextPage: false,
    //---------------------------------------------------------------
    user: {},
    userPublicStories: [],
  },
  reducers: {
    setTravellers: (state, action) => {
      state.items = action.payload.data;
      state.hasNextPage = action.payload.hasNextPage;
    },

    appendTravellers: (state, action) => {
      state.items.push(...action.payload.data);
      state.hasNextPage = action.payload.hasNextPage;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setUserPublicStories: (state, action) => {
      state.userPublicStories = action.payload;
    },

    appendUserPublicStories: (state, action) => {
      state.userPublicStories.push(...action.payload);
    },
  },
});

export const {
  setTravellers,
  appendTravellers,
  setUser,
  appendUserPublicStories,
  setUserPublicStories,
} = slice.actions;
export default slice.reducer;
