import { createSlice } from "@reduxjs/toolkit";

interface SetTopicIdState {
  topicId: string | null;
}

const initialState: SetTopicIdState = {
  topicId: null,
};

const setTopicIdSlice = createSlice({
  name: "setTopicId",
  initialState,
  reducers: {
    setTopicId: (state, action) => {
      state.topicId = action.payload;
    },
  },
});

export default setTopicIdSlice.reducer;
export const { setTopicId } = setTopicIdSlice.actions;
