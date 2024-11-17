import { configureStore } from '@reduxjs/toolkit';
import { tourReducer } from './slices/tour';
const store = configureStore({
  reducer: {
    tours: tourReducer,
  },
});

export default store;
