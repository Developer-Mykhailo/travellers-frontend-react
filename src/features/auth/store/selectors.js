export const selectIsAuth = (state) => Boolean(state.auth.accessToken);

export const selectAccessTokenValidUntil = (state) =>
  state.auth.accessTokenValidUntil;
