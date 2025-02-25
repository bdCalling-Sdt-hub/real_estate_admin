import { baseApi } from "./baseApi";

const service = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addServicesCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/service/create-category",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    getAllServicesCategories: builder.query({
      query: ({ searchTerm = "" } = {}) => {
        const searchQuery = searchTerm ? `?searchTerm=${searchTerm}` : "";
        return {
          url: `/service/get-all-categories${searchQuery}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

       deleteServicesCategories: builder.mutation({
        query: (id) => {
          return {
            url: `/service/get-all-categories/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["updateProfile"],
      }),
    updateServiceCategory: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/service/update-category/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteServicesCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/service/delete-category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getAllServices: builder.query({
      query: ({ category, searchTerm, limit = 100, page = 1 }) => {
        const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";
        const categoryQuery = category ? `&category=${category}` : "";
        return {
          url: `/service/services?limit=${limit}&page=${page}${searchQuery}${categoryQuery}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAllServicesSelect: builder.query({
      query: () => {
        return {
          url: `/service/services?limit=10000`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addServices: builder.mutation({
      query: (data) => {
        return {
          url: "/service/create-service",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateService: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/service/update-service/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteServices: builder.mutation({
      query: (id) => {
        return {
          url: `/service/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    //   deleteServices: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/service/delete/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["updateProfile"],
    // }),

    // getProfile: builder.query({
    //   query: () => {
    //     return {
    //       url: "/auth/member/profile",
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["updateProfile"],
    // }),

    // getAllUser: builder.query({
    //   query: ({searchTerm,sortOrder}) => {
    //     return {
    //       url: `/user?searchTerm=${searchTerm}&sortOrder=${sortOrder}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["updateProfile"],
    // }),

    // getSuperAdmin: builder.query({
    //   query: () => {
    //     return {
    //       url: "/user/super-admin",
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["updateProfile"],
    // }),

    // addUser: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/user/create-user",
    //       method: "POST",
    //       body: data,
    //     };
    //   },invalidatesTags: ["updateProfile"]
    // }),

    // deleteUser: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/user/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["updateProfile"],
    // }),

    // forgotPassword: builder.mutation({
    //   query: (email) => {
    //     return {
    //       url: "/auth/forgot-password",
    //       method: "POST",
    //       body: email,
    //     };
    //   },
    // }),
    // verifyOtp: builder.mutation({
    //   query: ({data}) => {
    //     return {
    //       url: "/auth/verify-otp",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    // }),
    // resendVerifyOtp: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/auth/forgot-resend",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    // }),

    // resetPassword: builder.mutation({
    //   query: ({data,email}) => {
    //     return {
    //       url: `/auth/reset-password?email=${email}`,
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    // }),

    // updateProfile: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/auth/member/edit-profile",
    //       method: "PATCH",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["updateProfile"],
    // }),

    // changePassword: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/auth/change-password",
    //       method: "PATCH",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["updateProfile"],
    // }),
  }),
});

export const {
  useAddServicesCategoryMutation,
  useGetAllServicesCategoriesQuery,
  useUpdateServiceCategoryMutation,
  useDeleteServicesCategoryMutation,
  useGetAllServicesQuery,
  useAddServicesMutation,
  useUpdateServiceMutation,
  useDeleteServicesMutation,
  useGetAllServicesSelectQuery,
  useDeleteServicesCategoriesMutation
} = service;
