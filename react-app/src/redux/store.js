import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    info: builder.query({
      query: (access_token) => ({
        url: "/user/info",
        method: "POST",
        body: {},
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }),
    }),
    refresh: builder.query({
      query: () => ({
        url: "/user/refresh",
        method: "POST",
        body: {},
      }),
    }),
    registration: builder.mutation({
      query: (data) => ({
        url: "/user/registration",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          url: "/user/login",
          method: "POST",
          body: data,
        };
      },
    }),
    logout: builder.query({
      query: (access_token) => ({
        url: "/user/logout",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }),
    }),
    update: builder.mutation({
      query: (data) => ({
        url: "/user/update",
        method: "PUT",
        body: data,
        headers: {
          Authorization: "Bearer " + data.access_token,
        },
      }),
    }),
  }),
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    initialLoad: true,
    isLogged: false,
    email: "",
    firstName: "",
    lastName: "",
    access_token: "",
  },
  reducers: {
    reset(state, action) {
      return {
        initialLoad: false,
        isLogged: false,
        email: "",
        firstName: "",
        lastName: "",
        access_token: "",
      };
    },
    set(state, action) {
      return action.payload;
    },
  },
});

export const loginSlice = createSlice({
  name: "login",
  initialState: { email: "", password: "" },
  reducers: {
    reset() {
      return { email: "", password: "" };
    },
    set(state, action) {
      return action.payload;
    },
    apply(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const registrationSlice = createSlice({
  name: "registration",
  initialState: { firstName: "", lastName: "", email: "", password: "" },
  reducers: {
    reset(state, action) {
      return { firstName: "", lastName: "", email: "", password: "" };
    },
    set(state, action) {
      return action.payload;
    },
    apply(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

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
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
export const {
  useLazyInfoQuery,
  useLazyRefreshQuery,
  useLazyLogoutQuery,
  useRegistrationMutation,
  useLoginMutation,
  useUpdateMutation,
} = api;
