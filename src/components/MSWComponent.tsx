
"use client";

import { useEffect, useState } from "react";

export function MSWComponent({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initMSW = async () => {
      const { worker } = await import("@/mocks/browser");
      await worker.start();
      setIsReady(true);
    };

    if (!isReady) {
      initMSW();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  
  return <>{children}</>;
}