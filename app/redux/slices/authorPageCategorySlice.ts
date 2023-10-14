import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Category = "entries" | "statistics" | "favorites";

interface initialStateCategory {
  category: Category;
}

const initialState: initialStateCategory = {
  category: "entries",
};

const authorPageCategorySlice = createSlice({
  name: "authorCategory",
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
    },
    resetCategory: (state) => {
      state.category = "entries";
    },
  },
  initialState,
});

export default authorPageCategorySlice.reducer;
export const { setCategory, resetCategory } = authorPageCategorySlice.actions;
