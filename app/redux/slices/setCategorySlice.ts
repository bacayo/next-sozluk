import { createSlice } from "@reduxjs/toolkit";

interface SetCategoryState {
  category: "popular" | "top" | "#politics" | "#programming" | null;
}

const initialState: SetCategoryState = {
  category: null,
};

const setCategorySlice = createSlice({
  name: "setCategory",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export default setCategorySlice.reducer;
export const { setCategory } = setCategorySlice.actions;
