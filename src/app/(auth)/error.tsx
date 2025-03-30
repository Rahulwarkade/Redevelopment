"use client";

import { useEffect } from "react";
import { logError, ErrorType } from "@/utils/errorHandler";
import { PageError } from "@/components";

const AuthError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to your error reporting service
    logError(error, ErrorType.AUTHENTICATION, {
      section: "auth",
      digest: error.digest,
    });
  }, [error]);

  return (
    <PageError
      error={error}
      reset={reset}
      title="Authentication Error"
      description="We encountered an error with the authentication process. Please try again or contact support if the problem persists."
    />
  );
};

export default AuthError;
