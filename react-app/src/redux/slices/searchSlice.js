import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  title: "",
  brand: "",
  category: "",
  minPrice: 0,
  maxPrice: 999999,
  minStock: 0,
  maxStock: 999999,
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    reset: (state, action) => {
      return initialState;
    },
    apply: (state, action) => {
      return { ...state, ...action.payload };
    },
    set: (state, action) => {
      return { ...action.payload };
    },
  },
});

export default searchSlice;
