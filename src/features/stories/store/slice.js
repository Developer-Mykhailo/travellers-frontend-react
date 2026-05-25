import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'publicStories',
  initialState: [],
  reducers: {
    setPublicStories: (_, action) => {
      return action.payload;
    },

    appendPublicStories: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { setPublicStories, appendPublicStories } = slice.actions;
export default slice.reducer;
