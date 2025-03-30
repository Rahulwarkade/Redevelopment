"use client";

import React from "react";
import { logError, ErrorType } from "@/utils/errorHandler";
import { Button, Text, Container } from "@/components/common";

interface PageErrorProps {
  error: Error;
  reset: () => void;
  title?: string;
  description?: string;
}

const PageError = ({
  error,
  reset,
  title = "Something went wrong!",
  description = "We encountered an error while loading this page.",
}: PageErrorProps) => {
  React.useEffect(() => {
    // Log the error when the component mounts
    logError(error, ErrorType.UNKNOWN, {
      component: "PageError",
      page: typeof window !== "undefined" ? window.location.pathname : "",
    });
  }, [error]);

  return (
    <Container className="min-h-[50vh] flex flex-col items-center justify-center p-6">
      <Container
        maxWidth="md"
        padding="lg"
        rounded="lg"
        shadow="sm"
        border
        borderColor="border-gray-100"
        bgColor="bg-white"
      >
        <Container className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-red"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </Container>
        <Text variant="h2" weight="semibold" className="mb-2">
          {title}
        </Text>
        <Text color="text-gray-787878" className="mb-6">
          {description}
        </Text>

        {process.env.NODE_ENV === "development" && (
          <Container className="bg-gray-50 p-3 rounded border border-gray-200 mb-6 overflow-auto max-h-32">
            <Text variant="p" className="text-xs font-mono text-red">
              {error.message}
            </Text>
            {error.stack && (
              <Text
                variant="p"
                className="text-xs font-mono text-gray-787878 mt-2 whitespace-pre-wrap"
              >
                {error.stack.split("\n").slice(1, 4).join("\n")}
              </Text>
            )}
          </Container>
        )}

        <Container className="flex justify-end">
          <Button onClick={reset} variant="primary" size="md">
            Try again
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

export default PageError;
