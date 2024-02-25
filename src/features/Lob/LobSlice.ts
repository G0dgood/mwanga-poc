import { createSlice } from '@reduxjs/toolkit';

const defaultLob = {"name":"Branch","value":"branch"}; // Default LOB

// Retrieve the value from localStorage
const storedLobString = localStorage.getItem("mwangaCurrentLob");

// Parse the JSON string if it's not undefined, otherwise use the default LOB
const initialLob = storedLobString ? JSON.parse(storedLobString) : defaultLob;

const lobSlice = createSlice({
  name: 'lob',
  initialState: {
    currentLob: initialLob
  },
  reducers: {
    setLob(state, action) {
      state.currentLob = action.payload;
    },
  },
});

export const { setLob } = lobSlice.actions;
export default lobSlice.reducer;
