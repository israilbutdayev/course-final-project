import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/baseApi";
import userApi from "./api/userApi";
import productsApi from "./api/productsApi";
import userSlice from "./slices/userSlice";
import loginSlice from "./slices/loginSlice";
import registrationSlice from "./slices/registrationSlice";
import profileSlice from "./slices/profileSlice";
import searchSlice from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    user: userSlice.reducer,
    login: loginSlice.reducer,
    registration: registrationSlice.reducer,
    profile: profileSlice.reducer,
    search: searchSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, productsApi.middleware),
});

export default store;

export const {
  useRegistrationMutation,
  useUpdateMutation,
  useLogoutMutation,
  useLoginMutation,
  useRefreshQuery,
  useInfoQuery,
} = userApi;

export const {
  useGetQuery,
  useLazyGetQuery,
  useAddMutation,
  useDeleteMutation,
  useSearchQuery,
} = productsApi;
