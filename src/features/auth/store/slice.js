import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  logoutUser,
  registerUser,
  initializeAuth,
} from './operation';

const initialState = {
  isLoading: false,
  error: null,
  accessToken: '',
  accessTokenValidUntil: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setAccessTokenObj(state, { payload }) {
      state.accessToken = payload.accessToken;
      state.accessTokenValidUntil = payload.accessTokenValidUntil;
    },
  },

  //!
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
      // #endregion register

      // #region login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.accessToken = payload.accessToken;
        state.accessTokenValidUntil = payload.accessTokenValidUntil;
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
      .addCase(initializeAuth.rejected, (state, { payload }) => {
        return { ...initialState, error: payload };
      })
      // #endregion initialize

      // #region logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(logoutUser.rejected, () => {
        return { ...initialState };
      })
      // #endregion logout
      .addDefaultCase(() => {}),
});

export const { setAccessTokenObj } = authSlice.actions;
export default authSlice.reducer;
