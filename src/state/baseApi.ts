import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { Mutex } from "async-mutex";
import { cookieUtils } from "@/utils/cookies";

const mutex = new Mutex();

interface RefreshTokenResponse {
  data: {
    token: string;
  };
}

export const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  let baseUrl = "";
  // Kiểm tra xem args có phải là một chuỗi không
  if (typeof args === "string") {
    if (args.startsWith("auth") || args.startsWith("users")) {
      baseUrl =
        process.env.NEXT_PUBLIC_AUTH_API_BASE_URL ||
        "http://localhost:9112/identity"; // Auth
    } else if (args.startsWith("customers")) {
      baseUrl =
        process.env.NEXT_PUBLIC_PROFILE_API_BASE_URL ||
        "http://localhost:9113/profile"; // Profiles
    }
  } else if (typeof args === "object" && args !== null) {
    const url = (args as FetchArgs).url;
    if (url) {
      if (url.startsWith("auth") || url.startsWith("users")) {
        baseUrl =
          process.env.NEXT_PUBLIC_AUTH_API_BASE_URL ||
          "http://localhost:9112/identity"; // Auth
      } else if (url.startsWith("customers")) {
        baseUrl =
          process.env.NEXT_PUBLIC_PROFILE_API_BASE_URL ||
          "http://localhost:9113/profile"; // Profiles
      }
    }
  }
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = cookieUtils.getAccessToken();
      if (token && token.length > 0) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
  try {
    await mutex.waitForUnlock();
    let result: any = await baseQuery(args, api, extraOptions);
    console.log(JSON.stringify(result));
    if (result.error && result.error.status === 401) {
      // checking whether the mutex is locked
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const token = cookieUtils.getAccessToken();
          console.log("get token");
          if (!token && token.trim().length == 0) {
            cookieUtils.clearTokens();
          } else {
            console.log("abc");
            const refreshResult = (await baseQuery(
              { url: "auth/refresh", method: "POST", body: { token } },
              api,
              extraOptions
            )) as { data: RefreshTokenResponse };
            console.log(refreshResult);
            if (refreshResult.data?.data.token) {
              const newToken = refreshResult.data?.data.token;
              console.log(newToken);
              if (newToken && newToken.length > 0) {
                cookieUtils.setAccessToken({ accessToken: newToken });
                // Thử lại query ban đầu
                result = await baseQuery(args, api, extraOptions);
              }
            } else {
              cookieUtils.clearTokens();
            }
          }
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }

    if (result.error) {
      const errorMessage = result.error.data.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } else {
      const isMutationRequest =
        (args as FetchArgs).method && (args as FetchArgs).method !== "GET";
      if (isMutationRequest) {
        toast.success("Updated Successfully");
      }
    }

    //Get Data
    if (result.data) {
      result.data = result.data.data;
    }
    // console.log(JSON.stringify(result));

    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return { error: { status: "FETCH_ERROR", error: errorMessage } };
  }
};
