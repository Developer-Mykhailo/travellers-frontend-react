import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './operation';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    isLoading: false,
    error: null,

    user: {
      name: '',
      email: '',
      data: {
        // userId: '695858b59fc216ae51149192',
        accessToken: 'M7wFYOlnFb3TIBDaSPc2HcO+le7UMbQIg1uiihTf',
        // refreshToken: 'tWSYNIhTNmF6qSULHnfkSKomwXKDPStNHdIIbDxh',
        // accessTokenValidUntil: '2026-06-11T23:04:00.367Z',
        // refreshTokenValidUntil: '2026-06-18T18:04:00.367Z',
        // _id: '6a2af890e75e8a6007d32e59',
        // createdAt: '2026-06-11T18:04:00.368Z',
        // updatedAt: '2026-06-11T18:04:00.368Z',
      },
    },
  },
  extraReducers: (builder) =>
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user.name = payload.user.name;
        state.user.email = payload.user.email;
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
        state.user.data.accessToken = payload.accessToken;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      }),
});

export default authSlice.reducer;
