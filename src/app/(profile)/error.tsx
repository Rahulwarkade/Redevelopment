"use client";

import { useEffect } from "react";
import { logError, ErrorType } from "@/utils/errorHandler";
import { PageError } from "@/components";

const ProfileError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to your error reporting service
    logError(error, ErrorType.UNKNOWN, {
      section: "profile",
      digest: error.digest,
    });
  }, [error]);

  return (
    <PageError
      error={error}
      reset={reset}
      title="Profile Error"
      description="We encountered an error while loading your profile. Please try again or contact support if the problem persists."
    />
  );
};

export default ProfileError;
