import { ErrorType, AppError, logError } from "./errorHandler";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

/**
 * Enhanced fetch with timeout and error handling
 */
export const fetchWithErrorHandling = async <T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { timeout = 30000, ...fetchOptions } = options;

  // Create an AbortController for timeout handling
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle HTTP error responses
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: "Unknown error occurred" };
      }

      // Determine error type based on status code
      let errorType = ErrorType.API;
      if (response.status === 401) errorType = ErrorType.AUTHENTICATION;
      if (response.status === 403) errorType = ErrorType.AUTHORIZATION;
      if (response.status === 422) errorType = ErrorType.VALIDATION;

      throw new AppError(
        errorData.message || `API Error: ${response.status}`,
        errorType,
        {
          status: response.status,
          url,
          data: errorData,
        }
      );
    }

    // Parse JSON response
    const data = await response.json();
    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle AbortController timeout
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new AppError("Request timeout", ErrorType.NETWORK, { url });
    }

    // If it's already an AppError, just rethrow it
    if (error instanceof AppError) {
      throw error;
    }

    // Otherwise, log and wrap the error
    logError(error, ErrorType.API, { url });
    throw new AppError(
      error instanceof Error ? error.message : "API request failed",
      ErrorType.API,
      { url }
    );
  }
};

/**
 * GET request with error handling
 */
export function get<T>(url: string, options: FetchOptions = {}): Promise<T> {
  return fetchWithErrorHandling<T>(url, {
    method: "GET",
    ...options,
  });
}

/**
 * POST request with error handling
 */
export function post<T>(
  url: string,
  data: Record<string, unknown>,
  options: FetchOptions = {}
): Promise<T> {
  return fetchWithErrorHandling<T>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(data),
    ...options,
  });
}

/**
 * PUT request with error handling
 */
export function put<T>(
  url: string,
  data: Record<string, unknown>,
  options: FetchOptions = {}
): Promise<T> {
  return fetchWithErrorHandling<T>(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(data),
    ...options,
  });
}

/**
 * DELETE request with error handling
 */
export function del<T>(url: string, options: FetchOptions = {}): Promise<T> {
  return fetchWithErrorHandling<T>(url, {
    method: "DELETE",
    ...options,
  });
}
