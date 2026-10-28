# Supabase database and permissions

Migrations are the schema source of truth under `supabase/migrations/`. The application uses the existing public key for visitor requests and authenticated user sessions for admin requests.

| Table | Purpose and access |
| --- | --- |
| `user_roles` | Account roles; users can read their own roles |
| `booking_enquiries` | Visitor inserts; admin reads, updates and deletes |
| `page_content` | Public text reads; admin mutations |
| `site_items` | Published public content; admin catalog management |
| `site_media` | Published media placements; admin management |
| `customer_reviews` | Private submissions; admin reads, RPC-controlled mutations |
| `review_moderation_log` | Private action history; admin reads |
| `review_submission_challenges` | Internal review submission tokens; no direct visitor access |

The private `site-media` bucket uses existing admin storage policies. Media placements retain signed URLs and storage paths. Removing a placement through the current dashboard does not delete its storage file.

## Owner CMS migration

`20261028180000_owner_cms_and_reviews.sql` adds `published` fields to items/media, `alt_text` to media, category relationship protection, private review tables, review RPCs, indexes and upload limits. Existing content remains published by default. It removes the general first-signup admin bootstrap trigger while retaining explicit owner provisioning and existing roles.

The migration has been written locally. This session has not established whether it is applied to your remote project. Review deployment history and target project before applying it. Use the normal Supabase migration workflow with a backup and an isolated environment first. For an already linked, confirmed target, `supabase db push` applies pending migrations; inspect all pending files before running it. Do not paste production credentials into browser code or documentation.

Update `src/integrations/supabase/types.ts` when schema changes. The current types include the new CMS fields and review RPC contracts.

## Review RPC contracts

| Function | Behavior |
| --- | --- |
| `begin_customer_review()` | Creates a token with a global issuance budget |
| `submit_customer_review(...)` | Validates fields, consent, token age, honeypot and duplicate fingerprint; inserts pending only |
| `list_published_reviews()` | Returns approved display fields and anonymizes names without display permission |
| `moderate_customer_review(...)` | Checks admin role, applies action and records audit history |

Submission tokens require a two-second minimum age and expire after 30 minutes. Issuance is limited to 300 per hour globally, and accepted reviews to 50 per hour globally. A repeated token is idempotent; matching normalized name/body submissions are rejected within one day. These controls are global budgets, not per-user or per-IP rate limits.

Review status is `pending`, `published`, `rejected`, or `hidden`. Submission arguments cannot select status, feature placement, or moderation metadata. Public output excludes consent records, private notes, fingerprints, moderator details and undisclosed names. Original title/body remain separate from edited display overrides until permanent deletion.

Admin access depends on Supabase authorization, not the visibility of frontend controls. Preserve Row Level Security and the RPC role checks when extending this system. Role assignment is an administrative database operation; do not add a browser self-promotion mechanism.
