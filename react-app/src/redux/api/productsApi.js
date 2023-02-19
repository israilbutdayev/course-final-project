import baseApi from "./baseApi";
const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    get: builder.query({
      query: ({ id = "", method = "GET" }) => {
        if (method === "GET")
          return {
            url: "/products/" + id,
            method: "GET",
          };
        else if (method === "POST") {
          return {
            url: "/products",
            method: "POST",
          };
        }
      },
      providesTags: ["products"],
    }),

    add: builder.mutation({
      query: ({ product }) => ({
        url: "/products/add",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["products"],
    }),

    delete: builder.mutation({
      query: ({ id }) => ({
        url: "/products/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
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
