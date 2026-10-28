import { Link } from "@tanstack/react-router";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CategoryFilter({
  categories,
  value,
  onChange,
}: {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter by category">
      {categories.map((category) => (
        <Button
          key={category}
          type="button"
          variant={value === category ? "royal" : "outline"}
          aria-pressed={value === category}
          onClick={() => onChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
export function EmptyState({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-secondary/40 p-7 text-center sm:p-12">
      <UtensilsCrossed className="mx-auto size-7 text-primary" />
      <h2 className="mt-4 font-display text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-muted-foreground">{copy}</p>
    </div>
  );
}
export function EnquiryBanner() {
  return (
    <section className="border-y border-border bg-secondary px-5 py-14 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Prepared around you
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl sm:text-4xl">
            A celebration deserves a personal conversation.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            Tell us about your guests, your venue and the flavours you love.
          </p>
        </div>
        <Button variant="royal" size="lg" asChild>
          <Link to="/book">
            Plan your event <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
export function QueryNotice({ retry }: { retry: () => void }) {
  return (
    <div
      role="alert"
      className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-secondary p-4 text-sm"
    >
      <p>Live updates couldn’t be loaded. Some content may be unavailable.</p>
      <Button type="button" variant="outline" onClick={retry}>
        Try again
      </Button>
    </div>
  );
}
