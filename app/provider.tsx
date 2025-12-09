"use client";

import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider afterSignOutUrl="/home">{children}</ClerkProvider>;
};

export default Provider;
