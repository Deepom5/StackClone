import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import themeReducer from "./reducers/themeSlice";
import reactReducer from "./reducers/reactSlice";
import reactNativeReducer from "./reducers/reactNativeSlice";
import nodeReducer from "./reducers/nodeSlice";

export const rootReducer = combineReducers({
  theme: themeReducer,
  react: reactReducer,
  native: reactNativeReducer,
  node: nodeReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const RootState = store.getState();
export const AppDispatch = store.dispatch;

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const AppThunk = (dispatch, getState) => {
  // define your thunk logic here
};

export default store;
