import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './operation';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    isLoading: false,
    error: null,
    accessToken: '',
  },
  extraReducers: (builder) =>
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      //login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.accessToken = payload.accessToken;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      }),
});

export default authSlice.reducer;
