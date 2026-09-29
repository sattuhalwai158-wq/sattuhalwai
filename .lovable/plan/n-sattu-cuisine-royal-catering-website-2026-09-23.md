# N-Sattu Cuisine Royal Catering Website

## Goal
Create a polished, multi-page catering website that presents N-Sattu Cuisine as a premium Rajasthani wedding and destination-event specialist, while making direct catering inquiries fast and easy on every device.

## Pages and navigation
- Build a shared sticky header, mobile navigation drawer, footer, and direct call actions. WhatsApp connection is intentionally deferred.
- Create distinct pages for Home, Heritage, Curated Menus, Luxury Setups, Reviews & FAQ, Book Event, Privacy, Terms, and Booking Policy.
- Give every page its own title and social description, with working navigation and active states.

## Visual direction
- Use the specified obsidian and onyx foundation, imperial gold accents, warm alabaster text, restrained saffron highlights, and fine gold borders.
- Pair a regal serif display face with a clean premium sans-serif face.
- Use generated, cohesive imagery showing authentic Indian mithai, Rajasthani banquet cuisine, brass service, live counters, and palace wedding staging.
- Add subtle reveal, carousel, hover, and modal transitions while respecting reduced-motion preferences.
- Keep the presentation editorial and regal rather than filling every section with boxed cards.

## Core experience
- Home: immersive banquet introduction, trust badge, primary actions, animated legacy metrics, signature delicacy carousel, service pillars, and an interactive event estimator.
- Heritage: founder story, “स्वाद और विश्वास” philosophy, destination reach, ingredient standards, and behind-the-scenes craft.
- Menus: category tabs, filterable dish grid, badges, tasting details, pairings in accessible dialogs, brochure action, and customized-menu inquiry.
- Setups: filterable event gallery, full-screen lightbox, captions, event details, and explanations of live culinary theatre.
- Reviews: six clearly presented sample host testimonials and an accessible FAQ accordion covering reach, Jain service, capacity, tastings, and setup support.
- Booking: a validated five-step inquiry form with a clear review summary, plus a Web3Forms-ready email inquiry form and direct contact/social details. WhatsApp submission will be added later.
- Legal: concise, business-appropriate Privacy, Terms, and Booking & Cancellation pages without inventing specific deposit percentages or unprovided commercial terms.

## Interactions and data handling
- Use the supplied phone numbers and social handles throughout.
- Open telephone, Instagram, and YouTube links correctly; do not add active WhatsApp links yet.
- Keep booking state in the page only; no account or database is required.
- Validate required booking and email fields, with clear progress, errors, and a final inquiry summary ready for future WhatsApp connection.
- Treat the email form as Web3Forms-ready; submission will remain clearly unavailable until an access key is supplied, rather than embedding a fake credential.
- Avoid inventing business hours; present service availability as “By appointment” where needed.

## Technical details
- Use the existing TanStack Start file-based routing, React 19, Tailwind CSS v4, Lucide icons, Radix-based controls, Embla carousel, and existing animation utilities.
- Centralize content data for dishes, setups, testimonials, FAQs, and destinations so filters and dialogs stay consistent.
- Define all palette, typography, surface, border, and motion values as semantic design tokens in the global stylesheet.
- Add reusable site shell, section heading, booking dialog, image lightbox, and content-card components before wiring routes.
- Use responsive image sizing, keyboard-accessible dialogs/drawers, visible focus states, descriptive alt text, and mobile-safe controls.

## Verification
- Confirm all routes and links load without errors.
- Test menu/setup filters, dialogs, accordions, carousel controls, estimator updates, booking validation, and generated WhatsApp links.
- Check desktop and mobile layouts for clipping, overlap, readable contrast, and stable controls.
- Confirm the final preview builds cleanly and the browser console has no app errors.
