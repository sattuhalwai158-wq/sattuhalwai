import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryViewer } from "@/components/gallery-viewer";
import { VideoPreview } from "@/components/video-preview";
import { CategoryFilter, EmptyState, EnquiryBanner, QueryNotice } from "@/components/page-sections";
import { PageIntro } from "@/components/site-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useItems, useAllItems } from "@/lib/site-items";
import { buildPageHead, buildBreadcrumbSchema } from "@/components/seo";
import { useContent, useMedia } from "@/lib/site-data";

export const Route = createFileRoute("/setups")({
  head: () =>
    buildPageHead({
      title: "Wedding Catering Setups & Live Counters Ajmer | N Sattu Cuisine",
      description:
        "Palatial buffet staging, traditional brass & copper serveware, and theatrical live food counters for luxury weddings in Ajmer, Pushkar & Kishangarh.",
      path: "/setups",
      ogImage: "/media/setups/illuminated-buffet-counters.jpg",
      structuredData: [buildBreadcrumbSchema([{ name: "Luxury Setups", path: "/setups" }])],
    }),
  component: Setups,
});

type Item = {
  title: string;
  category: string;
  image: string;
  position: string;
  detail: string;
  alt?: string;
};

function Setups() {
  const text = useContent();
  const gallery = useMedia("gallery");
  const videos = useMedia("videos");
  const setupItems: Item[] = useItems("setup").map((x) => ({
    title: x.title ?? "",
    category: x.category ?? "",
    image: x.image ?? "",
    position: "50% 50%",
    detail: (x.detail ?? "").replace(/(?:\s*[•·]\s*)?[\d,]+\+?\s+guests/gi, ""),
    alt: x.title,
  }));
  const seenImages = new Set(setupItems.map((item) => item.image));
  const all: Item[] = [
    ...setupItems,
    ...gallery
      .filter((media) => !seenImages.has(media.url))
      .map((m) => ({
        title: m.title,
        category: m.caption,
        image: m.url,
        position: "50% 50%",
        detail: m.caption,
        alt: m.alt_text || m.title,
      })),
  ];
  const categories = useItems("setup_category");
  const cats = [
    "All",
    ...new Set(
      [...categories.map((c) => c.name), ...all.map((x) => x.category)].filter(
        (name): name is string => !!name,
      ),
    ),
  ];
  const contentQuery = useAllItems();
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const [cat, setCat] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const shown = cat === "All" ? all : all.filter((x) => x.category === cat);

  return (
    <>
      <PageIntro
        eyebrow="Luxury setup & theatrics • शाही सजावट"
        title={text("setups_title", "The table becomes part of the palace.")}
        copy={text(
          "setups_copy",
          "Sculptural brass, considered lighting and live culinary moments transform service into an experience guests gather around.",
        )}
      />

      <div className="border-b border-border bg-secondary/40 px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: "Luxury Setups & Counters" }]} />
        </div>
      </div>

      <section id="gallery" className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {contentQuery.isError && (
            <QueryNotice
              retry={() => {
                void contentQuery.refetch();
              }}
            />
          )}
          <CategoryFilter
            categories={cats}
            value={cat}
            onChange={(value) => {
              setCat(value);
              setSelected(null);
            }}
          />
          <p className="mt-5 text-sm text-muted-foreground" role="status">
            {shown.length} {shown.length === 1 ? "setup" : "setups"} · Select a photo to take a
            closer look
          </p>
          {!shown.length && (
            <div className="mt-6">
              <EmptyState
                title="Your setting, your style."
                copy="No photos in this category yet. Choose another category or talk to us about your venue."
              />
            </div>
          )}
          <div className="mt-8 grid auto-rows-[310px] gap-4 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((s, i) => (
              <button
                key={s.image}
                onClick={(event) => {
                  returnFocus.current = event.currentTarget;
                  setSelected(i);
                }}
                aria-haspopup="dialog"
                className={`editorial-card group relative text-left ${i === 0 ? "lg:col-span-2" : ""}`}
              >
                <img
                  src={s.image}
                  width={1600}
                  height={1200}
                  loading="lazy"
                  alt={s.alt || `${s.title} - ${s.category} catering setup in Ajmer`}
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: s.position }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hero-ink/95 via-hero-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 text-hero-foreground">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-hero-foreground/80">
                      {s.category}
                    </span>
                    <h2 className="font-display text-3xl">{s.title}</h2>
                  </div>
                  <Expand className="shrink-0 text-hero-foreground" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {videos.length > 0 && (
        <section className="bg-muted px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase text-primary">On the ground</p>
            <h2 className="mt-3 font-display text-5xl">See our setups in motion.</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v) => (
                <figure
                  key={v.id}
                  className="overflow-hidden border border-border bg-card shadow-soft"
                >
                  <VideoPreview
                    src={v.url}
                    title={v.title || "Catering setup video"}
                  />
                  <figcaption className="p-5">
                    <p className="font-display text-2xl">{v.title}</p>
                    <p className="text-xs text-muted-foreground">{v.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-border bg-secondary/30 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase text-primary">Culinary theatre</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl">A delicious sense of occasion.</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              ["01", "Fragrant tandoor", "Breads rise and blister live before your guests."],
              ["02", "Flaming woks", "Fresh flavours finished in a flash of theatrical fire."],
              ["03", "Golden jalebi", "Crispy spirals made live in 100% pure desi ghee."],
              ["04", "Mist & mocktails", "Dramatic chilled drinks with aromatic floral garnishes."],
            ].map(([n, t, c]) => (
              <div key={n} className="border-t border-primary/50 pt-5">
                <span className="text-xs text-primary">{n}</span>
                <h3 className="mt-8 font-display text-2xl">{t}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryBanner />
      <GalleryViewer
        images={shown}
        index={selected}
        onChange={setSelected}
        onClose={() => setSelected(null)}
        returnFocus={returnFocus}
      />
    </>
  );
}
