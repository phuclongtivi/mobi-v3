# LONG Mobi R4B7 — Functional Centers and Per-Control Integrity

This mobile package mirrors the Pro functional-center repair: API-backed Store warehouse, horizontal Event filters, structured event input, per-AI configuration, integrated Mixer, integrated Chat Room, social OAuth, signed sessions, dynamic Action IDs and receipt gating.

Run `006_event_filter_fields.sql`, `007_user_oauth_accounts.sql`, and `008_functional_centers.sql` after earlier migrations. Configure `DATABASE_URL`, `AUTH_SESSION_SECRET`, provider credentials and production adapters. External channel delivery, payment, render and physical-device actions remain gated until real provider/device receipts exist.
