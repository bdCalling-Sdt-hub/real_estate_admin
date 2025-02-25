import { baseApi } from "./baseApi";

const client = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderParPackage: builder.query({
      query: () => {
        return {
          url: `/report/order-par-packages`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getOrderParServices: builder.query({
        query: () => {
          return {
            url: `/report/order-par-services`,
            method: "GET",
          };
        },
        providesTags: ["updateProfile"],
      }),

      getClientReport: builder.query({
        query: () => {
          return {
            url: `/report/order-client-report`,
            method: "GET",
          };
        },
        providesTags: ["updateProfile"],
      }),

      getTeamMemberReport: builder.query({
        query: () => {
          return {
            url: `/report/team-member-report`,
            method: "GET",
          };
        },
        providesTags: ["updateProfile"],
      }),

      getInvoiceOrder: builder.query({
        query: ({searchTerm,page, limit}) => {
          return {
            url: `/client/clients-invoice?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
            method: "GET",
          };
        },
        providesTags: ["updateProfile"],
      }),

      addInvoiceOrder: builder.mutation({
        query: (data) => {
          return {
            url: "/invoice/create-order-invoice",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["updateProfile"],
      }),

  }),
});

export const {useGetInvoiceOrderQuery,useAddInvoiceOrderMutation, useGetTeamMemberReportQuery, useGetOrderParPackageQuery,useGetOrderParServicesQuery ,useGetClientReportQuery} = client;
