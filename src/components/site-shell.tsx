import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Menu, Phone, Youtube, ArrowRight } from "lucide-react";
const logo = "/media/brand-logo.webp";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSiteSettings } from "@/lib/site-settings";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Our story", to: "/about" },
  { label: "Menus", to: "/menus" },
  { label: "Catering setups", to: "/setups" },
  { label: "Reviews & FAQ", to: "/reviews" },
] as const;
const serviceLinks = [
  ["Ajmer weddings", "/wedding-catering-ajmer"],
  ["Pushkar weddings", "/wedding-catering-pushkar"],
  ["Kishangarh catering", "/catering-kishangarh"],
  ["Rajasthani cuisine", "/rajasthani-catering-ajmer"],
  ["Traditional halwai", "/halwai-ajmer"],
] as const;

function Brand() {
  return (
    <Link to="/" aria-label="N-Sattu Cuisine home" className="flex shrink-0 items-center gap-3">
      <img src={logo} alt="" width={520} height={429} className="h-14 w-auto" />
      <span className="hidden sm:block">
        <span className="block font-display text-xl font-semibold text-primary">
          N-Sattu Cuisine
        </span>
        <span className="block text-[9px] uppercase tracking-[.2em] text-muted-foreground">
          The warmth of Rajasthan
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const business = useSiteSettings();
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
      <div className="hidden h-8 bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8 text-[11px]">
          <span className="flex items-center gap-2">
            <MapPin className="size-3" />
            {business.location}
          </span>
          <a
            href={`tel:${business.telephone.replace(/\s/g, "")}`}
            className="inline-flex h-8 items-center gap-2"
          >
            <Phone className="size-3" />
            {business.telephone}
          </a>
        </div>
      </div>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="py-3 text-xs font-semibold text-muted-foreground hover:text-primary"
              activeProps={{ className: "text-primary underline underline-offset-8" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/setups"
            hash="gallery"
            className="py-3 text-xs font-semibold text-muted-foreground hover:text-primary"
          >
            Gallery
          </Link>
          <Link
            to="/book"
            hash="contact"
            className="py-3 text-xs font-semibold text-muted-foreground hover:text-primary"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="royal" asChild className="hidden sm:inline-flex">
            <Link to="/book">
              Plan your event <ArrowRight />
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="xl:hidden"
                aria-label="Open navigation"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto bg-background p-6">
              <SheetTitle className="font-display text-2xl text-primary">
                N-Sattu Cuisine
              </SheetTitle>
              <SheetDescription>Explore our cuisine and plan your celebration.</SheetDescription>
              <nav aria-label="Mobile navigation" className="mt-5 flex flex-col">
                {navigation.map((item) => (
                  <SheetClose key={item.to} asChild>
                    <Link
                      to={item.to}
                      activeOptions={{ exact: item.to === "/" }}
                      activeProps={{ className: "text-primary" }}
                      className="border-b border-border py-4 font-display text-2xl"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    to="/setups"
                    hash="gallery"
                    className="border-b border-border py-4 font-display text-2xl"
                  >
                    Gallery
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/book"
                    hash="contact"
                    className="border-b border-border py-4 font-display text-2xl"
                  >
                    Contact
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/blog" className="border-b border-border py-4 font-display text-2xl">
                    Planning journal
                  </Link>
                </SheetClose>
              </nav>
              <SheetClose asChild>
                <Button variant="royal" className="mt-6" asChild>
                  <Link to="/book">
                    Plan your event <ArrowRight />
                  </Link>
                </Button>
              </SheetClose>
              <a
                href={`tel:${business.telephone.replace(/\s/g, "")}`}
                className="mt-6 flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
              >
                <Phone className="size-4" />
                {business.telephone}
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const business = useSiteSettings();
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:px-8">
        <div>
          <Brand />
          <p className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">
            {business.footerCopy}
          </p>
          <div className="mt-4 flex gap-2">
            {business.socialLinks.instagram && <a href={business.socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-11 place-items-center text-primary"><Instagram /></a>}
            {business.socialLinks.youtube && <a href={business.socialLinks.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="grid size-11 place-items-center text-primary"><Youtube /></a>}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary">Explore</h2>
          <nav aria-label="Footer navigation" className="mt-4 grid text-sm text-muted-foreground">
            {navigation.slice(1).map((item) => (
              <Link key={item.to} to={item.to} className="py-2.5 hover:text-primary">
                {item.label}
              </Link>
            ))}
            <Link to="/blog" className="py-2.5 hover:text-primary">
              Planning journal
            </Link>
            <Link to="/setups" hash="gallery" className="py-2.5 hover:text-primary">
              Gallery
            </Link>
          </nav>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary">Our region</h2>
          <nav aria-label="Catering services" className="mt-4 grid text-sm text-muted-foreground">
            {serviceLinks.map(([label, to]) => (
              <Link key={to} to={to} className="py-2.5 hover:text-primary">
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary">{business.footerHeading}</h2>
          {[business.telephone, business.secondaryTelephone].filter(Boolean).map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="mt-3 flex min-h-11 items-center font-semibold text-primary"
            >
              {phone}
            </a>
          ))}
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {business.location}
          </p>
          {business.email && <a className="mt-3 block break-all text-sm text-primary underline" href={`mailto:${business.email}`}>{business.email}</a>}
          <Button variant="regalOutline" className="mt-5" asChild>
            <Link to="/book">
              Discuss your event <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
      <div className="border-t border-border px-5 py-5 text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} N-Sattu Cuisine (Sattu Halwai).</span>
          <nav aria-label="Legal" className="flex flex-wrap gap-5">
            <Link to="/privacy" className="py-3 hover:text-primary">
              Privacy
            </Link>
            <Link to="/terms" className="py-3 hover:text-primary">
              Terms
            </Link>
            <Link to="/booking-policy" className="py-3 hover:text-primary">
              Booking policy
            </Link>
          </nav>
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
    <section className="page-intro border-b border-border px-5 pb-12 pt-32 md:pb-16 md:pt-44 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[.16em] text-primary">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl font-display text-foreground">{title}</h1>
        <div className="mt-6 h-px w-20 bg-gold" />
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          {copy}
        </p>
      </div>
    </section>
  );
}
