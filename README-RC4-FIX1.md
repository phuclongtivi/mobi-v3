# RC4 FIX1

Standalone-build fix:
- Added tsconfig.json with @/* -> ./*
- Added next-env.d.ts
- Ensured next.config.ts exists
- Rechecked aliased imports
- Lavender remains default where ThemePicker exists

Build:
npm install
npm run build

Do not run npm audit fix --force.
Aliased imports unresolved at package time: 0
