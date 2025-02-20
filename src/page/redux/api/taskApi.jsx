import { baseApi } from "./baseApi";

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/task/get-all",
    }),
    takeTask: builder.mutation({
      query: (id) => ({
        url: `/task/taken/${id}`,
        method: "PATCH",
      }),
    }),
    getAllTeamMembers: builder.query({
      query: () => "/member/get-all-member",
    }),
    assignTask: builder.mutation({
      query: ({ taskId, memberId }) => ({
        url: `/task/assign-team-member`,
        method: "PATCH",
        body: { taskId, memberId },
      }),
    }),
    getAssignedTasks: builder.query({
      query: () => "/task/taken/assigned-list",
    }),
    rejectTask: builder.mutation({
      query: ({ taskId, memberId, reason }) => ({
        url: `/task/reject/${taskId}`,
        method: "PATCH",
        body: { memberId, reason },
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useTakeTaskMutation,
  useGetAllTeamMembersQuery,
  useAssignTaskMutation,
  useGetAssignedTasksQuery,
  useRejectTaskMutation,
} = taskApi;
