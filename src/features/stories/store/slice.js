import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'publicStories',
  initialState: [],
  reducers: {
    setPublicStories(state, action) {
      state.push(...action.payload.data);
    },
  },
});

export const { setPublicStories } = slice.actions;
export default slice.reducer;
