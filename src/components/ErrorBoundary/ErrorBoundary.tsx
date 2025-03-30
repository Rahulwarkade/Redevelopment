"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Container, Text, Button } from "@/components/common";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKey?: string | number | boolean | null | undefined;
}

const ErrorBoundary = ({
  children,
  fallback,
  onError,
  resetKey,
}: ErrorBoundaryProps) => {
  const [error, setError] = useState<Error | null>(null);
  const pathname = usePathname();

  // Reset error state when pathname or resetKey changes
  useEffect(() => {
    setError(null);
  }, [pathname, resetKey]);

  if (error) {
    return (
      fallback || (
        <Container
          padding="md"
          bgColor="bg-red-50"
          rounded="md"
          border
          borderColor="border-red-300"
          className="mb-4"
        >
          <Text
            variant="h3"
            weight="medium"
            color="text-red-800"
            className="mb-2"
          >
            Something went wrong in this section
          </Text>
          <Text variant="p" size="sm" color="text-red-600" className="mb-4">
            This section encountered an error. The rest of the page should still
            work.
          </Text>
          {process.env.NODE_ENV === "development" && (
            <Container
              padding="md"
              bgColor="bg-white"
              rounded="md"
              border
              borderColor="border-red-200"
              className="mb-3"
            >
              <Text
                variant="p"
                size="xs"
                className="font-mono text-red-800 overflow-auto"
              >
                {error.message}
              </Text>
            </Container>
          )}
          <Button onClick={() => setError(null)} variant="danger" size="sm">
            Try Again
          </Button>
        </Container>
      )
    );
  }

  return (
    <ErrorBoundaryInternal
      onError={(error, errorInfo) => {
        setError(error);
        onError?.(error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundaryInternal>
  );
};

export default ErrorBoundary;

class ErrorBoundaryInternal extends React.Component<{
  children: React.ReactNode;
  onError: (error: Error, errorInfo: React.ErrorInfo) => void;
}> {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}
