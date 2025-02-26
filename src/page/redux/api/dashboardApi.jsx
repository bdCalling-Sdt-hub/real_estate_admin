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

   
  }),
});

export const {
  useGetStatusQuery,
  
} = dash;
