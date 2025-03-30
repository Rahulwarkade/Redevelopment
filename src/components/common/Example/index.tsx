"use client";

import React, { useState } from "react";
import { Text, Input, Button, Image, Container } from "../index";

const Example: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <Container
      maxWidth="md"
      padding="lg"
      rounded="lg"
      shadow="md"
      bgColor="bg-white"
    >
      <Text variant="h2" weight="bold" color="text-blue-600" align="center">
        Custom Components Example
      </Text>

      <Text variant="p" size="lg" className="mt-4">
        This is a demonstration of our custom components that behave like normal
        HTML tags but with enhanced functionality.
      </Text>

      <Container
        maxWidth="full"
        padding="md"
        bgColor="bg-gray-50"
        rounded="md"
        className="mt-6 mb-6"
        border
      >
        <Text variant="h5" weight="semibold" className="mb-4">
          Input and Button Components
        </Text>

        <div className="space-y-4">
          <Input
            label="Enter your name"
            placeholder="John Doe"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            variant="outlined"
            inputSize="md"
          />

          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => alert(`Hello, ${inputValue || "there"}!`)}
          >
            Say Hello
          </Button>

          <Button variant="outline" size="sm" leftIcon={<span>👋</span>}>
            With Icon
          </Button>
        </div>
      </Container>

      <Container maxWidth="full" padding="sm" className="mt-6">
        <Text variant="h5" weight="semibold" className="mb-4">
          Image Components
        </Text>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Text variant="h6" weight="semibold" className="mb-2">
              Cover Image (with width/height)
            </Text>
            <div className="h-64 w-full">
              <Image
                src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e"
                alt="Nature landscape"
                rounded="md"
                width={400}
                height={400}
                objectFit="cover"
              />
            </div>
          </div>

          <div>
            <Text variant="h6" weight="semibold" className="mb-2">
              Contain Image (with fill)
            </Text>
            <div className="h-64 w-full relative">
              <Image
                src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
                alt="Colorful gradient"
                rounded="md"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                objectFit="contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Text variant="h6" weight="semibold" className="mb-2">
            Image with Aspect Ratio
          </Text>
          <Image
            src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538"
            alt="Landscape image"
            rounded="lg"
            aspectRatio="video"
            fill
            sizes="100vw"
            objectFit="cover"
            className="mt-2"
          />
        </div>
      </Container>

      <Container
        maxWidth="full"
        padding="md"
        bgColor="bg-blue-50"
        rounded="md"
        className="mt-6"
        border
        borderColor="border-blue-200"
      >
        <Text variant="span" size="sm" color="text-gray-600" align="center">
          These components use Tailwind CSS for styling and are fully
          customizable. The Image component uses Next.js Image for optimization.
        </Text>
      </Container>
    </Container>
  );
};

export default Example;
