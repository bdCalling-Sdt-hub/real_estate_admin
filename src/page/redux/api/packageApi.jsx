import { baseApi } from "./baseApi";

const service = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPackage: builder.mutation({
      query: (data) => {
        return {
          url: "/service/create-package",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    addPricing: builder.mutation({
      query: (data) => {
        return {
          url: "/service/create-pricing-group",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    
    getAllPackage: builder.query({
      query: ({ limit = 100, page = 1, searchTerm }) => {
        const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";
        return {
          url: `/service/packages?limit=${limit}&page=${page}${searchQuery}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    updatePackage: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/service/update-package/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getAllClient: builder.query({
      query: () => {
        return {
          url: `/service/get-all-client`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAllPricingGroup: builder.query({
      query: ({searchTerm,page,limit}) => {
        return {
          url: `/service/price-group?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getServicesAll: builder.query({
      query: () => {
        return {
          url: `/service/get-all-service`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

      updatePricing: builder.mutation({
        query: ({ data, id }) => {
          return {
            url: `/service/update-pricing-group/${id}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["updateProfile"],
      }),

      getSinglePrice: builder.query({
      query: ({id}) => {
        return {
          url: `/service/price-group-details/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

       deletePackage: builder.mutation({
        query: (id) => {
          return {
            url: `/service/package-delete/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["updateProfile"],
      }),

         deletePricing: builder.mutation({
        query: (id) => {
          return {
            url: `/service/delete-pricing-group/${id}`,
            method: "DELETE",
          };
        },
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
  useGetAllPackageQuery,
  useAddPackageMutation,
  useUpdatePackageMutation,
  useGetAllClientQuery,
  useGetServicesAllQuery,
  useAddPricingMutation,
  useGetAllPricingGroupQuery,
  useUpdatePricingMutation,
  useGetSinglePriceQuery,
  useDeletePackageMutation,
  useDeletePricingMutation
} = service;
