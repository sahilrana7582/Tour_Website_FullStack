import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState = {
  allTours: [],
  singleTour: {},
  userInfo: {
    name: '',
    role: '',
    email: '',
    imageURL: '',
  },
};

const tourSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    getAllTours: (state, action) => {
      console.log(action.payload);
      state.allTours = action.payload;
    },
    setOneTour: (state, action) => {
      state.singleTour = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = { ...action.payload };
    },
  },
});
export const { getAllTours, setOneTour, setUserInfo } = tourSlice.actions;
export const tourReducer = tourSlice.reducer;
