import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  logoutUser,
  registerUser,
  initializeAuth,
} from './operation';

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    isLoading: false,
    error: null,
    accessToken: '',
  },

  extraReducers: (builder) =>
    builder
      // #region register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // #region login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.accessToken = payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // #endregion login

      // #region initialize
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isLoading = false;
        state.accessToken = '';
      })
      // #endregion initialize

      // #region logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;

        state.accessToken = '';
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;

        state.accessToken = '';
      })
      // #endregion logout
      .addDefaultCase(() => {}),
});

export default authSlice.reducer;
