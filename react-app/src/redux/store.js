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
const userSlice = createSlice({
  name: "user",
  initialState: { isLogged: false, isGuest: true },
  reducers: {
    login(state, action) {
      state.isLogged = true;
      state.isGuest = false;
    },
    logout(state, action) {
      state.isLogged = false;
      state.isGuest = true;
    },
  },
});

export const registrationThunk = (jsonData) => async (dispatch, getState) => {
  const data = jsonData;
  await axios.post("/api/registration", data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const loginThunk = async (dispatch, getState) => {
  await axios.post("/api/login", null);
  dispatch(userSlice.actions.login());
};

export const logoutThunk = async (dispatch, getState) => {
  await axios.post("/api/logout", null);
  dispatch(userSlice.actions.logout());
};
export const getAllProductsThunk = async (dispatch, getState) => {
  const response = await (await axios.get("/api/products")).data;
  const action = { products: response.products, count: response.total };
  dispatch(productsSlice.actions.setProducts(action));
};

const store = configureStore({
  reducer: { product: productsSlice.reducer, user: userSlice.reducer },
});

export default store;
