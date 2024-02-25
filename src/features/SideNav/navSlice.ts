// navSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavState {
  toggleSideNav: boolean;
}

const initialState: NavState = {
  toggleSideNav: localStorage.getItem('toggleSideNav') === 'true',
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    toggleSideNav: (state) => {
      state.toggleSideNav = !state.toggleSideNav;
      localStorage.setItem('toggleSideNav', state.toggleSideNav.toString());
    },
    setToggleSideNav: (state, action: PayloadAction<boolean>) => {
      state.toggleSideNav = action.payload;
      localStorage.setItem('toggleSideNav', action.payload.toString());
    },
  },
});

export const { toggleSideNav, setToggleSideNav } = navSlice.actions;
export default navSlice.reducer;
