import baseApi from "./baseApi";
import userSlice from "../slices/userSlice";
import loginSlice from "../slices/loginSlice";
import registrationSlice from "../slices/registrationSlice";
const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    info: builder.query({
      queryFn: async (arg, { dispatch, getState }, extraOptions, baseQuery) => {
        const response = await baseQuery({
          url: "/user/info",
          method: "POST",
          body: {},
        });
        const { data } = response;
        const { access_token } = data;
        if (access_token) {
          const payload = {
            initialLoad: false,
            isLogged: true,
            email: data?.user?.email,
            firstName: data?.user?.firstName,
            lastName: data?.user?.lastName,
            access_token,
          };
          dispatch(userSlice.actions.set(payload));
        } else {
          dispatch(userSlice.actions.reset());
        }
        return response;
      },
      providesTags: ["info"],
    }),
    refresh: builder.mutation({
      queryFn: async (arg, { dispatch, getState }, extraOptions, baseQuery) => {
        const isLogged = getState()?.user?.isLogged;
        const response = await baseQuery({
          url: "/user/refresh",
          method: "POST",
          body: {},
        });
        await sleep(50);
        const { data } = response;
        if (data?.success) {
          const payload = {
            access_token: data?.access_token,
          };
          dispatch(userSlice.actions.apply(payload));
        } else if (data?.error && isLogged) {
          dispatch(userSlice.actions.reset());
        }
        return response;
      },
      invalidatesTags: ["info"],
    }),
    registration: builder.mutation({
      queryFn: async (arg, { dispatch }, extraOptions, baseQuery) => {
        const response = await baseQuery({
          url: "/user/registration",
          method: "POST",
          body: arg,
        });
        const { data } = response;
        if (data.success) {
          dispatch(userSlice.actions.apply({ isLogged: true }));
        }
        return response;
      },
      invalidatesTags: ["info"],
    }),
    login: builder.mutation({
      queryFn: async (arg, { dispatch }, extraOptions, baseQuery) => {
        const response = await baseQuery({
          url: "/user/login",
          method: "POST",
          body: arg,
        });
        const { data } = response;
        if (data.success) {
          dispatch(userSlice.actions.apply({ isLogged: true }));
        }
        return response;
      },
      invalidatesTags: ["info"],
    }),
    logout: builder.mutation({
      queryFn: async (arg, { dispatch }, extraOptions, baseQuery) => {
        const response = await baseQuery({
          url: "/user/logout",
        });
        const { data } = response;
        if (data.success) {
          dispatch(userSlice.actions.reset());
          dispatch(loginSlice.actions.reset());
          dispatch(registrationSlice.actions.reset());
        }
        return response;
      },
      invalidatesTags: ["info"],
    }),
    update: builder.mutation({
      queryFn: async (arg, { dispatch }, extraOptions, baseQuery) => {
        const response = await baseQuery({
          url: "/user/update",
          method: "PUT",
          body: arg,
        });
        const { data } = response;
        if (data.success) {
          dispatch(userSlice.actions.apply({ isLogged: true }));
        }
        return response;
      },
      invalidatesTags: ["info"],
    }),
  }),
});

export default userApi;
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
