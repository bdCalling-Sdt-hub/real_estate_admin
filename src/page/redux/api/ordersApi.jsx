import { baseApi } from "./baseApi";

const ordersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllClients: builder.query({
            query: () => "/service/get-all-client",
        }),
        getClientAgents: builder.query({
            query: (clientId) => `/client/get-client-agent?clientId=${clientId}`,
        }),
    }),
});

export const { useGetAllClientsQuery, useGetClientAgentsQuery } = ordersApi;
