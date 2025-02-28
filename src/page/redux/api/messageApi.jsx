import { baseApi } from "./baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmails: builder.query({
      query: ({ searchTerm }) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("searchTerm", searchTerm);
        return `/auth/get-all-user?${params.toString()}`;
      },
    }),
    toggleFavorite: builder.mutation({
      query: ({ conversationId, types }) => ({
        url: `/message/favorite?conversationId=${conversationId}&types=${types}`,
        method: "PATCH",
      }),
    }),
    getFavoriteList: builder.query({
      query: () => `/message/favorite/get-all`,
    }),
  }),
});

export const {
  useGetAllEmailsQuery,
  useToggleFavoriteMutation,
  useGetFavoriteListQuery,
} = messageApi;
