import { baseApi } from "./baseApi";

const mediaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMedia: builder.mutation({
      query: (data) => {
        return {
          url: `/member/create-adds`,
          method: "POST",
          body: data,
        };
      },
    }),
    getMedia: builder.query({
      query: () => {
        return {
          url: `/member/get-adds`,
          method: "GET",
        };
      },
    }),
    updateMedia: builder.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/member/edit-adds/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    deleteMedia: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/member/delete-adds/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateMediaMutation,
  useGetMediaQuery,
  useUpdateMediaMutation,
  useDeleteMediaMutation,
} = mediaApi;
