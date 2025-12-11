import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: 1,
  errors: {},
  uploadedFiles: [],

  personalInfo: {
    code: "",
    date: "",
    name: "",
    family: "",
    grade: "",
    gender: "",
    phone1: "",
    phone2: "",
    motherPhone: "",
    homePhone: "",
    school: "",
    avg: "",
    nationalCode: "",
  },

  

    registrationInfo: {
  typeOption: "",
  examCount: "",
  examFeeOption: "",
  customExamFee: "",
  bookFeeOption: "",
  customBookFee: "",
  
  classCount: 0,
  classInfo: [],

  subjectList: [],

  /* ============================
     پشتیبانی ویژه — جدید و صحیح
  ============================ */
  specialSupport: false,

  supportInfo: {
    supporterId: "",
    startDate: "",
    endDate: "",
    dailyPrice: 0,
    days: 0,
    fee: 0,
  },

  /* ========== تخفیف‌ها ========== */
  discountExam: "",
  discountClass: "",

  /* ========== پشتیبانی فصلی (قدیمی) ========== */
  summerSupportFeeOption: "",
  summerSupportFee: "",
  fallSupportFeeOption: "",
  fallSupportFee: "",
  winterSupportFeeOption: "",
  winterSupportFee: "",
  springSupportFeeOption: "",
  springSupportFee: "",
  discountSupport: "",
},


  feeInfo: {
    classInitialFee: "",
    installment: "",
    installmentCount: "",
    installments: [],
    classInitialFeeForSupport: "",
    installmentSupport: "",
    installmentCountSupport: "",
    supportInstallments: [],
    total_fee: 0

  }
};

const formSlice = createSlice({
  name: "form",
  initialState,

  reducers: {
    updatePersonalInfo: (state, action) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },

    updateRegistrationInfo: (state, action) => {
      state.registrationInfo = { ...state.registrationInfo, ...action.payload };
    },

    updateFeeInfo: (state, action) => {
      state.feeInfo = { ...state.feeInfo, ...action.payload };
    },

    setErrors: (state, action) => {
      state.errors = action.payload;
    },

    clearErrors: (state) => {
      state.errors = {};
    },

    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },

    resetForm: () => initialState
  }
});

export const {
  updatePersonalInfo,
  updateRegistrationInfo,
  updateFeeInfo,
  setErrors,
  clearErrors,
  setActiveStep,
  resetForm
} = formSlice.actions;

export default formSlice.reducer;
