"use client";

import { useEffect } from "react";

export function MSWComponent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (process.env.NODE_ENV === "development") {
        require("@/mocks/browser").worker.start().then(() => {
          fetch("/api/seed", { method: "POST" });
        });
      }
    }
  }, []);

  return null;
}