import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type NavbarCategoryType =
  | "popular"
  | "top"
  | "politics"
  | "programming"
  | "today"
  | null;

interface setNavbarCategoryState {
  // navbarCategory: string | null;
  navbarCategory: NavbarCategoryType;
}

const initialState: setNavbarCategoryState = {
  navbarCategory: null,
};

const setNavbarCategory = createSlice({
  name: "setNavbarCategory",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.navbarCategory = action.payload;
    },
    resetCategory: (state) => {
      state.navbarCategory = null;
    },
  },
});

export default setNavbarCategory.reducer;
export const { setCategory, resetCategory } = setNavbarCategory.actions;
