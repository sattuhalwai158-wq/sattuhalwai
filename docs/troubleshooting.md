# Troubleshooting

## Admin page shows a Vite parse overlay

Read the first error and its source path. Two source errors were corrected during the recent implementation:

- Duplicate `errorMessage`/`setErrorMessage` declarations in `SignIn` in `src/routes/admin.tsx`. The booking editor has its own separate state declaration.
- Malformed JSX self-closing `Input` tag (`/ >`) in `src/components/admin/content-editor.tsx`; corrected to `/>`.

Save source changes and reload `/admin`. If Vite retains an old overlay, stop the development process with Ctrl+C and restart `npm run dev`. A successful bundle confirms compilation, but does not establish that login or database operations succeed.

## No admin access

Check that the intended account is signed in and its Supabase user ID has an `admin` role in `user_roles`. A project administrator must assign missing access through the authorized database workflow. Do not disable RLS to bypass the message.

## Connection interrupted or loading stalls

Confirm environment variables are present, browser requests reach the intended Supabase project, and the session is valid. Inspect the browser console and network error for the failing auth or role request. Restart Vite after changing `.env`. The admin page provides restore/access-check error states.

## Reviews unavailable or CMS save reports missing columns

Confirm that `20261028180000_owner_cms_and_reviews.sql` is applied to the same project used by the app. The new review tables, RPCs, publication fields and media alt text depend on it. A missing migration is different from an authentication failure. See [database rollout](database.md).

## Upload fails

Check type/size against [upload limits](admin-guide.md), admin access, bucket policies and the network response. The storage bucket must be `site-media`. A storage upload and placement insert are separate operations; an interrupted request can leave an unreferenced object. Review references before performing any storage cleanup.

## Hero image changes during reload

The homepage loader and client query should share the same initial media snapshot. Inspect `src/routes/index.tsx` and `src/lib/site-data.ts` before changing fallback logic. CMS images take precedence; bundled images are defaults. Slideshow playback is paused initially. Do not overwrite uploaded files to fix loading behavior.

## Development port fails

Read the exact terminal error. `EADDRINUSE` indicates another process owns the port; use the existing development server or stop the intended old process. `EPERM` indicates an environment permission restriction and does not by itself prove the port is occupied.

The `vite-tsconfig-paths` message is a configuration warning. The Lovable wrapper already supplies plugins; follow `vite.config.ts` comments before modifying plugin configuration.
