# Risk Assessment Of Remaining Alerts

> Snapshot for internal coordination; keep in sync with `docs/security/dependabot_alerts.csv`.

## PM2 Proxy Stack (alerts 83, 69, 67, 47, 40, 78, 77, 43, 39)
- **Likelihood:** Medium – exploitation needs access to PM2’s HTTP control plane or control of proxy targets, but broad ingress makes this plausible.
- **Impact:** High – can lead to SSRF or remote command execution through PM2’s proxy endpoints.
- **Mitigation:** Keep PM2 isolated behind private interfaces, disable the interactor/proxy APIs, and enforce allow-lists for upstream targets.

## Express 4 / `path-to-regexp@0.x` (alerts 61, 49, 51, 42)
- **Likelihood:** Medium – risky where route params accept unvalidated user input.
- **Impact:** High – crafted patterns can cause ReDoS or bypass routing safeguards.
- **Mitigation:** Validate and bound dynamic params, add WAF rules, and plan the Express 5 migration.

## `http-proxy-middleware` SSRF (alerts 71, 70, 56)
- **Likelihood:** Medium – requires attacker-controlled proxy targets or headers.
- **Impact:** High – GHSA-h4gq-6v78-prn7 allows pivoting to internal services.
- **Mitigation:** Resolve targets from trusted configuration, strip sensitive headers, and remove user-defined proxying capabilities.

## Mongoose 6.x Advisories (alerts 63, 59)
- **Likelihood:** Low – attacker must influence server-side query construction.
- **Impact:** Medium – potential NoSQL injection or resource exhaustion.
- **Mitigation:** Ensure `sanitizeFilter` is enabled, avoid `$where` executions, and monitor the casbin adapter timeline for a safe Mongoose 8 upgrade.

## Nodemailer Advisory (alert 38)
- **Likelihood:** Low – depends on interaction with untrusted SMTP peers.
- **Impact:** Medium – could expose credentials or message contents.
- **Mitigation:** Enforce TLS (`secure: true`) and migrate production email to provider HTTP APIs or managed SMTP relays.

*Do not publish this file externally until all mitigations are completed.*
