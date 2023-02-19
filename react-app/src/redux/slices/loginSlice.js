import { createSlice } from "@reduxjs/toolkit";
const initialState = { email: "", password: "" };
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    set(state, action) {
      return action.payload;
    },
    apply(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export default loginSlice;
