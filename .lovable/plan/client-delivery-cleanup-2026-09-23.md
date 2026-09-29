# Client delivery cleanup

## Goal
Prepare the website for client handoff by removing draft-style labels and checking all public pages for unfinished content.

## Changes
- Replace “Destination 01 / 02 / 03” with useful Hindi location names for Ajmer, Pushkar, and Kishangarh.
- Update the saved admin-managed destination content so the correction appears immediately and remains editable.
- Remove or revise any visible “coming soon,” placeholder, sample, or call-only enquiry wording found during the public-page audit.
- Keep admin input hints that are only visible inside the admin portal where they help data entry.

## Verification
- Check every public page at desktop and mobile sizes.
- Confirm only Ajmer, Pushkar, and Kishangarh appear as service locations.
- Confirm booking and enquiry actions lead to the submitted booking form.
- Confirm the latest build has no errors.

## Technical details
- Public destination cards read from `site_items`, so both stored records and fallback content will be aligned.
- Existing design, images, admin controls, and business information will remain unchanged.
