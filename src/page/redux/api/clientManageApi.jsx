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

    addTeamMember: builder.mutation({
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
      query: ({searchTerm,page, limit}) => {
        return {
          url: `/client/get-all-clients?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAllTeamMember: builder.query({
      query: ({searchTerm,page, limit}) => {
        return {
          url: `/member/get-team-member?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
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

    updateTeamMember: builder.mutation({
      query: ({ data, memberId, authId }) => {
        return {
          url: `/auth/members/edit-profile/memberId/${memberId}/authId/${authId}`,
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

    deleteAccount: builder.mutation({
      query: (id) => {
        return {
          url: `/auth/delete-account?authId=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    // getAllServices: builder.query({
    //   query: ({ category,searchTerm}) => {
    //     return {
    //       url: `/service/services?category=${category}&searchTerm=${searchTerm}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["updateProfile"],
    // }),

    getAllNotification: builder.query({
      query: () => {
        return {
          url: `/notification/get-admin-notifications`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    deleteNotification: builder.mutation({
      query: (id) => {
        return {
          url: `/notification/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateSeenNotification: builder.mutation({
      query: () => {
        return {
          url: `/notification/seen-notification`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),


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
  useUpdateAgentManagementMutation,
 useGetAllTeamMemberQuery,
 useAddTeamMemberMutation,
 useUpdateTeamMemberMutation,
 useDeleteAccountMutation,
 useGetAllNotificationQuery,
 useDeleteNotificationMutation,
 useUpdateSeenNotificationMutation
  
} = client;
