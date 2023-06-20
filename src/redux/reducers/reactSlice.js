import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingQuestions: false,
  reactQuestions: [],
  hasMoreQuestions: false,
  page: 1,
};
const reactSlice = createSlice({
  name: "react",
  initialState: initialState,
  reducers: {
    setLoadingReact: (state, action) => {
      console.log("ACTION===>", action);
      state.loadingQuestions = action.payload;
    },
    setReactQuestions: (state, action) => {
      console.log("ACTION===>", action.type);
      state.reactQuestions = action.payload;
    },
    setHasMoreReact: (state, action) => {
      console.log("ACTION===>", action);
      state.hasMoreQuestions = action.payload;
    },
    setPage: (state, action) => {
      console.log("ACTION===>", action);
      state.page = action.payload;
    },
  },
});

export const { setLoadingReact, setReactQuestions, setPage, setHasMoreReact } =
  reactSlice.actions;

export default reactSlice.reducer;
