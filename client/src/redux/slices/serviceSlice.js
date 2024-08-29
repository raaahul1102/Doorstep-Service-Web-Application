// serviceSlice.js

import { createSlice } from '@reduxjs/toolkit';
const storedServices = localStorage.getItem('services');
const initialState = {
  services: storedServices ? JSON.parse(storedServices) : [],
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    addServices: (state, action) => {
      state.services = action.payload;
      localStorage.setItem('services', JSON.stringify(action.payload));
    },
  },
  removeService: (state, action) => {
    state.services = state.services.filter(service => service._id !== action.payload);
    localStorage.setItem('services', JSON.stringify(state.services));
  },
});

export const { addServices, removeService} = serviceSlice.actions;

export default serviceSlice.reducer;
