// /functions/version.ts
// Read-only build/version endpoint
// Exposed at: /version

export const onRequestGet = async () => {
  const version = "ZIVAI 0.1.0";

  const payload = {
    name: "ziv.ai",
    version,
    environment: "production",
    commit:
      (typeof process !== "undefined" && process.env?.CF_PAGES_COMMIT_SHA) ||
      null,
    branch:
      (typeof process !== "undefined" && process.env?.CF_PAGES_BRANCH) || null,
    observed_at: new Date().toISOString(),
    posture: "read-only",
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
};
