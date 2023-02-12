import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const productsSlice = createSlice({
  name: "products",
  initialState: { products: [], count: 0 },
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const searchSlice = createSlice({
  name: "search",
  initialState: { set: false, title: "", brand: "", category: "" },
  reducers: {
    reset: (state, action) => {
      return { set: false, title: "", brand: "", category: "" };
    },
    apply: (state, action) => {
      console.log(state, action);
      return { ...state, set: true, ...action.payload };
    },
    set: (state, action) => {
      return { ...action.payload, set: true };
    },
  },
});

const userApi = createApi({
  reducerPath: "api/user",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/user" }),
  endpoints: (builder) => ({
    info: builder.query({
      query: (access_token) => ({
        url: "/info",
        method: "POST",
        body: {},
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }),
    }),
    refresh: builder.query({
      query: () => ({
        url: "/refresh",
        method: "POST",
        body: {},
      }),
    }),
    registration: builder.mutation({
      query: (data) => ({
        url: "/registration",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          url: "/login",
          method: "POST",
          body: data,
        };
      },
    }),
    logout: builder.query({
      query: (access_token) => ({
        url: "/logout",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }),
    }),
    update: builder.mutation({
      query: (data) => ({
        url: "/update",
        method: "PUT",
        body: data,
        headers: {
          Authorization: "Bearer " + data.access_token,
        },
      }),
    }),
  }),
});

const productApi = createApi({
  reducerPath: "api/product",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/products" }),
  endpoints: (builder) => ({
    get: builder.query({
      query: ({ id = "", method = "GET", access_token }) => {
        console.log(method);
        if (method === "GET")
          return {
            url: "/" + id,
            method: "GET",
          };
        else if (method === "POST") {
          return {
            url: "",
            method: "POST",
            headers: { Authorization: "Bearer " + access_token },
          };
        }
      },
    }),
    add: builder.mutation({
      query: ({ product, access_token }) => ({
        url: "/add",
        method: "POST",
        body: product,
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }),
    }),
    delete: builder.mutation({
      query: ({ id, access_token }) => ({
        url: "/" + id,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }),
    }),
    search: builder.query({
      query: (data) => ({
        url: "/search",
        method: "POST",
        body: data,
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

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
  },
  reducers: {
    reset(state, action) {
      return {
        firstName: "",
        lastName: "",
        email: "",
      };
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
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    newPassword: "",
  },
  reducers: {
    reset(state, action) {
      return {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      };
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
  const response = await (await axios.get("/api/products")).data;
  const action = { products: response.products, count: response.total };
  dispatch(productsSlice.actions.setProducts(action));
};

export const searchProductsThunk = (data) => async (dispatch, getState) => {
  const response = await (await axios.post("/api/products/search", data)).data;
  const action = { products: response, count: response.length };
  dispatch(productsSlice.actions.setProducts(action));
};

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    user: userSlice.reducer,
    login: loginSlice.reducer,
    registration: registrationSlice.reducer,
    profile: profileSlice.reducer,
    search: searchSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, productApi.middleware),
});

export default store;
export const {
  useLazyInfoQuery,
  useLazyRefreshQuery,
  useLazyLogoutQuery,
  useRegistrationMutation,
  useLoginMutation,
  useUpdateMutation,
} = userApi;

export const {
  useGetQuery,
  useLazyGetQuery,
  useAddMutation,
  useDeleteMutation,
  useLazySearchQuery,
} = productApi;
