# Long V3 Store Release Candidate

This repository is the cumulative code baseline for Web + iOS/Android packaging.

## Included
- Lavender default theme
- First-launch VI / EN / 中文 selector
- Route-aware Tree 1 active state
- Sticky Tree 2 CoreBar
- Full-width horizontal sticky Tree 3 RouteBar
- Tree 4/5/END content region
- PWA manifest/service worker
- Capacitor dependencies/config baseline
- Event Space / QR / Chat / Presence / AI Jobs / Store / TV integration from cumulative RC

## Before App Store / Google Play submission
The GitHub package is NOT a signed App Store/Play binary. You still must:
1. Connect production auth and final production API environment.
2. Choose native packaging architecture for the Next.js API routes (host APIs separately or use hosted web shell).
3. Run `npx cap add ios` and `npx cap add android` on a machine with the native toolchains.
4. Configure Apple bundle signing/provisioning, privacy manifest, app icons/screenshots and App Store metadata.
5. Configure Android application ID/signing, Play data-safety declaration, icons/screenshots and Play metadata.
6. Test camera/microphone/files/deep links/QR/push notifications on real devices.
7. Build/archive in Xcode and Android Studio, then submit using your developer accounts.

Do not commit API secrets or signing certificates to GitHub.
