import { configureStore } from "@reduxjs/toolkit";
import setTopicIdReducer from "@/app/redux/slices/setTopicIdSlice";
import setCategoryReducer from "@/app/redux/slices/setCategorySlice";

export const store = configureStore({
  reducer: {
    setTopicId: setTopicIdReducer,
    setCategory: setCategoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
