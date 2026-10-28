# Website logic and source map

The application uses React 19, TypeScript, TanStack Start/Router, React Query, Tailwind CSS, Radix UI, and Supabase. The Lovable Vite configuration supplies the framework plugins and a Nitro Cloudflare build target.

| Location | Responsibility |
| --- | --- |
| `src/routes/` | File-based route components and page metadata |
| `src/routes/__root.tsx` | Shared providers, page content loader, public shell |
| `src/components/site-shell.tsx` | Navigation, footer, page introductions |
| `src/components/admin/` | Dashboard overview, content editor, review moderation |
| `src/components/customer-reviews.tsx` | Public reviews and review submission |
| `src/lib/site-data.ts` | Public media and page-text queries |
| `src/lib/site-items.ts` | Menu/setup categories, items, defaults, services and FAQs |
| `src/lib/admin-data.ts` | Authenticated CMS queries and query invalidation |
| `src/lib/cms-fields.ts` | Editable text groups and field validation |
| `src/lib/site-settings.ts` | Public contact/footer settings |
| `src/lib/booking.ts` | Booking validation, payload and submission guard |
| `src/lib/reviews.ts` | Review types, validation and submission guard |
| `src/integrations/supabase/` | Authenticated client, auth integration and database types |
| `src/lib/public-content-client.ts` | Separate anonymous public-content client |
| `src/styles.css` | Burgundy, ivory and gold design tokens and shared styles |
| `src/server.ts` | Server rendering error wrapper |

## Routes

Public routes are `/`, `/about`, `/menus`, `/setups`, `/book`, `/reviews`, `/privacy`, `/terms`, and `/booking-policy`. Regional pages are `/wedding-catering-ajmer`, `/wedding-catering-pushkar`, `/catering-kishangarh`, `/rajasthani-catering-ajmer`, and `/halwai-ajmer`.

Journal routes are `/blog`, `/blog/wedding-catering-ajmer-guide`, and `/blog/rajasthani-wedding-food-menu`. `/admin` uses its own management layout. Gallery navigation reuses `/setups#gallery`; Contact reuses `/book#contact`.

## Content flow

`page_content` stores editable text as key/value pairs. `site_items` stores structured content in JSON with a kind and display order. `site_media` stores media placements, URLs, captions, descriptions and storage references. Published flags control visitor visibility after the owner CMS migration is applied.

The homepage loader obtains media before server rendering and passes the same snapshot to React Query on the client. This prevents bundled hero defaults being immediately replaced during hydration. Requests are bounded by timeouts. Bundled media is used when CMS hero media is unavailable; slideshow playback starts paused.

Menus and setups link children to category names. The public item hook filters children whose categories are not visible. The migration propagates category renames and blocks deleting categories that still contain items.

## Visitor actions

The booking form progresses through occasion, destination/guests, menu, contact details, and review. Validation runs before writing an explicit payload to `booking_enquiries`. A submission guard prevents concurrent duplicate writes; success requires a successful database response.

Reviews obtain a short-lived challenge, validate consent and review fields, and call a submission RPC. New reviews are pending. Public display reads a restricted RPC containing approved fields; see [database details](database.md).
