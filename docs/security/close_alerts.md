# Resolved Vulnerabilities Summary

This document captures the dependency security work already completed on `backend-core`. Active alerts and risk analysis now live in `docs/security/open_alerts_risk.md` and `docs/security/dependabot_alerts.csv`.

## Remediation Snapshot

- **Total alerts closed via this branch:** 205 (≈93.6% reduction relative to the initial Dependabot backlog).
- **Critical advisories remediated:**
  - `form-data` (runtime & dev) → patched to 4.0.4 using Yarn resolutions.
  - `systeminformation` → pinned to 5.23.20.
  - `json-schema` → pinned to 0.4.0.
  - `@babel/traverse` → upgraded to 7.26.5.
- **High/Medium/Low fixes:**
  - 109 **high** severity alerts closed (axios, express, jsonwebtoken, qs, ws, micromatch, tar-fs, etc.).
  - 51 **medium** severity alerts closed (helmet, follow-redirects, swagger-ui-dist, http-proxy transitives, etc.).
  - 23 **low** severity alerts closed (cookie, send, serve-static, on-headers, brace-expansion, etc.).
- **Key package upgrades / removals:** express 4.21.1, axios 1.7.0, helmet 8.0.0, passport 0.7.0, jsonwebtoken 9.0.0, jest 29.x, eslint 8.57.0, removal of coveralls (eliminated deprecated `request`).
- **Supporting fixes:** reverted experimental Mongoose connection options to maintain compatibility while keeping security improvements.

## Dependency Pinning

Yarn `resolutions` are in place for high-risk transitives:
- `systeminformation@5.23.20`
- `form-data@4.0.4`
- `json-schema@0.4.0`
- `tar-fs@3.0.6`
- `qs@6.11.3`
- `micromatch@4.0.8`
- `ws@8.18.0`
- `body-parser@1.20.3`
- `follow-redirects@1.15.9`
- `cookie@0.7.2` / `send@0.19.0` / `serve-static@1.16.2`

These pins ensure patched versions persist until upstream packages adopt the fixes natively.

## Testing & Verification

- Regression coverage: `tests/regression/security-upgrades.test.js`.
- Integration coverage (requires MongoDB): `tests/integration/user.test.js` — rerun once a test database is available to confirm no regressions.

## Ongoing Tracking

- Use `docs/security/dependabot_alerts.csv` for per-alert status updates.
- Open issues and risk posture are documented in `docs/security/open_alerts_risk.md`.

_Last updated: 2025‑09‑25._
