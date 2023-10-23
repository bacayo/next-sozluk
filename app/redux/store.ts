import { configureStore } from "@reduxjs/toolkit";

import authorPageCategoryReducer from "../redux/slices/authorPageCategorySlice";
import setNavbarCategoryReducer from "../redux/slices/setNavbarCategory";

export const store = configureStore({
  reducer: {
    authorPageCategory: authorPageCategoryReducer,
    setNavbarCategory: setNavbarCategoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
