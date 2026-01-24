# ZIVAI

Ambient intelligence · Capacity regulation · Non-executing

ZIVAI emits a single capacity state as a public, read-only signal.

It does not act. It does not decide. It signals.

## Contents
- `public/index.html` — the ZIVAI surface (read-only)
- `functions/capacity.ts` — `/capacity` endpoint (demo; non-executing)
- `functions/version.ts` — `/version` endpoint (read-only build metadata)
- `POSTURE.md` — explicit constraints
- `SPEC_CAPACITY.md` — `/capacity` contract
- `LICENSE` — MIT

## Deploy (Cloudflare Pages)
- Build command: *(none)*
- Output directory: `public`
- Pages Functions: enabled (uses `functions/`)

Routes
- `GET /` → ZIVAI surface
- `GET /capacity` → capacity signal (JSON)
- `GET /version` → build metadata (JSON)

Demo-only · Free · Non-authoritative · KENTRA INTEGRITY SYSTEMS LTD
