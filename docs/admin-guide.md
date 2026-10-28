# Owner dashboard guide

Open `/admin` and sign in with an approved administrator account. The page restores the Supabase session and reads the signed-in user's `user_roles` row before displaying management controls. Creating an account alone does not grant administrative access after the owner CMS migration.

| Section | Tasks |
| --- | --- |
| Dashboard | View actual database counts and open quick actions |
| Booking enquiries | Search, filter status, sort, page through, inspect, add or edit enquiries |
| Menus & dishes | Manage categories, dishes, descriptions, photos and order |
| Catering setups | Manage categories and setup cards |
| Gallery & photos | Upload and manage media placements by website section |
| Customer reviews | Read originals, moderate, correct wording, feature and order reviews |
| FAQs | Manage questions, answers and display order |
| Services & locations | Manage homepage services and destination cards |
| Homepage content | Edit headings, descriptions, button labels and associated media |
| About page | Edit the story, introduction and hospitality approach |
| Contact information | Set public phone numbers, email, location and social links |
| Website settings | Set homepage/default identity fields, sharing image and footer text |
| Account & security | Inspect the signed-in account and sign out |

## Editing content

New catalog items begin as hidden drafts. Fill in the required fields, choose an existing category where needed, and save. Select the publication control to make the saved item visible. Preview controls show local edits before saving. Main dashboard navigation warns when a marked editor has unsaved changes; save before leaving or refreshing.

Category names connect dishes and setups to their groups. Move children elsewhere before deleting a category. Renames are propagated by the database migration. Use display order controls to change placement.

Contact fields are public information. Enter only business contact details. Optional social links may be cleared; secure `https://` links are expected. Some page-specific metadata and static regional content still live in route source files; the CMS does not edit every sentence on every route.

## Bookings

Statuses are `new`, `called`, `confirmed`, and `closed`. Closed enquiries are not automatically completed events. Search covers names, phones, city, event and menu choices. Sorting supports newest received, oldest received and event date. Details expose the stored enquiry; editing persists to the existing table. Deletion requires confirmation and removes the enquiry permanently.

## Photos and videos

Choose up to 20 files, inspect the local previews, then upload. Images accept JPEG, PNG, WebP or AVIF up to 10 MB each; videos accept MP4 or WebM up to 25 MB each. Set whether uploads are published immediately or stored as hidden drafts.

Edit title, caption, accessibility description, publication and display order, then save. Removing a media placement retains the uploaded storage object so another section can continue referencing it. Replacement uploads use new paths; existing user-managed references are preserved.

## Reviews

Pending submissions do not appear publicly. Read the original text and consent details before publishing. Corrections are stored separately from originals, and the public page labels edited reviews. Optional name-display permission controls whether the public name is shown or anonymized.

Publish, reject, hide, save corrections, or permanently delete using the moderation dialog. Hiding or rejecting keeps the original for later reference. Feature a published review to include it in the homepage selection. Moderation history records actions and timestamps; it is available only to administrators.
