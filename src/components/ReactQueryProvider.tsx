// src/components/ReactQueryProvider.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

export const ReactQueryProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient()); // ساخته شدن فقط در کلاینت

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
