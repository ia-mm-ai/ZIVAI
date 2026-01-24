# /capacity — Specification (Demo)

Method: GET

Purpose:
Return a single capacity state as a read-only signal.

Inputs (optional, demo):
Query parameters:
- `load` (0–100) — aggregate load proxy
- `rate` (0–100) — aggregate change-rate proxy

Inputs are stateless, bounded, non-identitarian.

Output (JSON):
```json
{
  "schema": "zivai.capacity@0.1.0",
  "state": "LOW|MEDIUM|HIGH|SATURATED|UNKNOWN",
  "observed_at": "ISO-8601 timestamp",
  "inputs": { "load": 0, "rate": 0 }
}
