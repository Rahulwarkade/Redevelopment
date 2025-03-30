import React from "react";
import { ApiDemo } from "@/components";
import { Container, Text } from "@/components/common";

const DemoPage = () => {
  return (
    <Container
      maxWidth="xl"
      padding="lg"
      bgColor="bg-white"
      rounded="lg"
      shadow="md"
      border
    >
      <Text variant="h1" weight="bold" className="mb-6">
        API Demo Page
      </Text>
      <ApiDemo />
    </Container>
  );
};

export default DemoPage;
