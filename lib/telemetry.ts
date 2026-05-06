export type TelemetryLevel = "error" | "warn" | "info";

export type TelemetryPayload = {
  level: TelemetryLevel;
  message: string;
  source: string;
  meta?: Record<string, unknown>;
};

export async function sendTelemetry(payload: TelemetryPayload): Promise<void> {
  try {
    await fetch("/api/telemetry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    console.error("[telemetry] failed to send event", payload);
  }
}

export function logServerTelemetry(payload: TelemetryPayload): void {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    ...payload,
  });
  if (payload.level === "error") {
    console.error(line);
    return;
  }
  if (payload.level === "warn") {
    console.warn(line);
    return;
  }
  console.info(line);
}
