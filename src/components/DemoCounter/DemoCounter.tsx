"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
  fetchDemoData,
} from "@/store/slices/demoSlice";
import { Container, Text, Button } from "@/components/common";

const DemoCounter = () => {
  const dispatch = useAppDispatch();
  const { value, status, data, error } = useAppSelector((state) => state.demo);

  useEffect(() => {
    // Fetch data when component mounts
    dispatch(fetchDemoData());
  }, [dispatch]);

  return (
    <Container className="p-4 border rounded-lg shadow-sm">
      <Text variant="h2" className="text-xl font-bold mb-4">
        Redux Demo Counter
      </Text>

      <Container className="mb-4">
        <Text variant="p" className="text-lg font-semibold">
          Count: {value}
        </Text>
        <Container className="flex gap-2 mt-2">
          <Button onClick={() => dispatch(decrement())} variant="danger">
            Decrement
          </Button>
          <Button
            onClick={() => dispatch(increment())}
            variant="primary"
            className="bg-green-500 hover:bg-green-600"
          >
            Increment
          </Button>
          <Button
            onClick={() => dispatch(incrementByAmount(5))}
            variant="primary"
            className="bg-blue-500 hover:bg-blue-600"
          >
            Add 5
          </Button>
        </Container>
      </Container>

      <Container className="mt-6">
        <Text variant="h3" className="text-lg font-semibold mb-2">
          Async Data Demo
        </Text>
        {status === "loading" && <Text variant="p">Loading data...</Text>}
        {status === "failed" && (
          <Text variant="p" color="text-red-500">
            Error: {error}
          </Text>
        )}
        {status === "succeeded" && (
          <Container>
            <Text variant="p" className="mb-2">
              Data loaded successfully:
            </Text>
            {data.length > 0 ? (
              <ul className="list-disc pl-5">
                {data.map((item) => (
                  <li key={item.id}>
                    <Text variant="span" weight="semibold">
                      {item.title}
                    </Text>
                    <Text variant="span">: {item.description}</Text>
                  </li>
                ))}
              </ul>
            ) : (
              <Text variant="p">No data available</Text>
            )}
          </Container>
        )}
        <Button
          onClick={() => dispatch(fetchDemoData())}
          variant="primary"
          className="mt-2 bg-purple-500 hover:bg-purple-600"
        >
          Refresh Data
        </Button>
      </Container>
    </Container>
  );
};

export default DemoCounter;
