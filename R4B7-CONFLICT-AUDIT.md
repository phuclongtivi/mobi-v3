# R4B7 Pro ↔ Mobi Action Conflict Audit

## Result

- Pro: 153/153 source button contracts mapped; 0 duplicate literal IDs; 0 duplicate dynamic patterns; 0 static IDs inside list rendering; 0 dead buttons.
- Mobi: 153/153 source button contracts mapped; 0 duplicate literal IDs; 0 duplicate dynamic patterns; 0 static IDs inside list rendering; 0 dead buttons.
- Navigation/action arrays: 0 duplicate sibling IDs or labels and 0 duplicate object keys.
- 151 normalized contracts intentionally share semantics across surfaces but use separate `pro.*` and `mobi.*` namespaces.
- Platform-only controls remain separate: Boss/Connect control plane on Pro; direct event creation/TV pairing on Mobi.

Resolved conflicts: Mobi now uses the Pro receipt-verification and six-core trace rules; obsolete `END` labels and `Thu/Chi của tôi` were removed; Store opens the full warehouse by `store.shopping` business ID.
