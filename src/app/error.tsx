"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Container, Text, Button } from "@/components/common";

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error occurred:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
          <Container
            maxWidth="md"
            padding="lg"
            bgColor="bg-white"
            rounded="lg"
            shadow="lg"
            border
          >
            <Text
              variant="h1"
              weight="bold"
              color="text-red-600"
              className="mb-4"
            >
              Something went wrong!
            </Text>
            <Text variant="p" color="text-gray-600" className="mb-6">
              We apologize for the inconvenience. Our team has been notified of
              this issue.
            </Text>
            {error.message && process.env.NODE_ENV === "development" && (
              <Container
                padding="md"
                bgColor="bg-red-50"
                rounded="md"
                className="mb-6"
              >
                <Text
                  variant="p"
                  color="text-red-800"
                  className="font-mono text-sm"
                >
                  {error.message}
                </Text>
              </Container>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => reset()} variant="primary">
                Try again
              </Button>
              <Link href="/" className="inline-block">
                <Button variant="secondary" className="w-full">
                  Go back home
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
