// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: JSON.parse(localStorage.getItem('user')) || []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserDetails: (state, action) => {
      state.userDetails = action.payload;
      console.log("redux",action.payload)
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    removeUserDetails: (state) => {
      state.userDetails = null;
      localStorage.removeItem('user');
    },
  },
});

export const { addUserDetails, removeUserDetails } = userSlice.actions;

export const selectUserDetails = (state) => state.user.userDetails;

export default userSlice.reducer;
