import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "slice",
  initialState: "",
  reducers: {},
});

const store = configureStore({
  reducer: slice,
});

export default store;
