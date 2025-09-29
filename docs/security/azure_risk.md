# Internal Risk Assessment (Do Not Commit Upstream)

> This document captures environment-specific risk context for the Azure-hosted deployment of `backend-core`. It supplements `docs/close_alerts.md` and should remain out of public revision history.

## Network Exposure Overview
- **VNets:** `vsw-vn` (East US), `digital-auto-vnet` (North Europe), `dreamos-autoverse-vnet` (Germany West Central).
- **Observations:** DDoS protection disabled; encryption enforcement set to `AllowUnencrypted`.
- **Subnets:** Multiple subnets share permissive policies to accommodate private endpoints, firewalls, and AKS nodes.

### NSG Highlights
- `dreamosautoverse2nsg622` permits inbound traffic from `*` on ports **80**, **8090**, **9443**, **55555**, **2377**, and **SSH**.
- Default NSG rules allow unrestricted outbound Internet access.

## Impact on Open Dependabot Alerts

| Alert Group | Risk in Current Network | Recommended Mitigation |
|-------------|------------------------|------------------------|
| **PM2 proxy stack** (`pm2`, `axios`, `ip`) | Public ingress on 80/8090/9443 lets SSRF/proxy vulnerabilities reach PM2’s control plane. | Restrict NSG sources, disable PM2 interactor/proxy endpoints, migrate to managed supervisor. |
| **Express 4 / `path-to-regexp`** | ReDoS and route traversal possible via unbounded path params exposed to Internet. | Validate params, add WAF rules, plan Express 5 upgrade. |
| **`http-proxy-middleware`** | SSRF vectors can pivot to internal services thanks to open ingress + unrestricted egress. | Enforce allow-listed targets, strip untrusted headers, disable user-driven proxying. |
| **Mongoose 6.x** | Malicious queries delivered over public API could exhaust resources. | Keep `sanitizeFilter` and query validators enabled; monitor for adapter-ready Mongoose 8.x upgrade. |
| **Nodemailer** | SMTP vulnerabilities matter if outbound mail flows directly to Internet. | Force TLS (`secure: true`) or migrate to provider HTTP APIs. |

## Recommended Hardening Steps (Non-Code)
1. Lock down NSG rules to trusted CIDR ranges or front doors; remove `*` where possible.
2. Enable Azure DDoS Protection Standard on critical VNets.
3. Route public traffic through Application Gateway + WAF; keep app subnet private.
4. Use Azure Bastion or jump hosts instead of exposing SSH/management ports to `*`.
5. Apply outbound egress restrictions via Azure Firewall for sensitive subnets.

## Workstream Path For Alert Remediation
1. **Service-layer fixes first**
   - Replace PM2 proxy usage with a managed supervisor or container orchestrator.
   - Enforce proxy target allow-lists and migrate away from `http-proxy-middleware`.
   - Introduce strict validation on Express route params and plan the Express 5 rollout.
   - Keep `sanitizeFilter` enabled globally and prepare for a Mongoose 8 upgrade once the casbin adapter releases support.
   - Switch Nodemailer transports to provider APIs or hardened SMTP with enforced TLS.
2. **Infrastructure alignment**
   - Sequence NSG tightening and DDoS enablement alongside blue/green deployments.
   - Front the service with Application Gateway/WAF before removing public NSG exposure.
   - Document and automate outbound allow-lists so future microservices inherit the same guardrails.
3. **Validation & rollout**
   - Extend integration/regression suites to cover proxy flows and route validation.
   - Run staged deployments through lower environments that mirror the Azure network layout.
   - Track each resolved Dependabot alert directly in `docs/security/dependabot_alerts.csv` before promoting to production.

*Reminder: This file is for internal coordination only and should not be pushed to the public repository.*
