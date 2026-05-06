"use client";

import { useEffect } from "react";
import { sendTelemetry } from "@/lib/telemetry";

export function ErrorTelemetryHook() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      void sendTelemetry({
        level: "error",
        source: "window.error",
        message: event.message || "Unhandled client error",
        meta: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      void sendTelemetry({
        level: "error",
        source: "window.unhandledrejection",
        message: event.reason instanceof Error ? event.reason.message : "Unhandled promise rejection",
      });
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}
