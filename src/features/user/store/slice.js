import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from './operation';

const userSlice = createSlice({
  name: 'user',

  initialState: {
    isUserLoading: false,
    userError: null,
    data: {},
  },
  extraReducers: (buider) => {
    buider
      .addCase(fetchUser.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.isUserLoading = false;
        state.userError = null;
        state.data = payload;
      })
      .addCase(fetchUser.rejected, (state, { payload }) => {
        state.isUserLoading = false;
        state.userError = payload;
      });
  },
});

export default userSlice.reducer;
