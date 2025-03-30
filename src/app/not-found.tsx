import React from "react";
import { Container, Text } from "@/components/common";

const NotFound = () => {
  return (
    <Container padding="md" maxWidth="md" centered>
      <Text variant="h2" weight="semibold">
        Page Not Found
      </Text>
      <Text variant="p" color="text-gray-600">
        Could Not Find Requested Resource
      </Text>
    </Container>
  );
};

export default NotFound;
