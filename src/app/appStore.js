import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../features/auth/store/slice';
import publicStoriesReducer from '../features/stories/store/slice';
import travellersReduser from '../features/travellers/store/slice';
import userReducer from '../features/user/store/slice';

const authPersistConfig = {
  key: 'token',
  version: 1,
  storage,
  whitelist: ['accessToken', 'accessTokenValidUntil'],
};

const publicStoriesPersistConfig = {
  key: 'draftStory',
  version: 1,
  storage,
  whitelist: ['draftCreateStory', 'draftEditStory'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const persitPublicStoriesReducer = persistReducer(
  publicStoriesPersistConfig,
  publicStoriesReducer
);

export const appStore = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: userReducer,
    publicStories: persitPublicStoriesReducer,
    travellers: travellersReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(appStore);
