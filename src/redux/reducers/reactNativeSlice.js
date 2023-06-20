import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingNative: false,
  nativeQuestions: [],
  hasMoreNative: false,
  nativePage: 1,
};
const reactNativeSlice = createSlice({
  name: "react_native",
  initialState: initialState,
  reducers: {
    setLoadingNative: (state, action) => {
      console.log("ACTION===>", action);
      state.loadingNative = action.payload;
    },
    setNativeQuestions: (state, action) => {
      console.log("ACTION===>", action.type);
      state.nativeQuestions = action.payload;
    },
    setHasMoreNative: (state, action) => {
      console.log("ACTION===>", action);
      state.hasMoreNative = action.payload;
    },
    setPageNative: (state, action) => {
      console.log("ACTION===>", action);
      state.nativePage = action.payload;
    },
  },
});

export const {
  setLoadingNative,
  setNativeQuestions,
  setPageNative,
  setHasMoreNative,
} = reactNativeSlice.actions;

export default reactNativeSlice.reducer;
