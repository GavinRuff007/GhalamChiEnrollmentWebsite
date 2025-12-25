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
    "Records",
    "Recruiters",
    "Exams",
  ],

  endpoints: (builder) => ({

    // --------------------------
    // 🔐 Login
    // --------------------------
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    // --------------------------
    // STEP 1
    // --------------------------
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

    // --------------------------
    // STEP 2
    // --------------------------
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

    // --------------------------
    // STEP 3
    // --------------------------
    getStep3: builder.query({
      query: (nc) => `/register/step3/${nc}`,
      providesTags: ["Step3"],
    }),

    saveStep3: builder.mutation({
      query: (data) => ({
        url: "/register/step3",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Step3"],
    }),

    // --------------------------
    // Classes
    // --------------------------
    getClasses: builder.query({
      query: (grade) => `/classes/${grade}`,
      providesTags: ["Classes"],
    }),

    // --------------------------
    // Supporters
    // --------------------------
    getSupporters: builder.query({
      query: () => "/support/list",
      providesTags: ["Supporters"],
    }),

    // --------------------------
    // Fee Calculation
    // --------------------------
    calculateFees: builder.mutation({
      query: (body) => ({
        url: "/fees/calculate",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Fees"],
    }),

    // --------------------------
    // 📋 Records
    // --------------------------
    getRecords: builder.query({
      query: () => "/records",
      providesTags: ["Records"],
    }),

    // --------------------------
    // Recruiters
    // --------------------------
    getRecruiters: builder.query({
      query: () => "/recruiters",
      providesTags: ["Recruiters"],
    }),

    addRecruiter: builder.mutation({
      query: (body) => ({
        url: "/recruiters",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Recruiters"],
    }),

    // --------------------------
    // Exams
    // --------------------------
    getExamDates: builder.query({
      query: () => "/exams",
      providesTags: ["Exams"],
    }),

    addExam: builder.mutation({
      query: (body) => ({
        url: "/exams",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Exams"],
    }),

  }),
});

// --------------------------
// Hooks Export
// --------------------------
export const {
  useLoginMutation,

  useGetStep1Query,
  useSaveStep1Mutation,

  useGetStep2Query,
  useSaveStep2Mutation,

  useGetStep3Query,
  useSaveStep3Mutation,

  useGetClassesQuery,
  useGetSupportersQuery,

  useCalculateFeesMutation,

  useGetRecordsQuery,

  useGetRecruitersQuery,
  useAddRecruiterMutation,

  useGetExamDatesQuery,
  useAddExamMutation,
} = apiSlice;
