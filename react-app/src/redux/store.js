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

const credentialsSlice = createSlice({
  name: "credentials",
  initialState: { isLogged: false, firstName: "", lastName: "", token: "" },
  reducers: {
    set(state, action) {
      return { isLogged: true, ...action.payload };
    },
  },
});

export const registrationThunk = (jsonData) => async (dispatch, getState) => {
  const data = jsonData;
  const response = await (
    await axios.post("/api/registration", data, {
      headers: { "Content-Type": "application/json" },
    })
  ).data;
  if (response.success) {
    dispatch(credentialsSlice.actions.set(response.data));
  }
};

export const loginThunk = (jsonData) => async (dispatch, getState) => {
  const data = jsonData;
  const response = await (
    await axios.post("/api/login", data, {
      headers: { "Content-Type": "application/json" },
    })
  ).data;
  if (response.success) {
    dispatch(credentialsSlice.actions.set(response.data));
  }
};

export const logoutThunk = async (dispatch, getState) => {
  const response = await (await axios.post("/api/logout", null)).data;
  if (response.success) {
    dispatch(credentialsSlice.actions.set({ isLogged: false }));
  }
};
export const getAllProductsThunk = async (dispatch, getState) => {
  const response = await (await axios.get("/api/products")).data;
  const action = { products: response.products, count: response.total };
  dispatch(productsSlice.actions.setProducts(action));
};

const store = configureStore({
  reducer: {
    product: productsSlice.reducer,
    credentials: credentialsSlice.reducer,
  },
});

export default store;
