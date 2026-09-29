# Clean and correctly label website media

## What will change
- Do not add the three newly uploaded files because they are booking-page screenshots, not catering images.
- Keep both existing videos because they are different recordings.
- Remove repeated photo appearances from gallery feeds while keeping one correctly titled copy of each real photo.
- Use the visible event labels and existing filenames for clear titles such as “Myra Breakfast”, “Mehendi Lunch”, “Haldi Breakfast”, and “Sangeet Dinner”.
- Preserve the admin controls so future uploads and titles remain editable.

## Technical details
- De-duplicate media by its image URL before rendering combined gallery collections.
- Avoid deleting unique source files or database entries that are used by another page.
- Verify the main pages and gallery after the change.
