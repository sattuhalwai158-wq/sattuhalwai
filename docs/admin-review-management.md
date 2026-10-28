# Owner dashboard and customer reviews

The owner dashboard now separates operational work from public content editing:

- Dashboard overview uses live booking, review, menu, and gallery counts.
- Booking enquiries support search, status filtering, sorting, pagination, detail view, editing, and guarded status changes.
- Menus, setups, FAQs, services, homepage, About, Contact, and Website settings have dedicated editing sections. Content saves preserve drafts and warn before navigating away with unsaved changes.
- Gallery uploads are staged locally, validated by file type and size, and only uploaded after the owner confirms. Existing storage files are not deleted when a placement is removed.
- Customer reviews require an explicit publication consent, are submitted as pending, and are visible publicly only after an administrator publishes them.
- Moderators can publish, reject, hide, or edit a review. Original title and body values remain stored; edits are separate overrides and every moderation action is recorded in a private audit log.

## Database rollout

Apply `supabase/migrations/20261028180000_owner_cms_and_reviews.sql` through the normal Supabase migration workflow before enabling the review form in production. The migration is intentionally not applied by this coding session and no production enquiries or reviews were created.

The migration adds publication flags and alt text to existing CMS rows, protects category relationships, creates private review and moderation tables, adds rate-limited review submission RPCs, and restricts public reads to the narrow approved-review projection. It also removes the broad first-signup admin trigger while preserving the existing explicit owner-role trigger.

The frontend uses the existing Supabase public/authenticated clients and never embeds a service-role key. Until the migration is deployed, the review form will fail safely with an unavailable-state message rather than fabricating a successful submission.
