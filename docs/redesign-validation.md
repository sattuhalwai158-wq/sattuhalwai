# Sattu Halwai redesign and validation

> Historical report from the earlier redesign phase. Later owner CMS and review changes added migrations and changed the admin layout. Earlier check results do not validate those later changes. See [current validation status](validation-status.md), [owner guide](admin-guide.md), and [database documentation](database.md).

## Implemented

- Burgundy, warm ivory and antique-gold tokens, responsive typography and spacing, clear focus indicators and reduced-motion styles in `src/styles.css`.
- Shared navigation, footer and page introductions in `src/components/site-shell.tsx`; Gallery links to `/setups#gallery`, Contact links to `/book#contact`. Existing routes are retained.
- Shared button, input, textarea, sheet and dialog improvements, including larger controls and scrollable dialogs.
- Reusable category filters, empty/error states and enquiry banners in `src/components/page-sections.tsx`.
- Homepage, menus, setups, about, reviews, booking and admin interfaces updated. Regional service pages use the shared visual system and have a single page heading. Journal pages inherit the shared navigation, introductions and tokens.
- Privacy, terms and booking-policy pages use a shared readable layout and in-page contents navigation in `src/components/legal-page.tsx`. Legal meaning is preserved.
- Gallery viewer supports next/previous controls, arrow keys, Escape through Radix Dialog, touch swipes and focus restoration. These interactions are implemented but have not been exercised in a browser here.
- Booking has five named stages, inline validation, required labels, error associations, invalid-field focus, contact hints, review before submission, privacy information, duplicate-request protection and explicit success/failure states. Failed requests preserve entered details. The insert payload and database schema are unchanged.
- Admin has session/access-check failure states, accessible sign-in fields, responsive tabs, query retries, empty/loading/error states, labelled editor fields, keyboard-accessible uploads and guarded mutation controls. Authentication and RLS were not weakened; no Supabase migrations or generated integration files were changed.
- Unsupported seeded reviews, five-star ratings, business statistics and quantified experience claims are no longer published. Existing database records remain available in admin, with an explanation that public social proof needs verification.
- CMS image URLs and storage references are preserved. Refreshed WebP photographs are bundled defaults. The shared logo has an optimized WebP copy.

## Hard-reload image swap

Previously, SSR rendered bundled hero defaults with three controls; client-only Supabase results then replaced them with the admin's seven-image collection. This caused the temporary sweets photo shown in the supplied screenshot.

`src/routes/index.tsx` now loads public media using the shared query options before rendering. `src/lib/site-data.ts` seeds the client query from that serialized loader result. Both renders use the same image list. Media reads have a three-second timeout; on failure the fallback snapshot stays stable through initial hydration. Slideshow playback requires the visitor to press Play.

A read-only request to the running homepage verified that its initial HTML already contains the uploaded hero image and seven slideshow controls. The signed URL was not copied into this report.

## Checks executed

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run build` | Passed |
| `npm run lint` | No errors; six existing Fast Refresh export warnings |
| `npm test` | Both test files passed |
| `node tests/booking.test.mjs` | Eight assertions grouped as tests passed: valid payload, step validation, dates, phone/preferences/guest validation, India date boundaries, duplicate writes, failures/retry, and invalid-data write prevention |
| `node tests/hero-loading.test.mjs` | Three tests passed: server/client image equality, stable fallback initialization, preservation of custom URLs/storage references |
| `node scripts/smoke-routes.mjs http://127.0.0.1:8081` | All 18 routes passed twice; titles, canonical links, page structure, public headings and admin noindex checked; 24 local image URLs and HTTP 404 handling passed |
| `git diff --check` | Passed |
| Database safety | Booking writers mocked in tests; local smoke checks use GET only. No real enquiries, uploads, deletions, signups or admin updates were performed. |

The route checks are HTTP/server-rendering checks, not browser navigation or hydration tests. The hero handoff tests use real React server rendering and React Query with a mocked database transport, not a real browser.

## Remaining verification blockers

The computer-use tool returned no connected apps or browsers. Consequently the following have **not** been measured or verified:

- Layout/overflow at 320, 375, 390, 768, 1024, 1280 and 1440 CSS pixels.
- Actual keyboard focus, dialogs, touch interaction, image decoding, browser console/network errors and reduced-motion behaviour in a browser.
- Lighthouse Performance, Accessibility, Best Practices and SEO scores. No scores are claimed.
- Authenticated admin CRUD and a real database booking round trip. No isolated backend/authorized test account was supplied; production writes were deliberately avoided.

No deployment or Git history rewrite was performed. The pre-existing package-lock changes were retained.
