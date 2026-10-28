import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChefHat,
  ClipboardList,
  Gem,
  MapPin,
  ShieldCheck,
  Sparkles,
  Pause,
  Play,
  Phone,
  UtensilsCrossed,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PublishedReviews } from "@/components/customer-reviews";
import { VideoPreview } from "@/components/video-preview";
import { Button } from "@/components/ui/button";
import { useItems } from "@/lib/site-items";
import { buildPageHead, buildLocalBusinessSchema } from "@/components/seo";
import { pageContentQueryOptions, siteMediaQueryOptions, useContent, useMedia } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  loader: async ({context})=>{
    const [media,content]=await Promise.all([
      context.queryClient.ensureQueryData(siteMediaQueryOptions).catch(()=>[]),
      context.queryClient.ensureQueryData(pageContentQueryOptions).catch(()=>({} as Record<string,string>)),
    ]);
    return {media,content};
  },
  head: ({loaderData})=>buildPageHead({
    title:loaderData?.content["site_title"] || "Wedding Caterers in Ajmer | N Sattu Cuisine",
    description:loaderData?.content["site_description"] || "Premier wedding caterers in Ajmer, Pushkar & Kishangarh by N Sattu Cuisine. Rajasthani banquets, mithai and live counters.",
    path:"/",ogImage:loaderData?.content["site_og_image"] || "/media/setups/illuminated-buffet-counters.jpg",structuredData:[buildLocalBusinessSchema()],
  }),
  component: Index,
});

function SectionTitle({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      <h2
        className={`mt-4 font-display text-4xl leading-tight sm:text-5xl ${light ? "text-hero-foreground" : "text-foreground"}`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-5 flex items-center justify-center gap-3">
        <span className="h-px w-14 bg-gold" />
        <span className="size-1.5 rotate-45 bg-gold" />
        <span className="h-px w-14 bg-gold" />
      </div>
      {copy && (
        <p
          className={`mx-auto mt-5 max-w-2xl leading-7 ${light ? "text-hero-foreground/75" : "text-muted-foreground"}`}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

function ImageCard({
  image,
  title,
  label,
  to,
  position = "50% 50%",
  tall = false,
}: {
  image: string;
  title: string;
  label?: string;
  to: "/menus" | "/setups" | "/about" | "/book";
  position?: string;
  tall?: boolean;
}) {
  return (
    <Link
      to={to}
      className="group block overflow-hidden rounded-lg border border-border bg-card"
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        className={`w-full object-cover ${tall ? "aspect-[3/4]" : "aspect-[4/5]"}`}
        style={{ objectPosition: position }}
      />
      <div className="border-t border-border p-5 text-primary">
        {label && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{label}</p>
        )}
        <h3 className="mt-2 font-display text-2xl leading-tight">{title}</h3>
        <span className="mt-3 inline-flex items-center gap-2 border-b border-gold pb-1 text-xs font-semibold uppercase tracking-widest text-gold">
          Explore more{" "}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

const process = [
  [
    ClipboardList,
    "01",
    "Plan • योजना",
    "We meet your family, understand every function and suggest a menu that fits your guests and budget.",
  ],
  [
    UtensilsCrossed,
    "02",
    "Taste • चखें",
    "Visit our Ajmer kitchen for a tasting session and fine-tune every dish before the big day.",
  ],
  [
    ChefHat,
    "03",
    "Serve • परोसें",
    "Our halwais, chefs and staff set up, cook live and serve with royal hospitality till the last guest.",
  ],
] as const;

function Index() {
  const initialMedia = Route.useLoaderData().media;
  const heroMedia = useMedia("hero", initialMedia);
  const signatures = useMedia("signatures", initialMedia);
  const journey = useMedia("journey", initialMedia);
  const videos = useMedia("videos", initialMedia);
  const text = useContent();
  const dishes = useItems("dish");
  const setups = useItems("setup");
  const faqs = useItems("faq").map((f) => [f.q ?? "", f.a ?? ""] as const);
  const destinations = useItems("destination").map((x) => [x.place, x.hi, x.image] as const);
  const serviceIcons = [Gem, Sparkles, ChefHat, ShieldCheck];
  const heroImages = heroMedia.filter((m) => m.media_type === "image");
  const slides = heroImages.length
    ? heroImages.map((m) => m.url)
    : ["/media/home/rajasthani-thali.webp", "/media/home/live-food-counter.webp", "/media/home/catering-hospitality.webp"];
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(true);
  // Live CMS content may replace the fallback slides with a shorter collection.
  const activeSlide = slide % slides.length;
  useEffect(() => {
    if (
      paused ||
      slides.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setSlide((value) => (value + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [slides.length, paused]);
  const featured = signatures.length
    ? signatures.slice(0, 3).map((m) => ({
        key: m.id,
        image: m.url,
        title: m.title || "Chef signature",
        label: m.caption || "Signature mithai",
        alt: m.alt_text || m.title || "Signature cuisine",
        position: "50% 50%",
      }))
    : dishes.slice(0, 3).map((d) => ({
        key: d.title ?? "",
        image: d.image ?? "",
        title: d.title ?? "",
        label: d.local ?? "",
        alt: d.title ?? "Cuisine",
        position: "50% 50%",
      }));
  const services = useItems("service").map(
    (x, i) => [serviceIcons[i % 4] ?? Gem, x.title, x.hi, x.image, x.description] as const,
  );
  return (
    <div className="home-page">
      <section className="home-hero mt-20 md:mt-28" aria-label="Wedding catering in Rajasthan">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
          <div>
            <p className="home-location text-xs font-semibold uppercase tracking-[0.22em] text-berry">
              Ajmer · Pushkar · Kishangarh
            </p>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {text("home_eyebrow", "Royal Wedding & Event Catering Specialist")}
            </p>
            <h1 className="mt-5 max-w-xl font-display text-6xl leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
              {text("home_title", "The Art of Royal Catering.")}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground">
              {text(
                "home_subtitle",
                "Authentic Rajasthani feasts, handcrafted mithai and live food counters. Thoughtfully prepared for your family’s most cherished celebrations.",
              )}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="royal" size="lg" className="h-12 px-6" asChild>
                <Link to="/book">
                  {text("home_primary_cta", "Plan your celebration")} <ArrowRight />
                </Link>
              </Button>
              <Button variant="regalOutline" size="lg" className="h-12 px-6" asChild>
                <Link to="/menus">{text("home_secondary_cta", "Explore our menus")}</Link>
              </Button>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-2">
                <ChefHat className="size-4 text-berry" /> Family-led hospitality
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-berry" /> Jain options available
              </span>
            </div>
          </div>
          <div className="relative min-w-0">
            <div className="home-hero-frame relative aspect-[4/5] max-h-[620px] overflow-hidden bg-secondary shadow-lift">
              <img
                key={slides[activeSlide]}
                src={slides[activeSlide]}
                alt={
                  heroImages[activeSlide]?.title ||
                  [
                    "Traditional Rajasthani celebration thali",
                    "Freshly prepared live food counter",
                    "Warm hospitality at a N-Sattu Cuisine celebration",
                  ][activeSlide]
                }
                width={900}
                height={1125}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="size-full object-cover"
                onError={(event) => {
                  if (!event.currentTarget.src.endsWith("/media/home/rajasthani-thali.webp"))
                    event.currentTarget.src = "/media/home/rajasthani-thali.webp";
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-hero-ink/90 to-transparent px-7 pb-7 pt-20 text-hero-foreground">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-hero-foreground/80">
                  From our kitchen to your celebration
                </p>
                <p className="mt-2 font-display text-3xl">Made with care. Served with warmth.</p>
              </div>
            </div>
            <span className="home-photo-seal" aria-hidden="true">N-SATTU<span>CUISINE</span></span>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">A taste of N-Sattu Cuisine</span>
              <div className="flex items-center" role="group" aria-label="Featured photos">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    aria-label={`Show photo ${index + 1}`}
                    aria-pressed={activeSlide === index}
                    onClick={() => {
                      setSlide(index);
                      setPaused(true);
                    }}
                    className="grid size-10 place-items-center"
                  >
                    <span
                      className={`h-1.5 rounded-full ${activeSlide === index ? "w-6 bg-berry" : "w-1.5 bg-border"}`}
                    />
                  </button>
                ))}
                {slides.length > 1 && (
                  <button
                    className="grid size-10 place-items-center text-berry"
                    aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                    onClick={() => setPaused(!paused)}
                  >
                    {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="border-y border-border bg-secondary px-5 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm">
          <p>
            <span className="font-semibold">Your occasion, your menu.</span>{" "}
            <span className="text-muted-foreground">
              Weddings, family functions & private celebrations.
            </span>
          </p>
          <a
            href="tel:+919460426952"
            className="inline-flex items-center gap-2 font-semibold text-berry"
          >
            <Phone className="size-4" /> Talk to our team <ArrowRight className="size-4" />
          </a>
        </div>
      </div>

      <nav aria-label="Explore our celebrations" className="home-highlights mx-auto grid max-w-3xl grid-cols-3 gap-x-6 gap-y-8 px-6 py-12 sm:grid-cols-5 sm:py-16">
        <Link to="/reviews"><span><Gem className="size-7" aria-hidden="true" /></span>Customer stories</Link>
        <Link to="/setups"><span><Sparkles className="size-7" aria-hidden="true" /></span>Weddings</Link>
        <Link to="/menus"><span><ChefHat className="size-7" aria-hidden="true" /></span>Our food</Link>
        <Link to="/menus"><span><UtensilsCrossed className="size-7" aria-hidden="true" /></span>The menu</Link>
        <Link to="/setups" hash="gallery"><span><MapPin className="size-7" aria-hidden="true" /></span>Events & setups</Link>
      </nav>

      <section className="border-b border-border bg-background px-6 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="mx-auto w-full max-w-[384px] overflow-hidden rounded-lg border border-border bg-card p-3">
            <VideoPreview
              src="/media/home/our-story.mp4"
              poster="/media/home/our-story-brass-display-poster.webp"
              title="N-Sattu Cuisine catering and hospitality"
            />
            <div className="mt-3 border-l-2 border-gold bg-background p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Authentic & Heritage • प्रामाणिक परंपरा
              </p>
              <p className="mt-2 font-display text-2xl">Ajmer • Pushkar • Kishangarh</p>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Our story • हमारी कहानी
            </p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
              {text("home_story_title", "A family-led legacy of royal hospitality.")}
            </h2>
            <div className="mt-5 h-px w-20 bg-gold" />
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
              {text("home_story_copy", "At N SATTU CUISINE, we take pride in serving authentic, home-style flavors that have               been passed down through generations. We are committed to making every event memorable               with delectable dishes crafted from the finest ingredients and unmatched service               tailored to your needs.")}
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              <div className="border-l-2 border-gold bg-secondary p-4">
                <p className="text-[11px] font-semibold uppercase text-primary">
                  Founder • संस्थापक
                </p>
                <h3 className="mt-2 font-display text-xl">Nathu Ji Prajapati</h3>
                <p className="mt-1 text-xs text-muted-foreground">Culinary Traditions</p>
              </div>
              <div className="border-l-2 border-gold bg-secondary p-4">
                <p className="text-[11px] font-semibold uppercase text-primary">
                  Managing Director • MD
                </p>
                <h3 className="mt-2 font-display text-xl">Satyanarayan Prajapati</h3>
                <p className="mt-1 text-xs text-muted-foreground">Quality & Authenticity</p>
              </div>
              <div className="border-l-2 border-gold bg-secondary p-4">
                <p className="text-[11px] font-semibold uppercase text-primary">
                  CEO • मुख्य कार्यकारी
                </p>
                <h3 className="mt-2 font-display text-xl">Chanchal Prajapati</h3>
                <p className="mt-1 text-xs text-muted-foreground">Exquisite Celebrations</p>
              </div>
            </div>
            <Button variant="regalOutline" className="mt-8" asChild>
              <Link to="/about">
                Read our heritage <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <PublishedReviews featured />
      <section className="bg-secondary px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">A taste of our world</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">Food. Festivities. Fine details.</h2></div>
            <Button variant="regalOutline" asChild><a href="https://www.instagram.com/sattu__halwai/" target="_blank" rel="noreferrer">Explore our Instagram <ArrowRight /></a></Button>
          </div>
          <div className="home-social-grid grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            <Link to="/menus"><img src={featured[0]?.image || "/media/menus/mithai/rose-mawa-cups.webp"} alt={featured[0]?.alt || "Small bites prepared for a celebration"} loading="lazy" /><span>Crafted to delight</span></Link>
            <Link to="/menus"><img src={featured[1]?.image || "/media/menus/mithai/signature-mithai-platter.webp"} alt={featured[1]?.alt || "Handcrafted festive mithai"} loading="lazy" /><span>A little sweetness</span></Link>
            <Link to="/setups"><img src={setups[0]?.image || "/media/setups/illuminated-buffet-counters.jpg"} alt={setups[0]?.title || "Wedding buffet presentation"} loading="lazy" /><span>Set for celebration</span></Link>
            <Link to="/about"><img src="/media/home/catering-hospitality.webp" alt="The care behind our catering service" loading="lazy" /><span>Served with warmth</span></Link>
          </div>
        </div>
      </section>
      <section className="px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Signature creations • खास पकवान"
            title={text("home_signature_title", "Crafted for the royal table.")}
            copy={text("home_signature_copy", "Discover our mithai, celebration plates and live-counter favourites. Discuss your preferences with our team.")}
          />
          <div className={`mx-auto mt-10 grid gap-6 ${featured.length < 3 ? "max-w-4xl sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {featured.map((f) => (
              <ImageCard
                key={f.key}
                to="/menus"
                image={f.image}
                title={f.title}
                label={f.label}
                position={f.position}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Our services • हमारी सेवाएँ"
            title={text("home_services_title", "Everything your celebration needs.")}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(([Icon, title, hi, image, description]) => (
              <Link
                key={title}
                to="/setups"
                className="group overflow-hidden border border-border bg-card shadow-soft transition-shadow hover:shadow-lift"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <Icon className="size-5 text-gold" />
                  <h3 className="mt-3 font-display text-2xl">{title}</h3>
                  <p className="text-sm text-berry">{hi}</p>
                  {description && <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{description}</p>}
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                    Explore more <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="How we work • कैसे काम करते हैं" title="Plan. Taste. Serve." />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {process.map(([Icon, num, title, copy]) => (
              <div key={num} className="text-center">
                <span className="mx-auto grid size-16 place-items-center rounded-full border border-gold bg-background text-primary">
                  <Icon className="size-6" />
                </span>
                <p className="mt-5 font-display text-sm text-gold">{num}</p>
                <h3 className="mt-1 font-display text-3xl">{title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-muted-foreground">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Gallery • सजावट और लाइव काउंटर"
            title={text("home_gallery_title", "Luxury setups & live theatrics.")}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {setups.slice(0, 6).map((setup) => (
              <Link
                key={setup.title}
                to="/setups"
                className="group overflow-hidden rounded-lg border border-border bg-card"
              >
                <img
                  src={setup.image}
                  alt={setup.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="border-t border-border p-5 text-primary">
                  <p className="text-[10px] uppercase tracking-widest text-gold">
                    {setup.category}
                  </p>
                  <h3 className="font-display text-2xl">{setup.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          {journey.length > 0 && (
            <div className="mt-20">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                Real weddings, real plates • शादी का हर भोज
              </p>
              <div className="mt-8 flex snap-x gap-5 overflow-x-auto pb-4">
                {journey.map((m) => (
                  <figure key={m.id} className="w-60 shrink-0 snap-start">
                    <img
                      src={m.url}
                      alt={m.alt_text || m.title}
                      loading="lazy"
                      className="aspect-square w-full object-cover"
                    />
                    <figcaption className="mt-3 font-display text-xl">{m.title}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}
          {videos.length > 0 && (
            <div className="mt-20">
              <SectionTitle
                eyebrow="Live moments • असली झलक"
                title="See our celebrations in motion."
              />
              <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                  <figure
                    key={video.id}
                    className="overflow-hidden border border-border bg-card shadow-soft"
                  >
                    <VideoPreview
                      src={video.url}
                      title={video.title || "Celebration video"}
                    />
                    <figcaption className="p-5">
                      <h3 className="font-display text-2xl">{video.title}</h3>
                      {video.caption && (
                        <p className="mt-1 text-sm text-muted-foreground">{video.caption}</p>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}
          <div className="mt-10 text-center">
            <Button variant="regalOutline" asChild>
              <Link to="/setups">
                View full gallery <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Where we serve • अजमेर, पुष्कर, किशनगढ़"
            title={text("home_areas_title", "Celebrations across our home region.")}
            copy="Tailored wedding catering, authentic halwai bhattis, and live palatial buffet staging across Ajmer, Pushkar, and Kishangarh."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {destinations.map(([place, hi]) => {
              const destinationHref =
                place === "Ajmer"
                  ? ("/wedding-catering-ajmer" as const)
                  : place === "Pushkar"
                    ? ("/wedding-catering-pushkar" as const)
                    : ("/catering-kishangarh" as const);
              return (
                <Link
                  key={place}
                  to={destinationHref}
                  className="location-card group"
                >
                  <span className="location-card-ornament" aria-hidden="true"><span />◆<span /></span>
                  <h3 className="font-display text-4xl sm:text-5xl">{place}</h3>
                  <p className="mt-3 text-base text-muted-foreground" lang="hi">{hi}</p>
                  <ArrowRight className="location-card-arrow" aria-hidden="true" />
                </Link>
              );
            })}
          </div>

          <div className="mt-12 rounded-sm border border-gold/30 bg-background/80 p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                  Regional Specialty Services
                </p>
                <h3 className="mt-1 font-display text-2xl">
                  Specialized Culinary & Halwai Services
                </h3>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Whether you need a dedicated master halwai bhatti or a traditional seated Marwari
                  banquet, explore our dedicated services:
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/rajasthani-catering-ajmer">Rajasthani Thaal Menus</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/halwai-ajmer">Master Halwai in Ajmer</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/wedding-catering-ajmer">Ajmer Wedding Caterers</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/wedding-catering-pushkar">Pushkar Resort Catering</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/catering-kishangarh">Kishangarh Event Catering</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/blog">Wedding Planning Guides</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-enquiry relative overflow-hidden bg-secondary px-6 py-24">
        <img
          src="/media/setups/wedding-buffet-backdrop.jpg"
          loading="lazy"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Enquiry • पूछताछ
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-hero-foreground sm:text-5xl">
              {text("home_booking_title", "Start planning your royal feast.")}
            </h2>
            <p className="mt-5 leading-7 text-hero-foreground/75">
              {text("home_booking_copy", "Share your event details through our booking form. Our team will review your requirements and contact you.")}
            </p>
          </div>
          <div className="border border-gold/30 bg-background p-8 shadow-lift sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Booking enquiry • बुकिंग पूछताछ
            </p>
            <h3 className="mt-4 font-display text-3xl">Tell us about your celebration.</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Submit the event date, location, guest count, menu preferences and your contact
              details in one secure form.
            </p>
            <Button variant="royal" size="lg" className="mt-7 w-full" asChild>
              <Link to="/book">
                {text("home_booking_cta", "Open booking form")} <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="Questions • सवाल-जवाब" title="Frequently asked." />
          <Accordion type="single" collapsible className="mt-12">
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="font-display text-xl hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="leading-7 text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 text-center">
            <Button variant="regalOutline" asChild>
              <Link to="/reviews">More planning questions</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Why choose us • हमें क्यों चुनें"
            title="Royal wedding catering in Ajmer, Pushkar & Kishangarh."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              [
                "Pure ingredients",
                "Discuss ingredients, dietary preferences and preparation with our team when planning your menu.",
              ],
              [
                "Master halwais",
                "Discuss traditional Marwari and Rajasthani dishes with Satyanarayan Prajapati and the team.",
              ],
              [
                "Complete setup",
                "Brass & copper serveware, lit buffet counters and trained staff — we bring everything your venue needs.",
              ],
            ].map(([t, c]) => (
              <div key={t} className="border-t-2 border-gold bg-background p-7 shadow-soft">
                <h3 className="font-display text-2xl">{t}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{c}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="royal" size="lg" asChild>
              <Link to="/about">
                Discover our story <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
