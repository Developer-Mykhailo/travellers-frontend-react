import { configureStore } from '@reduxjs/toolkit';

import publicStoriesReducer from '../features/stories/store/slice';
import travellers from '../features/travellers/store/slice';

const appStore = configureStore({
  reducer: {
    publicStories: publicStoriesReducer,
    travellers: travellers,
  },
});

export default appStore;
