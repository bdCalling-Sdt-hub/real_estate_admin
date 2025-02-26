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
    getTaskDetails: builder.query({
      query: (id) => `/task/view-details/${id}`,
    }),
    deleteFile: builder.mutation({
      query: ({ taskId, fileId, type }) => {
        const params = new URLSearchParams();
        params.append("types", type);
        params.append("fileId", fileId);
        return {
          url: `/task/delete-file/${taskId}?${params.toString()}`,
          method: "PATCH",
        };
      },
    }),
    getComments: builder.query({
      query: (id) => `/task/get-comment?taskId=${id}`,
    }),
    postComment: builder.mutation({
      query: ({ taskId, comment, fileId, replayId }) => {
        const params = new URLSearchParams();
        params.append("taskId", taskId);
        if (fileId) {
          params.append("fileId", fileId);
        }
        if (replayId) {
          params.append("replayId", replayId);
        }
        return {
          url: `/task/add-comment?${params.toString()}`,
          method: "PATCH",
          body: { text: comment },
        };
      },
    }),
    getNewTask: builder.query({
      query: () => "/task/get-new-task",
    }),
    updateTaskStatus: builder.mutation({
      query: ({ status, taskId }) => ({
        url: "/task/update-status-submitted",
        body: { status, taskId },
        method: "PATCH",
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
  useGetTaskDetailsQuery,
  useDeleteFileMutation,
  useGetCommentsQuery,
  usePostCommentMutation,
  useGetNewTaskQuery,
  useUpdateTaskStatusMutation,
} = taskApi;
