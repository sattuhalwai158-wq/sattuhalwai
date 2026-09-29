import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChefHat,
  Flame,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Wheat,
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

const rajasthaniFaqs = [
  {
    question: "What traditional Rajasthani dishes are included in your wedding menus?",
    answer:
      "Our royal Rajasthani banquet covers heritage Marwari classics: authentic Dal Baati Churma (with plain, masala, and dry-fruit baatis, and multiple churmas), desert Ker Sangri, Govind Gatta curry, Pithore ki Sabzi, Marwari Kadhi, Missi Roti, Bajra Roti with homemade white butter (makhan), and pure desi ghee sweets.",
  },
  {
    question: "Do you use 100% pure desi ghee for traditional preparations?",
    answer:
      "Yes, without exception. All traditional Rajasthani sweets, baatis, churmas, and curries are prepared exclusively in 100% pure desi ghee, retaining genuine aroma and rich heritage flavor.",
  },
  {
    question: "Can we book traditional Chaukhi or Thaal dining style for our event?",
    answer:
      "Yes. Along with contemporary illuminated buffets, we specialize in authentic Rajasthani 'Pangat' and low-seating 'Chaukhi' style thaal dining with royal brass plates, bowls, and gracious personalized table service.",
  },
  {
    question: "Do you offer pure Jain variations of Rajasthani dishes?",
    answer:
      "Yes. We prepare authentic Jain versions of Rajasthani feasts completely free of onion, garlic, potatoes, and root vegetables, cooked using separate dedicated vessels and ladles.",
  },
  {
    question: "How do we schedule a tasting session for our wedding menu?",
    answer:
      "Simply contact us through our booking page or call our team directly. We arrange an advance tasting session at our Ajmer kitchen where your family can sample every proposed dish.",
  },
];

export const Route = createFileRoute("/rajasthani-catering-ajmer")({
  head: () =>
    buildPageHead({
      title: "Authentic Rajasthani Catering in Ajmer | Traditional Thaal & Feasts",
      description:
        "Experience genuine Rajasthani catering in Ajmer by N Sattu Cuisine. Authentic Dal Baati Churma, Ker Sangri, pure desi ghee sweets & royal thaal dining for weddings.",
      path: "/rajasthani-catering-ajmer",
      ogImage: "/media/rajasthani-stall.jpg",
      structuredData: [
        buildLocalBusinessSchema(),
        buildServiceSchema({
          name: "Traditional Rajasthani Catering in Ajmer",
          description:
            "Authentic royal Marwari and Rajasthani catering, traditional Dal Baati Churma, and heritage pure ghee sweets in Ajmer.",
          serviceType: "Traditional Rajasthani Food Catering",
          areaServed: "Ajmer",
        }),
        buildBreadcrumbSchema([
          { name: "Catering Services", path: "/menus" },
          { name: "Rajasthani Catering in Ajmer", path: "/rajasthani-catering-ajmer" },
        ]),
        buildFaqSchema(rajasthaniFaqs),
      ],
    }),
  component: RajasthaniCateringAjmer,
});

function RajasthaniCateringAjmer() {
  return (
    <>
      <PageIntro
        eyebrow="Heritage Marwari Culinary Tradition • राजस्थानी खानपान"
        title="Authentic Rajasthani Catering in Ajmer."
        copy="Preserving the timeless royal recipes of Rajasthan with pure desi ghee, slow-roasted heritage spices, authentic Dal Baati Churma, and genuine Marwari hospitality."
      />

      <div className="border-b border-border bg-secondary/40 px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { label: "Catering Services", to: "/menus" },
              { label: "Rajasthani Catering in Ajmer" },
            ]}
          />
        </div>
      </div>

      {/* Hero Content Section */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              The True Essence of Rajasthan • मारवाड़ का असली स्वाद
            </span>
            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Authentic Rajasthani Food Catering in Ajmer, Pushkar & Kishangarh.
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              The culinary heritage of Rajasthan is defined by bold aromatic spices, sun-dried
              desert bounty, rich dairy, and the golden warmth of pure cow desi ghee. Under the
              culinary stewardship of Nathu Ji Prajapati and Satyanarayan Prajapati,{" "}
              <strong>N Sattu Cuisine</strong> has championed authentic regional gastronomy for over
              a decade.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              We reject modern shortcuts and commercial premixes. Every pot of Panchmel Dal, every
              batch of baatis roasted to golden crispness, and every spoonful of fragrant Ker Sangri
              is slow-crafted according to ancestral Marwari techniques passed down across
              generations.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    Pure Desi Ghee Commitment
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    100% pure desi ghee used across all curries, breads, churmas, and artisanal
                    mithais.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    Authentic Desert Ingredients
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Sourced desert ker, wild sangri, pure mawa, stone-ground besan, and handpicked
                    spices.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    Royal Thaal & Pangat Seating
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Traditional seated dining in handcrafted brass thaalis or palatial buffet
                    presentation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Strict Jain Catering</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Authentic Marwari Jain delicacies without root vegetables, onion, or garlic.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-sm border border-gold/30 bg-card p-3 shadow-lift">
            <img
              src="/media/rajasthani-stall.jpg"
              alt="Traditional Royal Rajasthani Thaal setup in Ajmer"
              width={800}
              height={600}
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
            <div className="p-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                Heritage Feasts
              </span>
              <h3 className="mt-2 font-display text-2xl">Plan an Authentic Rajasthani Menu</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Discuss customary menus for your wedding, Sagan, Mehendi, or family milestone. We
                offer full tasting sessions at our Ajmer kitchen.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button variant="royal" className="w-full sm:w-auto" asChild>
                  <Link to="/book">
                    Request Rajasthani Menu <ArrowRight className="size-4" />
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

      {/* Signature Rajasthani Menu Showcase */}
      <section className="border-t border-border bg-secondary/30 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              Customary Delicacies
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl">
              The Royal Marwari Wedding Thaal
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              A curated repertoire of authentic dishes that define celebratory feasts across Ajmer,
              Pushkar, and Kishangarh.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border border-border bg-card p-6 rounded-sm">
              <Flame className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Dal Baati Churma</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Slow-roasted golden baatis soaked in warm desi ghee, served with Panchmel Dal and
                trio of churmas: Rose Gulab, Kesar Badam, and traditional Besan.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <Wheat className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Royal Desert Ker Sangri</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Authentic desert beans and berries braised in mustard oil, whole red chilies,
                raisins, and aromatic spices—a staple of royal Rajput banquets.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <UtensilsCrossed className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Govind Gatta & Pithore</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Stuffed mawa-besan gattas and spiced gram flour pithore simmered in a rich,
                curd-based gravy infused with heeng and Kashmiri deghi mirch.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <ChefHat className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Heritage Breads & Makhan</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Freshly tossed Missi Roti, Bajra Roti with freshly churned white makhan and organic
                jaggery (gud), alongside stuffed parathas and puris.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <Sparkles className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Artisanal Halwai Mithai</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Pure mawa kachori dipped in fragrant saffron syrup, Ghevar, Mohanthal, Rose Mawa
                Cups, and piping hot Jalebi served with thick Rabdi.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <ShieldCheck className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Chaas & Traditional Refreshments</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Smoked cumin buttermilk (Chaas), sweet kesar lassi, kulhad masala chai, and rose
                sharbat served fresh to delight arriving guests.
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
                Explore Further
              </p>
              <h2 className="mt-2 font-display text-3xl">
                Comprehensive Catering & Sweet Services
              </h2>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                See our destination wedding catering across Ajmer, Pushkar, and Kishangarh, or
                discover our master halwai services.
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
                <Link to="/catering-kishangarh">
                  Catering Kishangarh <ArrowRight className="size-3.5" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/halwai-ajmer">
                  Master Halwai & Sweets <ArrowRight className="size-3.5" />
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
              Rajasthani Food Questions
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl">Frequently Asked Questions</h2>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              Insights into our traditional Marwari cuisine and wedding catering capabilities.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-12">
            {rajasthaniFaqs.map((f, i) => (
              <AccordionItem key={i} value={`raj-${i}`} className="border-border">
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
            Taste Authentic Rajasthan at Your Wedding
          </h2>
          <p className="mt-4 text-sm text-primary-foreground/80 max-w-2xl mx-auto leading-7">
            Connect directly with MD Satyanarayan Prajapati to design a regal Rajasthani menu
            tailored to your family's customs.
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
