// components/ProviderWrapper.tsx
"use client";

import { Provider } from "react-redux";
import Store from "../redux/Store";
import React from "react";

const ProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default ProviderWrapper;
