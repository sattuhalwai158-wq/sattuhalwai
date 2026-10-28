import { readdir, readFile, writeFile, mkdir, rename, access } from 'node:fs/promises';
import path from 'node:path';

// Run from the repository root. Old paths remain supported by hosting redirects.
const moves = {
  'brand-logo.webp': 'brand/n-sattu-cuisine-logo.webp',
  'home-cups.webp': 'menus/mithai/rose-mawa-cups.webp',
  'home-slices.webp': 'menus/mithai/rose-kesar-slices.webp',
  'home-mithai.webp': 'menus/mithai/signature-mithai-platter.webp',
  'home-thali.webp': 'home/rajasthani-thali.webp',
  'home-hospitality.webp': 'home/catering-hospitality.webp',
  'home-live-counter.webp': 'home/live-food-counter.webp',
  'buffet-6.jpg': 'setups/illuminated-buffet-counters.jpg',
  'buffet-17.jpg': 'about/catering-team-and-service.jpg',
  'buffet-28.jpg': 'setups/brass-and-kulhad-service.jpg',
  'buffet-39.jpg': 'setups/wedding-buffet-backdrop.jpg',
  'live-dosa-counter.jpg': 'setups/live-dosa-counter.jpg',
  'night-stalls.jpg': 'setups/night-food-stalls.jpg',
  'rajasthani-stall.jpg': 'setups/rajasthani-food-stall.jpg',
  'video-1.mp4': 'videos/illuminated-buffet-staging.mp4',
  'video-1-poster.jpg': 'videos/illuminated-buffet-staging-poster.jpg',
  'video-2.mp4': 'videos/live-stalls-and-breakfast.mp4',
  'video-2-poster.jpg': 'videos/live-stalls-and-breakfast-poster.jpg',
};
for (const name of ['carnival-lunch','haldi-breakfast','haldi-dinner','high-tea','mehendi-lunch','myra-breakfast','sangeet-dinner','shadi-breakfast','vidai-breakfast']) {
  moves[`${name}.jpg`] = `celebrations/${name.replace('shadi','wedding').replace('vidai','farewell')}-platter.jpg`;
}
for (const name of ['rose-sweet-cups','rose-sweet-cups-2','rose-sweet-cups-3','rose-sweet-cups-4','rose-sweet-cups-5','rose-sweet-slices','sweet-rose-platter','sweet-rose-platter-2','sweet-rose-platter-3']) {
  moves[`${name}.jpg`] = `menus/mithai/${name.replace('rose-sweet','rose-mithai').replace('sweet-rose','rose-mithai')}.jpg`;
}
const pairs = Object.entries(moves).map(([old,next]) => [`/media/${old}`, `/media/${next}`]);
for (const [old,next] of pairs) {
  const source = `public${old}`, target = `public${next}`;
  try { await access(source); } catch { continue; }
  try { await access(target); throw new Error(`Target already exists: ${target}`); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  await mkdir(path.dirname(target), {recursive:true});
  await rename(source,target);
}
async function update(directory) {
  for (const entry of await readdir(directory,{withFileTypes:true})) {
    const file = path.join(directory,entry.name);
    if (entry.isDirectory()) { await update(file); continue; }
    if (!/\.(tsx?|mjs|md|json|xml)$/.test(file)) continue;
    const original = await readFile(file,'utf8');
    let next = original;
    for (const [old,replacement] of pairs) next = next.replaceAll(old,replacement);
    if (next !== original) await writeFile(file,next);
  }
}
for (const directory of ['src','tests','docs']) await update(directory);
await writeFile('vercel.json',JSON.stringify({redirects:pairs.map(([source,destination])=>({source,destination,permanent:true}))},null,2)+'\n');
await writeFile('public/_redirects',pairs.map(([old,next])=>`${old} ${next} 301`).join('\n')+'\n');
const rows = pairs.map(([old,next])=>`| \`${old}\` | \`${next}\` |`).join('\n');
await writeFile('docs/media-assets.md',`# Media asset inventory\n\nAssets shared by several routes are grouped by subject. Homepage-only assets live under home; the homepage story video is home/our-story.mp4. Source references use the new paths. Historical SQL migrations retain their original paths; Vercel and Cloudflare redirect rules support those existing URLs without changing database records. Externally uploaded assets are not moved.\n\nRun this organizer only from the repository root. It preserves an existing destination rather than overwriting it.\n\n| Previous URL | Current URL |\n| --- | --- |\n${rows}\n`);
console.log(`Organized ${pairs.length} asset paths and updated source references.`);
