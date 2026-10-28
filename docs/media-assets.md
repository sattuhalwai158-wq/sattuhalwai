# Media asset inventory

Assets shared by several routes are grouped by subject. Homepage-only assets live under home; the homepage story video is home/our-story.mp4. Source references use the new paths. Historical SQL migrations retain their original paths; Vercel and Cloudflare redirect rules support those existing URLs without changing database records. Externally uploaded assets are not moved.

Run this organizer only from the repository root. It preserves an existing destination rather than overwriting it.

| Previous URL | Current URL |
| --- | --- |
| `/media/brand-logo.webp` | `/media/brand/n-sattu-cuisine-logo.webp` |
| `/media/home-cups.webp` | `/media/menus/mithai/rose-mawa-cups.webp` |
| `/media/home-slices.webp` | `/media/menus/mithai/rose-kesar-slices.webp` |
| `/media/home-mithai.webp` | `/media/menus/mithai/signature-mithai-platter.webp` |
| `/media/home-thali.webp` | `/media/home/rajasthani-thali.webp` |
| `/media/home-hospitality.webp` | `/media/home/catering-hospitality.webp` |
| `/media/home-live-counter.webp` | `/media/home/live-food-counter.webp` |
| `/media/buffet-6.jpg` | `/media/setups/illuminated-buffet-counters.jpg` |
| `/media/buffet-17.jpg` | `/media/about/catering-team-and-service.jpg` |
| `/media/buffet-28.jpg` | `/media/setups/brass-and-kulhad-service.jpg` |
| `/media/buffet-39.jpg` | `/media/setups/wedding-buffet-backdrop.jpg` |
| `/media/live-dosa-counter.jpg` | `/media/setups/live-dosa-counter.jpg` |
| `/media/night-stalls.jpg` | `/media/setups/night-food-stalls.jpg` |
| `/media/rajasthani-stall.jpg` | `/media/setups/rajasthani-food-stall.jpg` |
| `/media/video-1.mp4` | `/media/videos/illuminated-buffet-staging.mp4` |
| `/media/video-1-poster.jpg` | `/media/videos/illuminated-buffet-staging-poster.jpg` |
| `/media/video-2.mp4` | `/media/videos/live-stalls-and-breakfast.mp4` |
| `/media/video-2-poster.jpg` | `/media/videos/live-stalls-and-breakfast-poster.jpg` |
| `/media/carnival-lunch.jpg` | `/media/celebrations/carnival-lunch-platter.jpg` |
| `/media/haldi-breakfast.jpg` | `/media/celebrations/haldi-breakfast-platter.jpg` |
| `/media/haldi-dinner.jpg` | `/media/celebrations/haldi-dinner-platter.jpg` |
| `/media/high-tea.jpg` | `/media/celebrations/high-tea-platter.jpg` |
| `/media/mehendi-lunch.jpg` | `/media/celebrations/mehendi-lunch-platter.jpg` |
| `/media/myra-breakfast.jpg` | `/media/celebrations/myra-breakfast-platter.jpg` |
| `/media/sangeet-dinner.jpg` | `/media/celebrations/sangeet-dinner-platter.jpg` |
| `/media/shadi-breakfast.jpg` | `/media/celebrations/wedding-breakfast-platter.jpg` |
| `/media/vidai-breakfast.jpg` | `/media/celebrations/farewell-breakfast-platter.jpg` |
| `/media/rose-sweet-cups.jpg` | `/media/menus/mithai/rose-mithai-cups.jpg` |
| `/media/rose-sweet-cups-2.jpg` | `/media/menus/mithai/rose-mithai-cups-2.jpg` |
| `/media/rose-sweet-cups-3.jpg` | `/media/menus/mithai/rose-mithai-cups-3.jpg` |
| `/media/rose-sweet-cups-4.jpg` | `/media/menus/mithai/rose-mithai-cups-4.jpg` |
| `/media/rose-sweet-cups-5.jpg` | `/media/menus/mithai/rose-mithai-cups-5.jpg` |
| `/media/rose-sweet-slices.jpg` | `/media/menus/mithai/rose-mithai-slices.jpg` |
| `/media/sweet-rose-platter.jpg` | `/media/menus/mithai/rose-mithai-platter.jpg` |
| `/media/sweet-rose-platter-2.jpg` | `/media/menus/mithai/rose-mithai-platter-2.jpg` |
| `/media/sweet-rose-platter-3.jpg` | `/media/menus/mithai/rose-mithai-platter-3.jpg` |
