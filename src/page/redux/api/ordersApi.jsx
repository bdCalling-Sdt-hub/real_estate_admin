import { baseApi } from "./baseApi";

const ordersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllClients: builder.query({
            query: () => "/service/get-all-client",
        }),
    }),
});

export const { useGetAllClientsQuery } = ordersApi;
