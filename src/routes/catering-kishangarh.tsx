import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChefHat,
  Building2,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageIntro } from "@/components/site-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  buildPageHead,
  buildLocalBusinessSchema,
  buildServiceSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/components/seo";
import { BUSINESS_CONFIG } from "@/lib/site-config";

const kishangarhFaqs = [
  {
    question: "Do you offer wedding and event catering in Kishangarh?",
    answer:
      "Yes. N Sattu Cuisine regularly caters grand weddings, industrial galas, and private celebrations across Kishangarh, providing full on-site halwai services, live stalls, and palatial buffet setups.",
  },
  {
    question: "How do you manage catering logistics between Ajmer and Kishangarh?",
    answer:
      "Kishangarh is located just 25–30 minutes from our central Ajmer culinary base. Our fleet of refrigerated vehicles, mobile kitchens, and dedicated service staff travel smoothly along the NH48 corridor, ensuring all food arrives fresh and piping hot.",
  },
  {
    question: "Can you cater large-scale gatherings for Kishangarh wedding lawns?",
    answer:
      "Yes. We frequently cater grand celebrations ranging from 500 to 5,000+ guests, equipped with multiple simultaneous live food counters, separate dessert pavilions, and professional banquet managers.",
  },
  {
    question: "Do you provide corporate and industrial event catering in Kishangarh?",
    answer:
      "Yes. In addition to royal weddings, we cater corporate inaugurations, factory milestones, and business conferences in the Kishangarh marble industrial belt with customized lunch and dinner buffets.",
  },
  {
    question: "Are pure ghee Rajasthani sweets made on-site for Kishangarh weddings?",
    answer:
      "Yes. Our master halwais led by Satyanarayan Prajapati can set up live sweet-making counters right at your venue in Kishangarh, preparing hot jalebi, malpua, and freshly garnished mawa sweets.",
  },
];

export const Route = createFileRoute("/catering-kishangarh")({
  head: () =>
    buildPageHead({
      title: "Catering Services in Kishangarh | Wedding Caterers | N Sattu Cuisine",
      description:
        "Premium wedding & event caterers in Kishangarh, Rajasthan. Authentic Rajasthani food, pure desi ghee sweets & luxury buffet setups for 100 to 5,000+ guests.",
      path: "/catering-kishangarh",
      ogImage: "/media/night-stalls.jpg",
      structuredData: [
        buildLocalBusinessSchema(),
        buildServiceSchema({
          name: "Wedding & Event Catering in Kishangarh",
          description:
            "Full-service wedding and event catering, authentic Rajasthani banquets, and live halwai stalls in Kishangarh.",
          serviceType: "Event & Wedding Catering",
          areaServed: "Kishangarh",
        }),
        buildBreadcrumbSchema([
          { name: "Catering Services", path: "/menus" },
          { name: "Kishangarh", path: "/catering-kishangarh" },
        ]),
        buildFaqSchema(kishangarhFaqs),
      ],
    }),
  component: CateringKishangarh,
});

function CateringKishangarh() {
  return (
    <>
      <PageIntro
        eyebrow="Kishangarh Event Catering • किशनगढ़ कैटरिंग"
        title="Wedding & Event Catering in Kishangarh."
        copy="Bringing royal Rajasthani feasts, artisanal mithai, theatrical live counters, and palatial buffet decor to grand wedding venues and celebration spaces across Kishangarh."
      />

      <div className="border-b border-border bg-secondary/40 px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { label: "Catering Services", to: "/menus" },
              { label: "Catering in Kishangarh" },
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Marble City Celebrations • किशनगढ़ की भव्य शादियाँ
            </span>
            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Premier Wedding & Event Catering Services Across Kishangarh.
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Known for its heritage, enterprise, and renowned marble architecture, Kishangarh hosts
              some of the grandest wedding celebrations in Rajasthan. Families and hosts in
              Kishangarh demand exceptional food quality, impeccable presentation, and hospitality
              that reflects their family stature.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              <strong>N Sattu Cuisine</strong> has earned a strong reputation among Kishangarh hosts
              for delivering uncompromising quality in pure desi ghee, authentic Marwari recipes,
              and stunning illuminated buffet counters. From heritage celebrations around Phool
              Mahal Palace to spacious modern wedding lawns, our team provides complete catering
              solutions.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">High-Volume Capacity</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Serving up to 5,000+ guests seamlessly with fast, courteous counter service.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Rapid NH48 Connectivity</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Quick, efficient dispatch from our Ajmer base ensures freshness and punctuality.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Corporate & Gala Feasts</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Tailored catering for marble business inaugurations, annual days, and private
                    banquets.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Master Halwai Sweets</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Artisanal mawa sweets and live jalebi crafted by master halwai Satyanarayan
                    Prajapati.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-sm border border-gold/30 bg-card p-3 shadow-lift">
            <img
              src="/media/night-stalls.jpg"
              alt="Night food street live stalls at wedding in Kishangarh"
              width={800}
              height={600}
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
            <div className="p-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                Kishangarh Events
              </span>
              <h3 className="mt-2 font-display text-2xl">Plan Your Kishangarh Event</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Discuss dates, menus, and custom setup requirements for your Kishangarh wedding or
                corporate gala.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button variant="royal" className="w-full sm:w-auto" asChild>
                  <Link to="/book">
                    Request Proposal <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" asChild>
                  <a href={`tel:${BUSINESS_CONFIG.telephone}`}>
                    <Phone className="size-4" /> Call Chef
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services in Kishangarh */}
      <section className="border-t border-border bg-secondary/30 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              Tailored Catering
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl">
              Catering Solutions in Kishangarh
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              We cater every celebration scale with specialized menus, premium serveware, and
              attentive service.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            <div className="border border-border bg-card p-6 rounded-sm">
              <Sparkles className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Grand Wedding Banquets</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Multi-cuisine and traditional Marwari lavish feasts featuring dal baati churma, live
                rotis, desert curries, and royal sweets presented on illuminated buffets.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <Building2 className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Corporate & Industrial Meets</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Executive lunch and dinner spreads for Kishangarh marble associations, business
                summits, dealer meets, and facility inaugurations.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <ChefHat className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Intimate Family Gatherings</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Bespoke catering for Roka, Sagan, baby showers, and anniversary banquets for 100–300
                guests with personalized chef attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sibling Links */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl border border-border bg-card p-8 rounded-sm">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Explore All Regions
              </p>
              <h2 className="mt-2 font-display text-3xl">Our Complete Catering Services</h2>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                Discover our specialized catering pages across Ajmer, Pushkar, and authentic
                regional specialty menus.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link to="/wedding-catering-ajmer">
                  Wedding Catering Ajmer <ArrowRight className="size-3.5" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/wedding-catering-pushkar">
                  Wedding Catering Pushkar <ArrowRight className="size-3.5" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/rajasthani-catering-ajmer">
                  Rajasthani Thaal Menus <ArrowRight className="size-3.5" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/halwai-ajmer">
                  Master Halwai Sweets <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-border px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              Kishangarh FAQs
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl">Frequently Asked Questions</h2>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              Key questions about our catering services in Kishangarh.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-12">
            {kishangarhFaqs.map((f, i) => (
              <AccordionItem key={i} value={`kish-${i}`} className="border-border">
                <AccordionTrigger className="font-display text-xl text-left hover:no-underline py-5">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-7 text-sm pb-5">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gold/30 bg-obsidian text-primary-foreground px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-display text-3xl sm:text-5xl">
            Book Catering for Your Kishangarh Celebration
          </h2>
          <p className="mt-4 text-sm text-primary-foreground/80 max-w-2xl mx-auto leading-7">
            Submit your guest count, preferred event date, and cuisine choices. Our catering
            director will contact you promptly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="royal" size="lg" asChild>
              <Link to="/book">
                Open Booking Inquiry <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="border border-gold/50 text-gold hover:bg-gold hover:text-foreground"
              asChild
            >
              <a href={`tel:${BUSINESS_CONFIG.telephone}`}>
                <Phone className="size-4" /> Call +91 94604 26952
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
