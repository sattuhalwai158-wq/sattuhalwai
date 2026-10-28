# Deployment and maintenance

The project uses the Lovable TanStack Vite wrapper. `vite.config.ts` points the server entry to `src/server.ts`; Nitro currently builds a Cloudflare module target.

Run `npm run build` to produce `.output/public` and `.output/server`. Generated Wrangler configuration appears in `.output/server/wrangler.json` and `.wrangler/deploy/config.json`. Use the hosting provider's established deployment workflow and environment settings. Do not hand-edit generated output as the source fix.

Before release, review pending migrations against the intended Supabase project, preserve a recoverable backup, and deploy matching schema and application code. The new publication controls and review system require the owner CMS migration. A frontend deployment alone does not apply it.

## Release checks

When verification is authorized, run the available typecheck, lint, tests and build commands. Inspect public routes and `/admin` in a browser, including refresh and direct navigation. Exercise admin changes and form submissions only with mocks or an isolated test project. Check the required responsive widths, focus behavior, dialogs, reduced motion and image loading. Measure Lighthouse only in a working browser environment and report actual scores.

These are release instructions, not claims that checks have been executed. See [validation status](validation-status.md) for recorded results and limits.

## Assets and content

Preserve admin-managed image URLs and storage references. Bundled defaults live in `public/media/`. Do not delete storage files solely because a gallery placement was removed; other records may reference them. Publish only verified testimonials and business claims. Review contact information and policies with the owner before publication.

## Repository history

The repository is connected to Lovable. Preserve published Git history: avoid force pushes and rewriting pushed commits through rebase, amend or squash. Keep changes coherent and retain unrelated user edits. No deployment or push is performed by writing these documents.
