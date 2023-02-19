import baseApi from "./baseApi";
const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    get: builder.query({
      query: ({ id = "", method = "GET", access_token }) => {
        if (method === "GET")
          return {
            url: "/products/" + id,
            method: "GET",
          };
        else if (method === "POST") {
          return {
            url: "/products",
            method: "POST",
            headers: { Authorization: "Bearer " + access_token },
          };
        }
      },
    }),
    add: builder.mutation({
      query: ({ product, access_token }) => ({
        url: "/products/add",
        method: "POST",
        body: product,
      }),
    }),
    delete: builder.mutation({
      query: ({ id, access_token }) => ({
        url: "/products/" + id,
        method: "DELETE",
      }),
    }),
    search: builder.query({
      query: (data) => ({
        url: "/products/search",
        method: "POST",
        body: data,
      }),
      providesTags: ["products"],
    }),
  }),
});

export default productsApi;
