import { createSlice } from "@reduxjs/toolkit";

const locationFilterSlice = createSlice({
  name: 'locationFilter',
  initialState: {
    filters: []
  },
  reducers: {
    addLocationFilter: (state, action) => {
      const location = action.payload;
          console.log("11",location)
         
      if (!state.filters.includes(location)) {

        state.filters.push(location);
        console.log("15",Array.from(state.filters))
      }
    },
    removeLocationFilter: (state, action) => {
      const location = action.payload;
      state.filters = state.filters.filter(filter => filter !== location);
      console.log("19",Array.from(state.filters))
    }
  }
});

export const { addLocationFilter, removeLocationFilter } = locationFilterSlice.actions;

export default locationFilterSlice.reducer;
