import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "./tokenHandler";

const API_BASE = process.env.REACT_APP_API_URL;

console.log("📌 baseQuery.jsx loaded — API_BASE =", API_BASE);

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
  credentials: "include",

  prepareHeaders: (headers) => {
    const token = getAccessToken();
    console.log("🔐 prepareHeaders → sending token:", token);

    if (token) headers.set("Authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  console.log("📤 REQUEST →", {
    fullUrl: `${API_BASE}${typeof args === "string" ? args : args.url}`,
    method: typeof args === "string" ? "GET" : args.method,
    body: typeof args === "string" ? null : args.body,
    cookies: document.cookie
  });

  let result = await rawBaseQuery(args, api, extraOptions);

  console.log("📥 RESPONSE ←", {
    url: typeof args === "string" ? args : args.url,
    status: result?.error?.status || 200,
    data: result?.data,
    error: result?.error,
    cookies: document.cookie
  });

  const unauthorized =
    result?.error?.status === 401 || result?.error?.status === 403;

  if (unauthorized) {
    console.log("🔄 Unauthorized → Refreshing token...");

    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh-check",
        method: "POST",
      },
      api,
      extraOptions
    );

    console.log("♻️ REFRESH RESPONSE:", {
      data: refreshResult?.data,
      error: refreshResult?.error,
      cookies: document.cookie
    });

    const newToken = refreshResult?.data?.accessToken;

    if (newToken) {
      setAccessToken(newToken);
      console.log("🟢 New AccessToken Saved:", newToken);

      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      clearAccessToken();
      toast.error("نشست منقضی شده است، دوباره وارد شوید.");
      window.location.href = "/login";
    }
  }

  return result;
};
