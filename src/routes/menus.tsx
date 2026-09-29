import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
import { useItems } from "@/lib/site-items";
import { buildPageHead, buildBreadcrumbSchema } from "@/components/seo";

export const Route = createFileRoute("/menus")({
  head: () =>
    buildPageHead({
      title: "Wedding Catering Menus Ajmer | Rajasthani & Multi-Cuisine | N Sattu Cuisine",
      description:
        "Explore royal wedding catering menus in Ajmer: pure desi ghee mithai, traditional Marwari thaal, live counters, and multi-cuisine banquets. Jain menus available.",
      path: "/menus",
      ogImage: "/media/sweet-rose-platter.jpg",
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
  const cats = ["All", ...useItems("menu_category").map((c) => c.name ?? "")];
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
          <div className="flex gap-2 overflow-x-auto pb-4">
            {cats.map((x) => (
              <Button
                key={x}
                variant={cat === x ? "royal" : "outline"}
                size="sm"
                onClick={() => setCat(x)}
              >
                {x}
              </Button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((d) => (
              <button
                key={d.title}
                onClick={() => setSelected(d)}
                className="group overflow-hidden border border-border bg-card text-left transition-colors hover:border-primary/60"
              >
                <div className="h-72 overflow-hidden">
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

      <Dialog
        open={!!selected}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
      >
        <DialogContent className="overflow-hidden border-primary/30 bg-background p-0 sm:max-w-2xl">
          {selected && (
            <>
              <img
                src={selected.image}
                width={1600}
                height={1200}
                alt={selected.title}
                className="h-72 w-full object-cover"
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
