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
  initialState: {
    isLogged: false,
    firstName: "",
    lastName: "",
    access_token: "",
  },
  reducers: {
    set(state, action) {
      return { isLogged: true, ...action.payload };
    },
  },
});

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    set(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const registrationSlice = createSlice({
  name: "registration",
  initialState: { firstName: "", lastName: "", email: "", password: "" },
  reducers: {
    set(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const registrationThunk = async (dispatch, getState) => {
  const data = getState()["registration"];
  const response = await (
    await axios.post("/api/user/registration", data, {
      headers: { "Content-Type": "application/json" },
    })
  ).data;
  if (response.success) {
    dispatch(userSlice.actions.set(response.data));
    dispatch(loginSlice.actions.set({ email: "", password: "" }));
    dispatch(
      registrationSlice.actions.set({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      })
    );
  }
};

export const loginThunk = async (dispatch, getState) => {
  const data = getState()["login"];
  const response = await (
    await axios.post("/api/user/login", data, {
      headers: { "Content-Type": "application/json" },
    })
  ).data;
  if (response.success) {
    dispatch(userSlice.actions.set(response.user));
    dispatch(loginSlice.actions.set({ email: "", password: "" }));
    dispatch(
      registrationSlice.actions.set({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      })
    );
  }
};

export const logoutThunk = async (dispatch, getState) => {
  const response = await (await axios.get("/api/user/logout")).data;
  if (response.success) {
    dispatch(userSlice.actions.set({ isLogged: false }));
  }
};
export const getProductsThunk = (param) => async (dispatch, getState) => {
  const response = await (await axios.get(`/api/products?title=${param}`)).data;
  const action = { products: response.products, count: response.total };
  dispatch(productsSlice.actions.setProducts(action));
};

const store = configureStore({
  reducer: {
    product: productsSlice.reducer,
    user: userSlice.reducer,
    login: loginSlice.reducer,
    registration: registrationSlice.reducer,
  },
});

export default store;
