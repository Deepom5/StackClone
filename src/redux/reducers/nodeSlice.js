import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingNode: false,
  nodeQuestions: [],
  hasMoreNode: false,
  nodePage: 1,
};
const nodeSlice = createSlice({
  name: "react_Node",
  initialState: initialState,
  reducers: {
    setLoadingNode: (state, action) => {
      console.log("ACTION===>", action);
      state.loadingNode = action.payload;
    },
    setNodeQuestions: (state, action) => {
      console.log("ACTION===>", action.type);
      state.nodeQuestions = action.payload;
    },
    setHasMoreNode: (state, action) => {
      console.log("ACTION===>", action);
      state.hasMoreNode = action.payload;
    },
    setPageNode: (state, action) => {
      console.log("ACTION===>", action);
      state.nodePage = action.payload;
    },
  },
});

export const { setLoadingNode, setNodeQuestions, setPageNode, setHasMoreNode } =
  nodeSlice.actions;

export default nodeSlice.reducer;
