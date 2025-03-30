"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./index";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export const ReduxProvider = ({ children }: ReduxProviderProps) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handlePersistorState = () => {
      const booted = persistor.getState().bootstrapped;
      if (booted) {
        setIsReady(true);
      }
    };

    handlePersistorState();
    persistor.subscribe(handlePersistorState);

    return () => {
      // Cleanup subscription if needed
    };
  }, []);

  return <Provider store={store}>{isReady ? children : null}</Provider>;
};

export default ReduxProvider;
