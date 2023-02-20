import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLogged: false,
  email: "",
  firstName: "",
  lastName: "",
  access_token: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset(state, action) {
      return initialState;
    },
    set(state, action) {
      return action.payload;
    },
    apply: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export default userSlice;
