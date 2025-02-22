import { baseApi } from "./baseApi";

const client = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addClientManagement: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/register-user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    getAllClientManagement: builder.query({
      query: () => {
        return {
          url: `/client/get-all-clients`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    updateClientManagement: builder.mutation({
      query: ({ data, userId, authId }) => {
        return {
          url: `/auth/client/edit-profile/userId/${userId}/authId/${authId}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateAgentManagement: builder.mutation({
      query: ({ data, userId, authId }) => {
        return {
          url: `/auth/client/edit-profile/userId/${userId}/authId/${authId}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    
    getSingleClientManagement: builder.query({
      query: ({id}) => {
        return {
          url: `/client/get-client-agent?clientId=${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addAgentManagement: builder.mutation({
      query: (data) => ({
        url: "/auth/register-user",
        method: "POST",
        body: data,  
      }),
      invalidatesTags: ["updateProfile"],
    }),

    // deleteServicesCategory: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/service/delete-category/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["updateProfile"],
    // }),

    // getAllServices: builder.query({
    //   query: ({ category,searchTerm}) => {
    //     return {
    //       url: `/service/services?category=${category}&searchTerm=${searchTerm}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["updateProfile"],
    // }),

    // getAllServicesSelect: builder.query({
    //   query: () => {
    //     return {
    //       url: `/service/services?limit=100`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["updateProfile"],
    // }),

    // addServices: builder.mutation({
    //     query: (data) => {
    //       return {
    //         url: "/service/create-service",
    //         method: "POST",
    //         body: data,
    //       };
    //     },
    //     invalidatesTags: ["updateProfile"],
    //   }),

    //   updateService: builder.mutation({
    //     query: ({ data, id }) => {
    //       return {
    //         url: `/service/update-service/${id}`,
    //         method: "PATCH",
    //         body: data,
    //       };
    //     },
    //     invalidatesTags: ["updateProfile"],
    //   }),

    //   deleteServices: builder.mutation({
    //     query: (id) => {
    //       return {
    //         url: `/service/delete/${id}`,
    //         method: "DELETE",
    //       };
    //     },
    //     invalidatesTags: ["updateProfile"],
    //   }),

  }),
});

export const {
  useGetAllClientManagementQuery,
  useAddClientManagementMutation,
  useUpdateClientManagementMutation,
  useGetSingleClientManagementQuery,
  useAddAgentManagementMutation,
  useUpdateAgentManagementMutation
  
} = client;
