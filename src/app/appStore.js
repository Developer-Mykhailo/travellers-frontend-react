import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/store/slice';
import publicStoriesReducer from '../features/stories/store/slice';
import travellersReduser from '../features/travellers/store/slice';
import userReducer from '../features/user/store/slice';

const appStore = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    publicStories: publicStoriesReducer,
    travellers: travellersReduser,
  },
});

export default appStore;
