import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChefHat,
  Gift,
  Heart,
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

const halwaiFaqs = [
  {
    question: "What halwai services does Sattu Halwai provide for weddings in Ajmer?",
    answer:
      "Sattu Halwai (N Sattu Cuisine) provides complete wedding halwai services, including on-site live sweet bhattis, freshly fried desi ghee jalebis with rabdi, handcrafted artisanal mawa mithais, wedding invitation bhaji boxes, and full dessert counter management.",
  },
  {
    question: "Do you use 100% pure desi ghee for all wedding sweets?",
    answer:
      "Yes. All our sweets and snacks are crafted exclusively in 100% pure desi ghee. We slow-roast fresh mawa in-house and use premium California almonds, cashews, and Kashmiri saffron without artificial adulterants.",
  },
  {
    question: "Can halwais be booked for on-site live cooking at wedding venues?",
    answer:
      "Yes. Our master halwais led by Satyanarayan Prajapati set up traditional live bhattis at your banquet hall, farmhouse, or resort across Ajmer, Pushkar, and Kishangarh, preparing hot sweets directly before your guests.",
  },
  {
    question: "Do you supply customized wedding gift boxes (Bhaji / Kankotri boxes)?",
    answer:
      "Yes. We offer beautifully presented, customized wedding sweet hampers and dry-fruit gift boxes designed for wedding invitations, Sagan gifts, Barati welcome packages, and Vidai favors.",
  },
  {
    question: "How far in advance should we book wedding halwai services in Ajmer?",
    answer:
      "During peak wedding seasons (November to February and April to July), we recommend reserving your dates at least 2 to 4 months in advance to ensure our master halwai crew is committed to your celebration.",
  },
];

export const Route = createFileRoute("/halwai-ajmer")({
  head: () =>
    buildPageHead({
      title: "Master Halwai in Ajmer | Wedding Sweets & Live Mithai | Sattu Halwai",
      description:
        "Sattu Halwai (N Sattu Cuisine) in Ajmer offers authentic wedding halwai services, pure desi ghee artisanal sweets, live jalebi counters & bhaji gift boxes.",
      path: "/halwai-ajmer",
      ogImage: "/media/sweet-rose-platter.jpg",
      structuredData: [
        buildLocalBusinessSchema(),
        buildServiceSchema({
          name: "Wedding Halwai Services in Ajmer",
          description:
            "Generational master halwai services, pure desi ghee wedding sweets, live bhatti, and custom mithai boxes in Ajmer.",
          serviceType: "Wedding Halwai & Sweets Service",
          areaServed: "Ajmer",
        }),
        buildBreadcrumbSchema([
          { name: "Services", path: "/menus" },
          { name: "Halwai in Ajmer", path: "/halwai-ajmer" },
        ]),
        buildFaqSchema(halwaiFaqs),
      ],
    }),
  component: HalwaiAjmer,
});

function HalwaiAjmer() {
  return (
    <>
      <PageIntro
        eyebrow="Generational Halwai Mastery • अजमेर के प्रसिद्ध हलवाई"
        title="Traditional Wedding Halwai in Ajmer."
        copy="Continuing the culinary heritage of Nathu Ji Prajapati and Satyanarayan Prajapati with handcrafted sweets made in 100% pure desi ghee, fresh mawa, and live sweet bhattis."
      />

      <div className="border-b border-border bg-secondary/40 px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { label: "Catering Services", to: "/menus" },
              { label: "Halwai Services in Ajmer" },
            ]}
          />
        </div>
      </div>

      {/* Main Narrative */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              The Heart of Every Indian Wedding • हलवाई की परंपरा
            </span>
            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Authentic Wedding Halwai Services in Ajmer by Sattu Halwai.
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              In Indian tradition, a wedding is consecrated with sweets. The aroma of pure desi ghee
              simmering in massive iron kadhais, the golden curl of live jalebis, and the
              melt-in-mouth texture of freshly rolled mawa laddus form the soul of every family
              celebration.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              At <strong>N Sattu Cuisine</strong> (widely known across Rajasthan as{" "}
              <strong>Sattu Halwai</strong>), our master halwais carry forward an illustrious
              lineage begun by Nathu Ji Prajapati. Today, under the direct stewardship of Managing
              Director Satyanarayan Prajapati and CEO Chanchal Prajapati, we ensure every wedding
              sweet reflects uncompromising purity, exquisite taste, and regal presentation.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">100% Pure Desi Ghee</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Zero adulteration. We use only verified pure cow and buffalo desi ghee.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">In-House Fresh Mawa</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Slow-reduced milk mawa prepared under our direct supervision for pure freshness.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    Live On-Site Halwai Bhatti
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Master halwais stationed at your venue preparing hot, freshly made sweets for
                    guests.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded border border-border bg-card p-4">
                <CheckCircle2 className="size-5 shrink-0 text-gold mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Custom Bhaji Gift Boxes</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Artisanal wedding invitation mithai packaging and Vidai sweet boxes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-sm border border-gold/30 bg-card p-3 shadow-lift">
            <img
              src="/media/sweet-rose-platter.jpg"
              alt="Handcrafted artisanal sweets by Sattu Halwai Ajmer"
              width={800}
              height={600}
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
            <div className="p-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                Master Halwai Concierge
              </span>
              <h3 className="mt-2 font-display text-2xl">Book Sattu Halwai for Your Wedding</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Plan live sweet counters, wedding bhaji boxes, and full dessert menus with master
                halwai Satyanarayan Prajapati.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button variant="royal" className="w-full sm:w-auto" asChild>
                  <Link to="/book">
                    Halwai Inquiry <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" asChild>
                  <a href={`tel:${BUSINESS_CONFIG.telephone}`}>
                    <Phone className="size-4" /> Call +91 94604 26952
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Sweets Section */}
      <section className="border-t border-border bg-secondary/30 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              Artisanal Repertoire
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl">
              Signature Halwai Creations for Weddings
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Handmade in small batches by our experienced halwai artisans using pure ghee,
              pistachios, almonds, and saffron.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border border-border bg-card p-6 rounded-sm">
              <Sparkles className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Rose Kesar Dry Fruit Mithai</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Our chef signature sweet featuring rich dry fruits enveloped in dried Damask rose
                petals with a fragrant kesar heart.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <ChefHat className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Live Jalebi & Laccha Rabdi</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Crispy, thin golden jalebis fried live in pure desi ghee and plunged into saffron
                cardamom syrup, served with slow-boiled thick rabdi.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <Heart className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Mini Mawa Kachori</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Delicate, flaky crusts stuffed with sweetened mawa, saffron, and crushed dry fruits,
                glazed with fragrant sugar syrup.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <Gift className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Wedding Bhaji Gift Boxes</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Custom designer sweet boxes filled with assorted artisanal mithai, dry fruit bites,
                and silver-embellished sweets for invitations and favors.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <UtensilsCrossed className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Rose Mawa Cups</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Golden roasted mawa cups filled with delicate rose infused delicacies, sculpted
                specifically for reception dessert displays.
              </p>
            </div>
            <div className="border border-border bg-card p-6 rounded-sm">
              <ShieldCheck className="size-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">Ghevar & Malpua Pavilion</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Traditional honeycomb Ghevar topped with malai and rabdi, and miniature warm malpuas
                prepared live at reception dinner counters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cross Links */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl border border-border bg-card p-8 rounded-sm">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Full Event Services
              </p>
              <h2 className="mt-2 font-display text-3xl">
                Pair Halwai Craft with Complete Catering
              </h2>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                Sattu Halwai provides both independent halwai bhattis and end-to-end wedding
                banquets across Ajmer, Pushkar, and Kishangarh.
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
                <Link to="/rajasthani-catering-ajmer">
                  Rajasthani Thaal Menus <ArrowRight className="size-3.5" />
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
              Halwai Queries
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl">Frequently Asked Questions</h2>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              Essential information on booking wedding halwai and sweet counters with Sattu Halwai
              Ajmer.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-12">
            {halwaiFaqs.map((f, i) => (
              <AccordionItem key={i} value={`halwai-${i}`} className="border-border">
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
            Reserve Sattu Halwai for Your Celebration
          </h2>
          <p className="mt-4 text-sm text-primary-foreground/80 max-w-2xl mx-auto leading-7">
            Taste our sweets in advance. Speak with Satyanarayan Prajapati today to finalize your
            wedding sweets and live halwai bhatti requirements.
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
