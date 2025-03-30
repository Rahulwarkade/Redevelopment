"use client";

import React from "react";
import { ErrorBoundary } from "@/components";
import { logError, ErrorType } from "@/utils/errorHandler";
import { Container, Text, Button } from "@/components/common";

// Example component that might throw an error
const PotentiallyErrorProneComponent = () => {
  // Simulating a component that might throw an error
  const [shouldError, setShouldError] = React.useState(false);

  if (shouldError) {
    throw new Error("This is a simulated error in the component");
  }

  return (
    <Container
      padding="md"
      bgColor="bg-white"
      rounded="md"
      border
      className="mb-4"
    >
      <Text variant="h3" weight="medium" className="mb-2">
        Potentially Error Prone Component
      </Text>
      <Text variant="p" className="mb-4">
        This component might throw an error.
      </Text>
      <Button onClick={() => setShouldError(true)} variant="danger" size="sm">
        Trigger Error
      </Button>
    </Container>
  );
};

// Example of how to use the ErrorBoundary
const ExampleWithErrorBoundary = () => {
  const [key, setKey] = React.useState(0);

  return (
    <Container className="space-y-6">
      <Text variant="h2" weight="bold" className="mb-4">
        Error Boundary Example
      </Text>

      {/* Normal content that won't be affected by errors in the error boundary */}
      <Container padding="md" bgColor="bg-gray-100" rounded="md">
        <Text variant="p">
          This content will always render, even if the component below errors.
        </Text>
      </Container>

      {/* Component wrapped in error boundary */}
      <ErrorBoundary
        fallback={
          <Container
            padding="md"
            bgColor="bg-orange-50"
            rounded="md"
            border
            borderColor="border-orange-200"
          >
            <Text
              variant="h3"
              weight="medium"
              color="text-orange-800"
              className="mb-2"
            >
              Component Error
            </Text>
            <Text
              variant="p"
              size="sm"
              color="text-orange-700"
              className="mb-4"
            >
              This specific component encountered an error but the rest of the
              page is still functional.
            </Text>
            {process.env.NODE_ENV === "development" && (
              <Container
                padding="md"
                bgColor="bg-white"
                rounded="md"
                border
                borderColor="border-orange-200"
                className="mb-3"
              >
                <Text
                  variant="p"
                  size="xs"
                  className="font-mono text-orange-800"
                >
                  An error occurred in this component
                </Text>
              </Container>
            )}
            <Button
              onClick={() => setKey((prev) => prev + 1)}
              variant="primary"
              size="sm"
            >
              Retry Component
            </Button>
          </Container>
        }
        resetKey={key}
        onError={(error, errorInfo) => {
          // Log the error to your error reporting service
          logError(error, ErrorType.UNKNOWN, {
            component: "PotentiallyErrorProneComponent",
            errorInfo: {
              componentStack: errorInfo.componentStack,
            },
          });
        }}
      >
        <PotentiallyErrorProneComponent />
      </ErrorBoundary>

      {/* More content that won't be affected */}
      <Container padding="md" bgColor="bg-gray-100" rounded="md">
        <Text variant="p">
          This content will also always render, demonstrating that the error is
          contained.
        </Text>
      </Container>
    </Container>
  );
};

export default ExampleWithErrorBoundary;
