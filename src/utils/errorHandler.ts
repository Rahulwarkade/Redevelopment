/**
 * Error handling utility for the application
 * This can be extended to integrate with error monitoring services like Sentry, LogRocket, etc.
 */

// Types of errors we want to track
export enum ErrorType {
  API = "API_ERROR",
  AUTHENTICATION = "AUTHENTICATION_ERROR",
  AUTHORIZATION = "AUTHORIZATION_ERROR",
  VALIDATION = "VALIDATION_ERROR",
  NETWORK = "NETWORK_ERROR",
  UNKNOWN = "UNKNOWN_ERROR",
}

// Interface for structured error logging
export interface ErrorLog {
  type: ErrorType;
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
  timestamp: string;
  url?: string;
}

/**
 * Log an error to the console and potentially to an error monitoring service
 */
export const logError = (
  error: Error | unknown,
  type: ErrorType = ErrorType.UNKNOWN,
  context: Record<string, unknown> = {}
): ErrorLog => {
  const errorObject = error instanceof Error ? error : new Error(String(error));

  const errorLog: ErrorLog = {
    type,
    message: errorObject.message,
    stack: errorObject.stack,
    context,
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : undefined,
  };

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.error(`[${errorLog.type}]`, errorLog);
  }

  // Here you would integrate with your error monitoring service
  // Example: Sentry.captureException(errorObject, { extra: context });

  return errorLog;
};

/**
 * Handle API errors and return a user-friendly message
 */
export const handleApiError = (error: unknown): string => {
  // Log the error
  logError(error, ErrorType.API);

  // Return a user-friendly message based on the error
  if (error instanceof Error) {
    // Handle specific API error cases
    if (error.message.includes("timeout")) {
      return "The request timed out. Please try again.";
    }
    if (error.message.includes("network")) {
      return "A network error occurred. Please check your connection.";
    }
    // Add more specific error handling as needed
  }

  // Default message
  return "An error occurred while processing your request. Please try again later.";
};

/**
 * Format validation errors for display
 */
export const formatValidationErrors = (
  errors: Record<string, string[]>
): Record<string, string> => {
  const formattedErrors: Record<string, string> = {};

  Object.entries(errors).forEach(([field, messages]) => {
    formattedErrors[field] = messages[0] || "Invalid input";
  });

  return formattedErrors;
};

/**
 * Create a custom error with additional context
 */
export class AppError extends Error {
  public type: ErrorType;
  public context?: Record<string, unknown>;

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN,
    context?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
    this.type = type;
    this.context = context;

    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
