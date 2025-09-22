"use client";

import { useEffect, useState, type ReactNode } from "react";

export function MSWComponent({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(process.env.NODE_ENV !== "development");

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && !isReady) {
      const initMSW = async () => {
        const { worker } = await import("@/mocks/browser");
        await worker.start();
        setIsReady(true);
      };
      initMSW();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
