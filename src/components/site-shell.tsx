import { Link } from "@tanstack/react-router";
import logo from "@/assets/nsattu-logo.png";
import { Instagram, MapPin, Menu, Phone, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/lib/content";

function Brand({ large = false }: { large?: boolean }) {
  return (
    <Link to="/" aria-label="N-Sattu Cuisine home" className="inline-flex items-center">
      <img
        src={logo}
        alt="N-Sattu Cuisine logo - Wedding Caterers in Ajmer"
        width={520}
        height={429}
        className={large ? "h-24 w-auto drop-shadow-sm" : "h-14 w-auto drop-shadow-sm sm:h-16"}
      />
    </Link>
  );
}

const localServiceLinks = [
  { label: "Wedding Catering Ajmer", to: "/wedding-catering-ajmer" as const },
  { label: "Wedding Catering Pushkar", to: "/wedding-catering-pushkar" as const },
  { label: "Catering in Kishangarh", to: "/catering-kishangarh" as const },
  { label: "Rajasthani Catering Ajmer", to: "/rajasthani-catering-ajmer" as const },
  { label: "Master Halwai in Ajmer", to: "/halwai-ajmer" as const },
  { label: "Catering Planning Blog", to: "/blog" as const },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 shadow-soft backdrop-blur-xl">
      <div className="hidden h-8 bg-obsidian md:block">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8 text-[10px] font-semibold tracking-wide text-primary">
          <span className="flex items-center gap-2">
            <MapPin className="size-3" />
            Ajmer, Pushkar & Kishangarh, Rajasthan
          </span>
          <span>+91 94604 26952 · +91 99506 11631 · @sattu__halwai</span>
        </div>
      </div>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[11px] font-semibold uppercase text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/blog"
            className="text-[11px] font-semibold uppercase text-muted-foreground transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Blog
          </Link>
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <a href="tel:+919460426952">
              <Phone /> Call
            </a>
          </Button>
          <Button variant="royal" size="sm" asChild>
            <Link to="/book">Book catering • बुक करें</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="regalOutline"
              size="icon"
              className="lg:hidden"
              aria-label="Open navigation"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-border bg-background overflow-y-auto">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SheetDescription className="sr-only">Explore N-Sattu Cuisine</SheetDescription>
            <div className="mb-8">
              <Brand />
            </div>
            <nav className="flex flex-col">
              {navItems.map((item, i) => (
                <SheetClose asChild key={item.to}>
                  <Link
                    to={item.to}
                    className="border-b border-border py-4 font-display text-2xl text-foreground"
                  >
                    <span className="mr-3 font-sans text-xs text-primary">0{i + 1}</span>
                    {item.label}
                    <span className="ml-3 font-sans text-xs text-muted-foreground">{item.hi}</span>
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link
                  to="/blog"
                  className="border-b border-border py-4 font-display text-2xl text-foreground"
                >
                  <span className="mr-3 font-sans text-xs text-primary">07</span>
                  Blog & Guides
                  <span className="ml-3 font-sans text-xs text-muted-foreground">लेख</span>
                </Link>
              </SheetClose>
            </nav>

            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-3">
                Service Areas
              </p>
              <div className="grid gap-2 text-xs">
                {localServiceLinks.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <Link to={link.to} className="text-muted-foreground hover:text-primary">
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>

            <Button className="mt-8 w-full" variant="royal" asChild>
              <a href="tel:+919460426952">
                <Phone /> +91 94604 26952
              </a>
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Brand large />
          <p className="mt-5 text-sm leading-7 text-muted-foreground max-w-sm">
            Royal Rajasthani wedding feasts, artisanal mithai in pure desi ghee, and theatrical live
            counters for celebrations across Ajmer, Pushkar & Kishangarh.
          </p>
          <div className="mt-5 flex gap-4">
            <a
              href="https://instagram.com/sattu__halwai"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-primary hover:text-gold transition-colors"
            >
              <Instagram />
            </a>
            <a
              href="https://youtube.com/@SattuhalwaiAjmer"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="text-primary hover:text-gold transition-colors"
            >
              <Youtube />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-5 text-xs font-bold uppercase text-berry tracking-wider">Explore</p>
          <div className="grid gap-3 text-sm">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
              Planning Blog
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-5 text-xs font-bold uppercase text-berry tracking-wider">
            Service Areas
          </p>
          <div className="grid gap-2.5 text-xs">
            {localServiceLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-5 text-xs font-bold uppercase text-berry tracking-wider">Concierge</p>
          <a className="block text-sm text-foreground font-medium" href="tel:+919460426952">
            +91 94604 26952
          </a>
          <a className="mt-2 block text-sm text-foreground font-medium" href="tel:+919950611631">
            +91 99506 11631
          </a>
          <p className="mt-3 text-xs text-muted-foreground leading-5">
            Ajmer, Pushkar & Kishangarh, Rajasthan
            <br />
            Consultations by appointment
          </p>
          <div className="mt-4">
            <Link
              to="/book"
              className="inline-block text-xs font-semibold text-primary underline underline-offset-4"
            >
              Request Catering Proposal →
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-5 py-5 text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4">
          <span>© 2026 N-Sattu Cuisine (Sattu Halwai). All rights reserved.</span>
          <span className="flex flex-wrap gap-4">
            <Link to="/wedding-catering-ajmer" className="hover:text-primary">
              Ajmer Catering
            </Link>
            <Link to="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary">
              Terms
            </Link>
            <Link to="/booking-policy" className="hover:text-primary">
              Booking policy
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

export function PageIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="palace-grid border-b border-border px-5 pb-16 pt-36 md:pt-44 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-7xl animate-rise">
        <p className="mb-5 font-display text-lg italic text-primary">{eyebrow}</p>
        <h1 className="max-w-4xl font-display text-5xl leading-none text-foreground sm:text-6xl lg:text-8xl">
          {title}
        </h1>
        <div className="mt-6 h-px w-24 bg-gold" />
        <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          {copy}
        </p>
      </div>
    </section>
  );
}
