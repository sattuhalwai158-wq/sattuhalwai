import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageIntro } from "@/components/site-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryFilter, EmptyState, EnquiryBanner, QueryNotice } from "@/components/page-sections";
import { useItems, useAllItems } from "@/lib/site-items";
import { buildPageHead, buildBreadcrumbSchema } from "@/components/seo";

export const Route = createFileRoute("/menus")({
  head: () =>
    buildPageHead({
      title: "Wedding Catering Menus Ajmer | Rajasthani & Multi-Cuisine | N Sattu Cuisine",
      description:
        "Explore royal wedding catering menus in Ajmer: pure desi ghee mithai, traditional Marwari thaal, live counters, and multi-cuisine banquets. Jain menus available.",
      path: "/menus",
      ogImage: "/media/menus/mithai/rose-mithai-platter.jpg",
      structuredData: [buildBreadcrumbSchema([{ name: "Catering Menus", path: "/menus" }])],
    }),
  component: Menus,
});

type Dish = {
  title: string;
  local: string;
  category: string;
  description: string;
  tags: string[];
  pairing: string;
  image: string;
  position: string;
};

function Menus() {
  const dishes: Dish[] = useItems("dish").map((d) => ({
    title: d.title ?? "",
    local: d.local ?? "",
    category: d.category ?? "",
    description: d.description ?? "",
    pairing: d.pairing ?? "",
    image: d.image ?? "",
    position: "50% 50%",
    tags: (d.tags ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  }));
  const categories = useItems("menu_category");
  const cats = [
    "All",
    ...new Set(
      [...categories.map((c) => c.name), ...dishes.map((d) => d.category)].filter(
        (name): name is string => !!name,
      ),
    ),
  ];
  const contentQuery = useAllItems();
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const [cat, setCat] = useState("All");
  const [selected, setSelected] = useState<Dish | null>(null);
  const shown = cat === "All" ? dishes : dishes.filter((x) => x.category === cat);

  return (
    <>
      <PageIntro
        eyebrow="Curated menus • स्वादिष्ट पकवान"
        title="A feast composed around your celebration."
        copy="Heritage recipes, globally inspired banquets and live culinary theatre—each wedding menu is tailored after a personal tasting."
      />

      <div className="border-b border-border bg-secondary/40 px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: "Catering Menus" }]} />
        </div>
      </div>

      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {contentQuery.isError && (
            <QueryNotice
              retry={() => {
                void contentQuery.refetch();
              }}
            />
          )}
          <CategoryFilter categories={cats} value={cat} onChange={setCat} />
          <p className="mt-5 text-sm text-muted-foreground" role="status">
            {shown.length} {shown.length === 1 ? "dish" : "dishes"}
            {cat !== "All" ? ` · ${cat}` : " · Find a favourite for your menu"}
          </p>
          {!shown.length && (
            <div className="mt-6">
              <EmptyState
                title="Let’s create your menu together."
                copy="There are no dishes in this selection yet. Explore another category or ask our team about a custom menu."
              />
            </div>
          )}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((d) => (
              <button
                key={d.title}
                onClick={(event) => {
                  returnFocus.current = event.currentTarget;
                  setSelected(d);
                }}
                aria-haspopup="dialog"
                className="editorial-card group text-left"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={d.image}
                    width={1600}
                    height={1200}
                    loading="lazy"
                    alt={`${d.title} - ${d.local} wedding catering dish`}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: d.position }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {d.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-primary/30 px-2 py-1 text-[9px] font-bold uppercase text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 font-display text-3xl">{d.title}</h2>
                  <p className="text-sm text-primary">{d.local}</p>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{d.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase text-primary">
                    Tasting notes <ArrowRight className="size-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-8">
            <div>
              <h2 className="font-display text-3xl">Need a menu composed for you?</h2>
              <p className="text-sm text-muted-foreground">
                Tell us about your guests, traditions and venue.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="royal" asChild>
                <Link to="/book">Request a custom menu</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/rajasthani-catering-ajmer">Rajasthani Thaal Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <EnquiryBanner />
      <Dialog
        open={!!selected}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
      >
        <DialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            returnFocus.current?.focus();
          }}
          className="border-primary/30 bg-background p-0 sm:max-w-2xl"
        >
          {selected && (
            <>
              <img
                src={selected.image}
                width={1600}
                height={1200}
                alt={selected.title}
                className="h-[30svh] w-full object-contain bg-secondary sm:h-72"
                style={{ objectPosition: selected.position }}
              />
              <div className="p-7">
                <DialogHeader>
                  <DialogTitle className="font-display text-4xl">{selected.title}</DialogTitle>
                  <DialogDescription className="text-primary">
                    {selected.local} • {selected.category}
                  </DialogDescription>
                </DialogHeader>
                <p className="mt-5 leading-7 text-muted-foreground">{selected.description}</p>
                <div className="mt-6 border-l-2 border-primary pl-4">
                  <span className="text-xs font-bold uppercase text-primary">
                    Pairs beautifully with
                  </span>
                  <p className="mt-1">{selected.pairing}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
