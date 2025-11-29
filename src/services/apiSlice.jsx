import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithReauth,

  tagTypes: [
    "Step1",
    "Step2",
    "Step3",
    "Classes",
    "Supporters",
    "Fees",
  ],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    getStep1: builder.query({
      query: (nc) => `/register/step1/${nc}`,
      providesTags: ["Step1"],
    }),

    saveStep1: builder.mutation({
      query: (data) => ({
        url: "/register/step1",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Step1"],
    }),

    getStep2: builder.query({
      query: (nc) => `/register/step2/${nc}`,
      providesTags: ["Step2"],
    }),

    saveStep2: builder.mutation({
      query: (data) => ({
        url: "/register/step2",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Step2"],
    }),

    saveStep3: builder.mutation({
      query: (data) => ({
        url: "/register/step3",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Step3"],
    }),

    getClasses: builder.query({
      query: (grade) => `/classes/${grade}`,
      providesTags: ["Classes"],
    }),

    getSupporters: builder.query({
      query: () => "/support/list",
      providesTags: ["Supporters"],
    }),

    calculateFees: builder.mutation({
      query: (body) => ({
        url: "/fees/calculate",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Fees"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetStep1Query,
  useSaveStep1Mutation,
  useGetStep2Query,
  useSaveStep2Mutation,
  useSaveStep3Mutation,
  useGetClassesQuery,
  useGetSupportersQuery,
  useCalculateFeesMutation,
} = apiSlice;
