import { configureStore } from '@reduxjs/toolkit'
import serviceReducer from './slices/serviceSlice'
import userReducer from './slices/userSlice'; 
import locationFilterReducer from './slices/locationFilerSlice'
import cartReducer from './slices/cartSlice'
export const store = configureStore({
  reducer: {
    services:serviceReducer,
    user:userReducer,
    locationFilter:locationFilterReducer,
    cart:cartReducer,
  }
})