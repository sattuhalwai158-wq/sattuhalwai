import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ShieldCheck, Wheat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site-shell";
import { images } from "@/lib/content";
import { pageMeta } from "@/components/seo";
import { useMedia } from "@/lib/site-data";

const founders = [
  {
    name: "NATHU JI PRAJAPATI",
    nameHi: "नाथू जी प्रजापति",
    role: "FOUNDER",
    roleHi: "संस्थापक",
    quote:
      "“N SATTU CUISINE carries forward the legacy of our family’s culinary traditions, crafting dishes that reflect the richness of our heritage.”",
  },
  {
    name: "SATYANARAYAN PRAJAPATI",
    nameHi: "सत्यनारायण प्रजापति",
    role: "MANAGING DIRECTOR",
    roleHi: "प्रबंध निदेशक",
    quote:
      "“With a focus on quality and authenticity, N SATTU CUISINE creates memorable dining experiences that connect loved ones and enrich every occasion.”",
  },
  {
    name: "CHANCHAL PRAJAPATI",
    nameHi: "चंचल प्रजापति",
    role: "CEO",
    roleHi: "मुख्य कार्यकारी अधिकारी",
    quote:
      "“N SATTU CUISINE is dedicated to crafting exquisite dishes that bring people together, ensuring that every celebration is as unique as our clients.”",
  },
];

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About Us & Founders | N-Sattu Cuisine",
      "Discover N Sattu Cuisine’s authentic home-style flavors passed down through generations and our visionary founders."
    ),
  component: About,
});

function About() {
  const journey = useMedia("journey");
  const locations = [
    { city: "Ajmer", hi: "अजमेर" },
    { city: "Pushkar", hi: "पुष्कर" },
    { city: "Kishangarh", hi: "किशनगढ़" },
  ];

  return (
    <>
      <PageIntro
        eyebrow="Our royal heritage • हमारी विरासत"
        title="A legacy tempered over generations."
        copy="At N SATTU CUISINE, we take pride in serving authentic, home-style flavors that have been passed down through generations, crafting exquisite dishes for grand weddings and intimate celebrations."
      />

      {/* ABOUT US SECTION */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="relative min-h-[500px] overflow-hidden border border-gold/30 bg-secondary p-3">
            <img
              src={images.masterHalwai}
              width={1408}
              height={1600}
              loading="lazy"
              alt="N-Sattu Cuisine team preparing a royal catering setup"
              className="size-full object-cover"
            />
            <div className="absolute inset-x-8 bottom-8 border-l-2 border-gold bg-background/95 p-5 shadow-soft">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Authentic & Heritage • प्रामाणिक परंपरा
              </p>
              <p className="mt-1 font-display text-2xl">Ajmer • Pushkar • Kishangarh</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">About Us • हमारे बारे में</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Authentic, home-style flavors passed down through generations.
            </h2>
            <div className="mt-5 h-px w-20 bg-gold" />
            <p className="mt-7 text-lg leading-8 text-muted-foreground">
              At N SATTU CUISINE, we take pride in serving authentic, home-style flavors that have been passed down through generations. We are committed to making every event memorable with delectable dishes crafted from the finest ingredients. Whether it's a grand wedding, a corporate gathering, or an intimate celebration, we deliver exceptional food and unmatched service, tailored to your needs.
            </p>
            <blockquote className="mt-6 border-l-2 border-gold bg-secondary/50 p-5 font-display text-xl italic text-foreground">
              “Let us make your special moments even more delightful with our exquisite cuisine!”
            </blockquote>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                [ShieldCheck, "Trust in every process"],
                [Wheat, "Ingredients without compromise"],
              ].map(([Icon, t]) => {
                const I = Icon as typeof ShieldCheck;
                return (
                  <div key={String(t)} className="border-l border-primary bg-background p-5 shadow-soft">
                    <I className="text-primary" />
                    <p className="mt-4 font-display text-2xl">{String(t)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS SECTION */}
      <section className="border-y border-border bg-secondary px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Founders • संस्थापक</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">FOUNDERS</h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gold" />
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Carrying forward the richness of culinary heritage with authenticity, passion, and perfection.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="relative flex flex-col justify-between border-t-2 border-gold bg-background p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold tracking-wider text-primary">
                      {founder.role}
                    </span>
                    <span className="text-xs font-medium text-berry">{founder.roleHi}</span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl tracking-wide sm:text-3xl">
                    {founder.name}
                  </h3>

                  <div className="mt-6">
                    <span className="font-display text-4xl leading-none text-gold select-none">“</span>
                    <blockquote className="mt-1 text-base italic leading-7 text-muted-foreground">
                      {founder.quote.replace(/^[“”"]|[“”"]$/g, "")}
                    </blockquote>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <span className="font-semibold uppercase tracking-widest text-gold">N Sattu Cuisine</span>
                  <span>{founder.nameHi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-bold uppercase text-primary">Our philosophy</p>
          <h2 className="mt-4 font-display text-5xl">स्वाद और विश्वास</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Taste with trust means strict hygiene, non-adulterated dairy, in-house slow-roasted mawa, Californian almonds and Afghani anjeer—handled with reverence.
          </p>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              "Separate pure Jain cooking units",
              "Daily small-batch mawa roasting",
              "Brass cauldrons & traditional technique",
            ].map((x) => (
              <div key={x} className="border border-border p-8 font-display text-2xl">
                {x}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL CELEBRATIONS / JOURNEY */}
      {journey.length > 0 && (
        <section className="bg-muted px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-center text-xs font-bold uppercase text-primary">
              Real celebrations • असली आयोजन
            </p>
            <h2 className="mt-4 text-center font-display text-5xl">
              From the first breakfast to the farewell.
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {journey.map((media) => (
                <figure key={media.url} className="bg-card p-3 shadow-soft">
                  <img
                    src={media.url}
                    alt={media.title}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                  <figcaption className="p-3">
                    <h3 className="font-display text-2xl">{media.title}</h3>
                    {media.caption && (
                      <p className="mt-1 text-sm text-muted-foreground">{media.caption}</p>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LOCATIONS SECTION */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase text-primary">Where we serve • हमारी सेवाएँ</p>
          <h2 className="mt-3 font-display text-5xl">Ajmer, Pushkar & Kishangarh.</h2>
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {locations.map(({ city, hi }) => (
              <div key={city} className="bg-background p-7">
                <MapPin className="size-4 text-primary" />
                <p className="mt-8 font-display text-2xl">{city}</p>
                <span className="text-sm text-muted-foreground">{hi} में कैटरिंग सेवा</span>
              </div>
            ))}
          </div>
          <Button variant="royal" className="mt-10" asChild>
            <Link to="/book">Book catering • बुक करें</Link>
          </Button>
        </div>
      </section>
    </>
  );
}