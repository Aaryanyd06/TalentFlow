
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";

export function MSWComponent({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {

      const { worker } = await import("@/mocks/browser");
      await worker.start();

      const jobCount = await db.jobs.count();


      if (jobCount === 0) {
        console.log("Database is empty. Seeding mock data...");
        await fetch("/api/seed", { method: "POST" });
        

        window.location.reload();
      } else {

        setIsReady(true);
      }
    };

    init();
  }, []);

  if (!isReady) {
    return null;
  }
  
  return <>{children}</>;
}