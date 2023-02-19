import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  initialLoad: true,
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
      return {
        ...initialState,
        initialLoad: false,
      };
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
