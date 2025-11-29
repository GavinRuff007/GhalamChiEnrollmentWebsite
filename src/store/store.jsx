import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../slices/formSlice";
import { apiSlice } from "../services/apiSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(apiSlice.middleware),
});
