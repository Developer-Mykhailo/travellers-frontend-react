import { configureStore } from '@reduxjs/toolkit';

import publicStoriesReducer from '../features/stories/store/slice';

const appStore = configureStore({
  reducer: {
    publicStories: publicStoriesReducer,
  },
});

export default appStore;
