import { baseApi } from "./baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => "/service/get-all-client",
    }),
    getClientAgents: builder.query({
      query: (clientId) => `/client/get-client-agent?clientId=${clientId}`,
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/create-order",
        method: "POST",
        body: data,
      }),
    }),
    getAllOrders: builder.query({
      query: ({ searchTerm, status, page, paymentStatus }) => {
        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.append("searchTerm", searchTerm);
        if (status) queryParams.append("status", status);
        if (page) queryParams.append("page", page);
        if (paymentStatus) queryParams.append("paymentStatus", paymentStatus);
        return `/orders/?${queryParams.toString()}`;
      },
    }),
    getOrderById: builder.query({
      query: (id) => `/orders/get/${id}`,
    }),
  }),
});

export const {
  useGetAllClientsQuery,
  useGetClientAgentsQuery,
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
} = ordersApi;
