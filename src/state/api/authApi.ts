import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../baseApi";

export const authApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "authApi",
  endpoints: (build) => ({
    //Login
    authenticate: build.mutation<AuthResponse, AuthRequest>({
      query: ({ username, password }) => {
        return {
          url: "auth/login",
          method: "POST",
          body: { username, password },
        };
      },
    }),
    //Refresh-Token
    refreshToken: build.mutation<{ token: string }, { token: string }>({
      query: ({ token }) => {
        return {
          url: "auth/refresh",
          method: "POST",
          body: { token },
        };
      },
    }),
    logout: build.mutation<any, { token: string }>({
      query: ({ token }) => {
        return {
          url: "auth/logout",
          method: "POST",
          body: { token },
        };
      },
    }),
    instropect: build.mutation<any, { token?: string }>({
      query: ({ token }) => {
        return {
          url: "auth/introspect",
          method: "POST",
          body: { token },
        };
      },
    }),
  }),
});

export const {
  useAuthenticateMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useInstropectMutation,
} = authApi;
