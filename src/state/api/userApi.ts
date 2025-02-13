import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../baseApi";

export const userApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "userApi",
  endpoints: (build) => ({
    //GetPaging
    getUserPaging: build.mutation<UserPagingResponse, UserPagingRequest>({
      query: (UserPagingRequest) => {
        return {
          url: "users/paging",
          method: "POST",
          body: UserPagingRequest,
        };
      },
    }),
  }),
});

export const {
    useGetUserPagingMutation
} = userApi;
