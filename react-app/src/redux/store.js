import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const productsSlice = createSlice({
  name: "products",
  initialState: { products: [], count: 0 },
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
  },
});
export const getAllProducts = async (dispatch, getState) => {
  const response = await (await axios.get("/api/products")).data;
  const action = { products: response.products, count: response.total };
  dispatch(productsSlice.actions.setProducts(action));
};

const store = configureStore({
  reducer: productsSlice.reducer,
});

export default store;
