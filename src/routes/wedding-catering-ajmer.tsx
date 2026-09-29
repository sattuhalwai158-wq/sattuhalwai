import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChefHat,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Users,
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

const faqs = [
  {
    question: "Do you provide full wedding catering services in Ajmer?",
    answer:
      "Yes. N Sattu Cuisine provides comprehensive wedding catering throughout Ajmer, including complete banquet management, live food counters, artisanal mithai, uniformed service staff, and royal brass and copper buffet staging.",
  },
  {
    question: "Which wedding venues and areas do you cover in Ajmer?",
    answer:
      "We cater across all major wedding lawns, luxury hotels, private farmhouses, and banquet spaces in Ajmer, including Panchsheel Nagar, Vaishali Nagar, Anasagar Circular Road, Beawar Road, and Civil Lines.",
  },
  {
    question: "Can we schedule a menu tasting in Ajmer before booking?",
    answer:
      "Yes. We welcome families to schedule an advance tasting session at our Ajmer kitchen to experience the flavours, discuss guest preferences, and customize every course with our chefs.",
  },
  {
    question: "Do you offer separate Jain catering facilities?",
    answer:
      "Absolutely. We provide dedicated Jain food preparations cooked with separate utensils, excluding onion, garlic, and root vegetables, served at distinctly demarcated live counters.",
  },
  {
    question: "What is the guest capacity you can accommodate?",
    answer:
      "We cater gatherings of all scales, from intimate pre-wedding functions of 100 guests to grand wedding celebrations exceeding 5,000 guests with flawless hospitality.",
  },
];

export const Route = createFileRoute("/wedding-catering-ajmer")({
  head: () =>
    buildPageHead({
      title: "Wedding Caterers in Ajmer | Royal Catering | N Sattu Cuisine",
      description:
        "Looking for wedding caterers in Ajmer? N Sattu Cuisine provides authentic Rajasthani banquets, pure desi ghee halwai sweets & palace buffet setups for 100 to 5,000+ guests.",
      path: "/wedding-catering-ajmer",
      ogImage: "/media/buffet-6.jpg",
      structuredData: [
        buildLocalBusinessSchema(),
        buildServiceSchema({
          name: "Wedding Catering in Ajmer",
          description:
            "Full-service luxury wedding catering, authentic Rajasthani feasts, live halwai stalls, and palatial buffet setups in Ajmer.",
          serviceType: "Wedding Catering Service",
          areaServed: "Ajmer",
        }),
        buildBreadcrumbSchema([
          { name: "Wedding Catering", path: "/wedding-catering-ajmer" },
          { name: "Ajmer", path: "/wedding-catering-ajmer" },
        ]),
        buildFaqSchema(faqs),
      ],
    }),
  component: WeddingCateringAjmer,
});

function WeddingCateringAjmer() {
  return (
    <>
      <PageIntro
        eyebrow="Ajmer Wedding Catering • अजमेर शादी के कैटरर्स"
        title="Royal Wedding Catering in Ajmer."
        copy="Creating unforgettable celebrations with authentic Marwari heritage recipes, master halwai craft, live culinary theatrics, and majestic palace buffet staging across Ajmer."
      />

      <div className="border-b border-border bg-secondary/40 px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { label: "Catering Services", to: "/menus" },
              { label: "Wedding Catering in Ajmer" },
            ]}
          />
        </div>
      </div>

      {/* Main Content & Value Proposition */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Generations of Hospitality • अजमेर की शान
            </span>
            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Wedding Catering Services in Ajmer Crafted for Royally Memorable Feasts.
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              A wedding feast in Rajasthan is more than a meal; it is a sacred tradition of
              welcoming family and honored guests. At <strong>N Sattu Cuisine</strong> (also fondly
              known as <strong>Sattu Halwai</strong>), our culinary lineage under the guidance of
              Nathu Ji Prajapati, Satyanarayan Prajapati, and Chanchal Prajapati brings over a
              decade of time-tested mastery to your most auspicious day.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Whether you are hosting an intimate Sagan or Sangeet banquet in Panchsheel or a royal
              3,000-guest wedding reception along Anasagar Circular Road, we deliver precision,
              warmth, and unforgettable culinary craftsmanship.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">100% Pure Desi Ghee</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Traditional Marwari cooking with pure ghee, slow-roasted mawa, and handpicked
                    spices.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Separate Jain Kitchen</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Dedicated cooking vessels and distinct live counters strictly prepared without
                    root vegetables.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Palatial Brass Staging</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Handcrafted brass chafing dishes, hammered copper serveware, and lit LED
                    buffets.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Live Theatrical Stalls</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Hot tandoori breads, crispy jalebis with saffron rabdi, and interactive chaat
                    streets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-sm border border-gold/30 bg-card p-3 shadow-lift">
            <img
              src="/media/buffet-6.jpg"
              alt="Luxury wedding catering buffet setup in Ajmer by N Sattu Cuisine"
              width={800}
              height={600}
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
            <div className="p-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                Direct Concierge
              </span>
              <h3 className="mt-2 font-display text-2xl">Plan Your Ajmer Wedding Feast</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Speak directly with our team to reserve your wedding dates, schedule a kitchen
                tasting, or obtain a tailored proposal.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button variant="royal" className="w-full sm:w-auto" asChild>
                  <Link to="/book">
                    Request Quotation <ArrowRight className="size-4" />
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

      {/* Services offered for weddings */}
      <section className="border-t border-border bg-muted/60 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              Comprehensive Solutions
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl">
              Catering Services for Every Wedding Event
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              From dawn til night, we handle every meal of the multi-day Indian wedding with
              customized menus, trained service captains, and immaculate hygiene.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-border bg-card p-6 rounded-sm">
              <UtensilsCrossed className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Mehndi & Mayra Lunch</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Wholesome Rajasthani lunch platters featuring authentic ker sangri, gatte ki sabzi,
                dal baati churma, and traditional kadhi served piping hot.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <Sparkles className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Sangeet Street & Live Stalls</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Theatrical street counters with live moong chillas, wood-fired tandoor, artisanal
                chaat, pasta bars, and interactive dessert stations.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <ChefHat className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Royal Wedding Reception</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Extravagant multi-cuisine grand banquets with lit buffet islands, bespoke brass
                serveware, and royal silver-embellished sweets.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <Clock className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Pheras & Midnight Refreshments</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Midnight masala chai, kulhad kesar milk, fresh hot jalebi, and light snacks for
                close family members attending late-night rituals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Wedding Dishes */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
                Handcrafted Taste
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl">
                Ajmer Wedding Menu Highlights
              </h2>
            </div>
            <Button variant="regalOutline" asChild>
              <Link to="/menus">
                Explore Complete Menus <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="group overflow-hidden border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/media/sweet-rose-platter.jpg"
                  alt="Artisanal Rose Kesar Dry Fruit Sweets by Sattu Halwai Ajmer"
                  width={600}
                  height={450}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold uppercase text-primary">
                  Master Halwai Specialty
                </span>
                <h3 className="mt-2 font-display text-2xl">Rose Kesar Dry Fruit Mithai</h3>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Slow-churned pure mawa infused with saffron and enveloped in fragrant rose petals,
                  crafted freshly for reception guests.
                </p>
              </div>
            </div>

            <div className="group overflow-hidden border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/media/rajasthani-stall.jpg"
                  alt="Traditional Royal Rajasthani Thali served at Ajmer wedding"
                  width={600}
                  height={450}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold uppercase text-primary">
                  Heritage Cuisine
                </span>
                <h3 className="mt-2 font-display text-2xl">Royal Rajasthani Thaal</h3>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Signature Dal Baati Churma with five varieties of baati, Panchmel Dal, desert Ker
                  Sangri, and freshly whipped buttermilk.
                </p>
              </div>
            </div>

            <div className="group overflow-hidden border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/media/live-dosa-counter.jpg"
                  alt="Theatrical Live Food Stall at wedding reception in Ajmer"
                  width={600}
                  height={450}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold uppercase text-primary">
                  Live Culinary Theatre
                </span>
                <h3 className="mt-2 font-display text-2xl">Live Food Counter Stalls</h3>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Made-to-order delicacies cooked live right before your guests, ensuring piping hot
                  freshness and engaging culinary theatre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links & Regional Coverage */}
      <section className="border-t border-border bg-secondary/30 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl text-center">
            Serving Celebrations Across Rajasthan
          </h2>
          <p className="mt-2 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
            In addition to premier venues across Ajmer, our culinary fleet regularly caters
            destination events in surrounding historic towns:
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/wedding-catering-pushkar"
              className="flex items-center justify-between p-4 rounded border border-border bg-card hover:border-gold/60 transition-colors"
            >
              <div>
                <p className="font-semibold text-sm">Pushkar Destination Weddings</p>
                <p className="text-xs text-muted-foreground">
                  Resorts, heritage havelis & desert camps
                </p>
              </div>
              <ArrowRight className="size-4 text-gold" />
            </Link>
            <Link
              to="/catering-kishangarh"
              className="flex items-center justify-between p-4 rounded border border-border bg-card hover:border-gold/60 transition-colors"
            >
              <div>
                <p className="font-semibold text-sm">Catering in Kishangarh</p>
                <p className="text-xs text-muted-foreground">
                  Marble city wedding banquets & lawns
                </p>
              </div>
              <ArrowRight className="size-4 text-gold" />
            </Link>
            <Link
              to="/rajasthani-catering-ajmer"
              className="flex items-center justify-between p-4 rounded border border-border bg-card hover:border-gold/60 transition-colors"
            >
              <div>
                <p className="font-semibold text-sm">Authentic Rajasthani Food</p>
                <p className="text-xs text-muted-foreground">
                  Traditional Marwari thali & dal baati
                </p>
              </div>
              <ArrowRight className="size-4 text-gold" />
            </Link>
            <Link
              to="/halwai-ajmer"
              className="flex items-center justify-between p-4 rounded border border-border bg-card hover:border-gold/60 transition-colors"
            >
              <div>
                <p className="font-semibold text-sm">Master Halwai in Ajmer</p>
                <p className="text-xs text-muted-foreground">
                  Pure desi ghee wedding sweets & mawa
                </p>
              </div>
              <ArrowRight className="size-4 text-gold" />
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              Common Queries
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl">Frequently Asked Questions</h2>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              Essential guidance on planning and booking wedding catering in Ajmer with N Sattu
              Cuisine.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-12">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
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

      {/* Call to Action Bar */}
      <section className="border-t border-gold/30 bg-obsidian text-primary-foreground px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-display text-3xl sm:text-5xl">
            Begin Planning Your Ajmer Celebration
          </h2>
          <p className="mt-4 text-sm text-primary-foreground/80 max-w-2xl mx-auto leading-7">
            Secure your dates with Satyanarayan Prajapati and our dedicated culinary team. We invite
            you to an exclusive tasting session at our kitchen.
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
