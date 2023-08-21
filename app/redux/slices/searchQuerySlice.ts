import { createSlice } from "@reduxjs/toolkit";

type Query =
  | {
      created_at: string;
      id: string;
      title: string;
      updated_at: string | null;
      user_id: string;
    }[]
  | null;

interface SearchQueryState {
  searchResponse: Query | [] | undefined;
  searchQueryString: string | null;
}

const initialState: SearchQueryState = {
  searchResponse: undefined,
  searchQueryString: null,
};

const searchQuerySlice = createSlice({
  name: "searchQueryData",
  initialState,
  reducers: {
    getSearchQueryData: (state, action) => {
      state.searchResponse = action.payload;
    },
    setSearchQueryString: (state, action) => {
      state.searchQueryString = action.payload;
    },
    resetSearchQueryState: (state) => {
      state.searchResponse = undefined;
      state.searchQueryString = null;
    },
  },
});

export default searchQuerySlice.reducer;
export const {
  getSearchQueryData,
  setSearchQueryString,
  resetSearchQueryState,
} = searchQuerySlice.actions;
