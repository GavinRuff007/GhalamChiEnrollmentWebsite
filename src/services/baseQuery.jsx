import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "./tokenHandler";

const API_BASE = process.env.REACT_APP_API_URL;

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  const unauthorized =
    result?.error?.status === 401 || result?.error?.status === 403;

  if (unauthorized) {
    console.log("🔄 Refreshing access token...");

    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh-check",
        method: "POST",
      },
      api,
      extraOptions
    );

    const newToken = refreshResult?.data?.accessToken;

    if (newToken) {
      setAccessToken(newToken);
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      clearAccessToken();
      toast.error("نشست منقضی شده است، دوباره وارد شوید.");
      window.location.href = "/login";
    }
  }

  return result;
};
