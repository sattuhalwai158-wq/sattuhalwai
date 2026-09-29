import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChefHat,
  HeartHandshake,
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

const pushkarFaqs = [
  {
    question: "Do you cater destination weddings in Pushkar?",
    answer:
      "Yes. Pushkar is one of our primary service markets, located just 15 km from our central kitchen in Ajmer. We regularly provide complete catering infrastructure for destination weddings at Pushkar luxury resorts, desert camps, and heritage havelis.",
  },
  {
    question: "Do you strictly provide 100% pure vegetarian catering in Pushkar?",
    answer:
      "Yes. In keeping with the sacred heritage of Pushkar, our entire catering menu is 100% pure vegetarian, prepared in pure desi ghee with highest sanctity, including strictly separate Jain options without onion, garlic, or root crops.",
  },
  {
    question: "How do you manage multi-day destination wedding catering?",
    answer:
      "We station dedicated on-ground teams and live kitchen setups for the entire 2 to 3-day itinerary: Haldi and Mehendi snacks, Sangeet night street feasts, traditional wedding banquets, and early morning Vidai breakfasts.",
  },
  {
    question: "Do you supply complete buffet décor and serveware to Pushkar resorts?",
    answer:
      "Yes. We bring illuminated LED buffet stations, royal antique brass chafing dishes, kulhads, customized theme counters, and uniformed service staff directly to your venue.",
  },
  {
    question: "Can out-of-town couples arrange tasting sessions in advance?",
    answer:
      "Yes. Destination wedding couples visiting Pushkar or Ajmer for recce can book a private tasting session with MD Satyanarayan Prajapati to finalize every course of their celebration menu.",
  },
];

export const Route = createFileRoute("/wedding-catering-pushkar")({
  head: () =>
    buildPageHead({
      title: "Wedding Catering in Pushkar | Destination Wedding Caterer | N Sattu Cuisine",
      description:
        "Specialist destination wedding caterers in Pushkar, Rajasthan. 100% pure vegetarian royal feasts, artisanal sweets, live counters & palace setups for Pushkar resorts & camps.",
      path: "/wedding-catering-pushkar",
      ogImage: "/media/buffet-28.jpg",
      structuredData: [
        buildLocalBusinessSchema(),
        buildServiceSchema({
          name: "Wedding Catering in Pushkar",
          description:
            "Luxury destination wedding catering, pure vegetarian royal banquets, and live counters for resorts and wedding lawns in Pushkar.",
          serviceType: "Destination Wedding Catering",
          areaServed: "Pushkar",
        }),
        buildBreadcrumbSchema([
          { name: "Wedding Catering", path: "/wedding-catering-ajmer" },
          { name: "Pushkar", path: "/wedding-catering-pushkar" },
        ]),
        buildFaqSchema(pushkarFaqs),
      ],
    }),
  component: WeddingCateringPushkar,
});

function WeddingCateringPushkar() {
  return (
    <>
      <PageIntro
        eyebrow="Pushkar Destination Catering • पुष्कर कैटरिंग"
        title="Destination Wedding Catering in Pushkar."
        copy="Serving royal vegetarian feasts, theatrical live food streets, and traditional Marwari hospitality for luxury destination celebrations across Pushkar’s sacred dunes and heritage resorts."
      />

      <div className="border-b border-border bg-secondary/40 px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { label: "Catering Services", to: "/menus" },
              { label: "Wedding Catering in Pushkar" },
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Sacred Heritage & Palatial Flavors • पुष्कर की पवित्र भूमि
            </span>
            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Luxury Destination Wedding Caterers Serving Pushkar Resorts & Camps.
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Pushkar is celebrated globally as one of India's most enchanting destination wedding
              venues. From palatial desert resorts on the outskirts to tranquil garden venues near
              the sacred lake, creating a memorable culinary experience requires both reverence for
              Pushkar's vegetarian traditions and world-class hospitality standards.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Headquartered just minutes away in Ajmer, <strong>N Sattu Cuisine</strong> operates
              seamlessly in Pushkar. We handle the logistical intricacies of destination
              weddings—ensuring fresh supplies, uncompromised purity in desi ghee, live kitchen
              setups, and royal presentation throughout your multi-day itinerary.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    100% Pure Vegetarian Purity
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Respecting Pushkar’s sacred customs with pure vegetarian food made in pure desi
                    ghee.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    Multi-Day Destination Packages
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Comprehensive coverage for Haldi, Mehendi, Pool Party, Sangeet, Wedding &
                    Reception.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    Desert & Lawn Infrastructure
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Complete outdoor live setups, clay tandoors, brass service pieces, and
                    decorative buffet islands.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Jain & Sattvik Counters</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Separate utensils and trained staff preparing onion-and-garlic-free delicacies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-sm border border-gold/30 bg-card p-3 shadow-lift">
            <img
              src="/media/buffet-28.jpg"
              alt="Royal brass and copper serveware for wedding catering in Pushkar"
              width={800}
              height={600}
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
            <div className="p-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                Pushkar Concierge
              </span>
              <h3 className="mt-2 font-display text-2xl">Planning a Wedding in Pushkar?</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Our directors meet destination planners and families directly. Contact us to design
                a custom culinary proposal for your Pushkar resort.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button variant="royal" className="w-full sm:w-auto" asChild>
                  <Link to="/book">
                    Destination Inquiry <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" asChild>
                  <a href={`tel:${BUSINESS_CONFIG.telephone}`}>
                    <Phone className="size-4" /> Call Satyanarayan Ji
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Day Destination Wedding Program */}
      <section className="border-t border-border bg-secondary/30 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              Itinerary Planning
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl">
              The Multi-Day Pushkar Wedding Feast
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              We design distinctive flavors and themes for every gathering so guests experience new
              culinary surprises each day.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border border-border bg-card p-6 rounded-sm">
              <div className="text-xs font-bold text-gold uppercase tracking-wider">
                Day 1 • Welcome & Haldi
              </div>
              <h3 className="mt-3 font-display text-2xl">Haldi Breakfast & Light Bites</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Fluffy live khaman dhokla, fresh jalebi with hot rabdi, masala poha, artisanal chai
                in kulhads, and seasonal fruit counters.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <div className="text-xs font-bold text-gold uppercase tracking-wider">
                Day 1 • Evening Sangeet
              </div>
              <h3 className="mt-3 font-display text-2xl">Pushkar Night Food Street</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Theatrical street stalls under the stars: interactive chaat, live wood-fired pizzas,
                moong chillas, tandoori treats, and craft mocktails.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <div className="text-xs font-bold text-gold uppercase tracking-wider">
                Day 2 • The Royal Mandap
              </div>
              <h3 className="mt-3 font-display text-2xl">The Royal Wedding Banquet</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Authentic Marwari royal thaal: Ker Sangri, Gatte ki Sabzi, Dal Baati Churma,
                Pithore, saffron pulao, handmade breads, and gold-leaf mithai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Navigation Links */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl border border-border bg-card p-8 rounded-sm">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Inter-City Catering Network
              </p>
              <h2 className="mt-2 font-display text-3xl">
                Coordinated Catering Across the Golden Triangle
              </h2>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                Many families host events split across Ajmer, Pushkar, and Kishangarh. Our central
                production kitchen ensures complete consistency and coordinated menus for all your
                venues.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link to="/wedding-catering-ajmer">
                  Wedding Catering Ajmer <ArrowRight className="size-3.5" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/catering-kishangarh">
                  Catering Kishangarh <ArrowRight className="size-3.5" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/rajasthani-catering-ajmer">
                  Rajasthani Thaal Menus <ArrowRight className="size-3.5" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/halwai-ajmer">
                  Wedding Halwai & Sweets <ArrowRight className="size-3.5" />
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
              Pushkar Queries
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl">Frequently Asked Questions</h2>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              Key questions about hosting a destination wedding banquet in Pushkar with N Sattu
              Cuisine.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-12">
            {pushkarFaqs.map((f, i) => (
              <AccordionItem key={i} value={`pushkar-${i}`} className="border-border">
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
          <h2 className="font-display text-3xl sm:text-5xl">Enquire for Your Pushkar Wedding</h2>
          <p className="mt-4 text-sm text-primary-foreground/80 max-w-2xl mx-auto leading-7">
            Connect with our wedding catering concierge today to review dates, menus, and logistics
            for your Pushkar celebration.
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
