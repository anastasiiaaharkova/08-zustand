"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TanStackProviderProps {
  children: React.ReactNode;
}

function TanStackProvider({ children }: TanStackProviderProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default TanStackProvider;