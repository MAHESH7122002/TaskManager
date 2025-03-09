import { apiSlice } from "../apiSlice"; // Import the base API slice
const TASKS_URL = "/task"; // Define the base URL for task endpoints

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: `${TASKS_URL}/dashboard`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllTasks: builder.query({
      query: ({ strQuery, isTrashed, search }) => ({
        url: `${TASKS_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/create`,
        body: data,
        method: "POST",
        credentials: "include",
      }),
    }),
    duplicateTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/duplicate/${data._id}`,
        body: data,
        method: "POST",
        credentials: "include",
      }),
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/update/${data._id}`,
        body: data,
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useDuplicateTaskMutation,
  useUpdateTaskMutation,
} = taskApiSlice;
