import type {
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import type {
  SerializedError,
} from "@reduxjs/toolkit";

type ApiError = FetchBaseQueryError | SerializedError | undefined;

export const getErrorMessage = (error: ApiError): string => {

  if (!error) {
    return "Something went wrong. Please try again.";
  }

  // RTK Query API errors
  if ("status" in error) {

    // Backend JSON response
    if (
      typeof error.data === "object" &&
      error.data !== null &&
      "message" in error.data &&
      typeof error.data.message === "string"
    ) {
      return error.data.message;
    }

    // Network error
    if (error.status === "FETCH_ERROR") {
      return "Unable to connect to the server. Please check your internet connection.";
    }

    // Timeout error
    if (error.status === "TIMEOUT_ERROR") {
      return "The request timed out. Please try again.";
    }

    // Parsing error
    if (error.status === "PARSING_ERROR") {
      return "Invalid server response. Please try again later.";
    }

    return "Something went wrong. Please try again.";
  }

  // JavaScript errors
  if (error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};