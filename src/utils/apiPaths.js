export const BASE_URL = import.meta.env.DEV ? "http://localhost:8000" : "https://expense-tracker-backend-m3cs.onrender.com";

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
    FORGOT_PASSWORD_QUESTION: "/api/v1/auth/forgot-password/question",
    RESET_PASSWORD: "/api/v1/auth/forgot-password/reset",
  },

  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
    GET_INSIGHTS: "/api/v1/dashboard/insights",
  },

  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: "/api/v1/income/downloadexcel",
  },

  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_ALL_EXPENSE: "/api/v1/expense/get",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel",
    SUGGEST_CATEGORY: "/api/v1/expense/suggest-category",
    PARSE_TRANSACTION: "/api/v1/expense/parse-transaction",
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
};
