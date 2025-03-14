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
    getTeamMembers: builder.query({
      query: ({ page = 1, limit = 1000, searchTerm = "" }) => {
        const queryParams = new URLSearchParams();
        if (page) queryParams.append("page", page);
        if (limit) queryParams.append("limit", limit);
        if (searchTerm) queryParams.append("searchTerm", searchTerm);
        return `/member/get-team-member?${queryParams.toString()}`;
      },
    }),
    setAppointmentSchedule: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/orders/set-scheduled-time/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    addNote: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/orders/add-notes/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    removeOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/delete/${id}`,
        method: "DELETE",
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/orders/update-order/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    updateTaskStatus: builder.mutation({
      query: ({ status, taskId }) => {
        const params = new URLSearchParams();
        params.append("status", status);
        params.append("taskId", taskId);
        return {
          url: `/task/update-status?${params.toString()}`,
          method: "PATCH",
        };
      },
    }),
    getServicesOfOrder: builder.query({
      query: (orderId) => `/orders/services-packages?orderId=${orderId}`,
    }),
    updateServicesOfOrder: builder.mutation({
      query: ({ orderId, data }) => ({
        url: `/orders/edit-order-service/${orderId}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllClientsQuery,
  useGetClientAgentsQuery,
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useGetTeamMembersQuery,
  useSetAppointmentScheduleMutation,
  useAddNoteMutation,
  useRemoveOrderMutation,
  useUpdateOrderMutation,
  useUpdateTaskStatusMutation,
  useGetServicesOfOrderQuery,
  useUpdateServicesOfOrderMutation,
} = ordersApi;
