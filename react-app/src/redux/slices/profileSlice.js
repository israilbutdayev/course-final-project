import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset(state, action) {
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

export default profileSlice;
