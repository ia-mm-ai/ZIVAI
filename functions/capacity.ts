// /functions/capacity.ts
// ZIVAI capacity signal endpoint (demo).
// Non-executing. Non-authoritative. Stateless.
// Emits a single capacity state.

type Env = Record<string, unknown>;
type CapacityState = "LOW" | "MEDIUM" | "HIGH" | "SATURATED" | "UNKNOWN";

function clampInt(v: number, min: number, max: number): number {
  if (Number.isNaN(v)) return min;
  return Math.max(min, Math.min(max, Math.trunc(v)));
}

function parsePct(raw: string | null): number | null {
  if (raw == null) return null;
  const n = Number(raw);
  if (!Number.isFinite(n)) return null;
  return clampInt(n, 0, 100);
}

function stateFrom(load: number | null, rate: number | null): CapacityState {
  if (load == null && rate == null) return "UNKNOWN";

  const l = load ?? 0;
  const r = rate ?? 0;

  if (l >= 90 || r >= 90) return "SATURATED";
  if (l >= 70 || r >= 70) return "HIGH";
  if (l >= 40 || r >= 40) return "MEDIUM";
  return "LOW";
}

function corsHeaders(origin: string | null): Record<string, string> {
  return {
    "access-control-allow-origin": origin ?? "*",
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": "86400",
    vary: "Origin",
  };
}

export async function onRequest({ request }: { request: Request; env: Env }) {
  const origin = request.headers.get("Origin");
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: { ...corsHeaders(origin) },
    });
  }

  if (request.method !== "GET") {
    return new Response(
      JSON.stringify(
        { error: { code: "method-not-allowed", message: "Use GET." } },
        null,
        2,
      ),
      {
        status: 405,
        headers: {
          "content-type": "application/json; charset=utf-8",
          ...corsHeaders(origin),
        },
      },
    );
  }

  const load = parsePct(url.searchParams.get("load"));
  const rate = parsePct(url.searchParams.get("rate"));

  // If either param is present but invalid -> UNKNOWN.
  const loadRaw = url.searchParams.get("load");
  const rateRaw = url.searchParams.get("rate");
  const invalid =
    (loadRaw !== null && load === null) || (rateRaw !== null && rate === null);

  const state: CapacityState = invalid ? "UNKNOWN" : stateFrom(load, rate);

  const payload = {
    schema: "zivai.capacity@0.1.0",
    state,
    observed_at: new Date().toISOString(),
    inputs: {
      load: load ?? null,
      rate: rate ?? null,
    },
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...corsHeaders(origin),
    },
  });
}
