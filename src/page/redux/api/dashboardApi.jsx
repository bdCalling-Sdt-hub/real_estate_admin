import { baseApi } from "./baseApi";

const dash = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatus: builder.query({
      query: () => {
        return {
          url: `/task/get-count-of-status`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getRecentOrder: builder.query({
      query: ({page,limit}) => {
        return {
          url: `/orders/get-recent-orders?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getTodayOrder: builder.query({
      query: () => {
        return {
          url: `/orders/get-today-submit-order`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getUserGrowth: builder.query({
      query: (year) => {
        return {
          url: `/orders/get-order-grows?year=${year}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

   
  }),
});

export const {
  useGetStatusQuery,
  useGetRecentOrderQuery,
  useGetTodayOrderQuery,
  useGetUserGrowthQuery
  
} = dash;
