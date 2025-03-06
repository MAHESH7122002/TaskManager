import { apiSlice } from "../apiSlice"; // Import the base API slice

const USER_URL = "/user"; // Define the base URL for user endpoints

// Inject user endpoints into the base API slice
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a login mutation endpoint
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`, // Set the URL for the user update endpoint
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    // Define a TeamList query endpoint
    getTeamList: builder.query({
      query: () => ({
        url: `${USER_URL}/get-team`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

// Export the hook for the login mutation
export const { useUpdateUserMutation, useGetTeamListQuery } = userApiSlice;
