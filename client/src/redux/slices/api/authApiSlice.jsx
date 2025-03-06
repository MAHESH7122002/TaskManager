import { apiSlice } from "../apiSlice"; // Import the base API slice

const AUTH_URL = "/user"; // Define the base URL for authentication endpoints

// Inject authentication endpoints into the base API slice
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a login mutation endpoint
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`, // Set the URL for the login endpoint
        method: "POST", // Use POST method for login
        body: data, // Send the login data in the request body
        credentials: "include", // Include credentials in the request
      }),
    }),
    // Define a register mutation endpoint
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`, // Set the URL for the register endpoint
        method: "POST", // Use POST method for register
        body: data, // Send the register data in the request body
        credentials: "include", // Include credentials in the request
      }),
    }),
    // Define a logout mutation endpoint
    logout: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

// Export the hook for the login mutation
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApiSlice;
