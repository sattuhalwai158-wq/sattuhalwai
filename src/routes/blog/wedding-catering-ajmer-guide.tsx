import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  User,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildPageHead, buildBreadcrumbSchema } from "@/components/seo";
import { absoluteUrl, BUSINESS_CONFIG } from "@/lib/site-config";

export const Route = createFileRoute("/blog/wedding-catering-ajmer-guide")({
  head: () =>
    buildPageHead({
      title: "Planning Wedding Catering in Ajmer: The Complete Host's Guide",
      description:
        "Practical checklist and guide for planning wedding catering in Ajmer: seasonal menus, guest estimations, tasting protocols, venue setups & live counters.",
      path: "/blog/wedding-catering-ajmer-guide",
      ogImage: "/media/buffet-6.jpg",
      ogType: "article",
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How to Plan Wedding Catering in Ajmer: The Complete Host's Guide",
          description:
            "Practical guide to planning wedding catering in Ajmer: budgeting, choosing venues, selecting traditional Rajasthani menus, and arranging tastings.",
          image: absoluteUrl("/media/buffet-6.jpg"),
          author: {
            "@type": "Person",
            name: "Satyanarayan Prajapati",
          },
          publisher: {
            "@type": "Organization",
            name: BUSINESS_CONFIG.name,
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl(BUSINESS_CONFIG.logo),
            },
          },
          datePublished: "2026-02-15",
          dateModified: "2026-02-15",
          mainEntityOfPage: absoluteUrl("/blog/wedding-catering-ajmer-guide"),
        },
        buildBreadcrumbSchema([
          { name: "Blog", path: "/blog" },
          { name: "Wedding Catering Ajmer Guide", path: "/blog/wedding-catering-ajmer-guide" },
        ]),
      ],
    }),
  component: WeddingCateringAjmerGuide,
});

function WeddingCateringAjmerGuide() {
  return (
    <>
      <PageIntro
        eyebrow="Wedding Host’s Guide • आयोजन मार्गदर्शिका"
        title="How to Plan Wedding Catering in Ajmer."
        copy="A practical, step-by-step handbook covering timeline budgeting, seasonal Rajasthani menus, guest calculations, and live counter theatrics."
      />

      <div className="border-b border-border bg-secondary/40 px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            items={[{ label: "Blog", to: "/blog" }, { label: "Wedding Catering in Ajmer Guide" }]}
          />
        </div>
      </div>

      <article className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-b border-border pb-6">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-3.5 text-gold" /> Satyanarayan Prajapati
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5 text-gold" /> February 15, 2026
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-gold" /> 6 min read
            </span>
            <span>•</span>
            <span className="text-primary font-semibold uppercase">Ajmer Wedding Planning</span>
          </div>

          <div className="mt-8 overflow-hidden rounded-sm border border-border">
            <img
              src="/media/buffet-6.jpg"
              alt="Luxury wedding catering setup in Ajmer"
              width={1200}
              height={675}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>

          <div className="mt-10 space-y-8 text-base leading-8 text-muted-foreground">
            <p className="text-lg font-medium text-foreground leading-relaxed">
              When relatives and wedding guests recount an Indian wedding, the warmth of the
              hospitality and the flavour of the food are remembered above all else. In Ajmer, with
              its blend of historic heritage venues, modern wedding lawns along Anasagar Circular
              Road, and picturesque resorts, planning catering requires balancing customary
              traditions with contemporary presentation.
            </p>

            <h2 className="font-display text-3xl text-foreground">
              1. Determine the Seasonal Nuances of Your Menu
            </h2>
            <p>
              Rajasthan’s climate dictates seasonal tastes. A winter wedding in Ajmer (November to
              February) calls for rich, warming dishes: authentic <em>Dal Baati Churma</em> with
              desi ghee, hot <em>Gond ke Laddu</em>, <em>Gajar ka Halwa</em>,{" "}
              <em>Bajra Roti with fresh white butter</em>, and steaming kulhad kesar milk at
              midnight.
            </p>
            <p>
              Conversely, for spring or summer weddings, refresh guests with chilled mint chaas,
              thandai counters, rose sharbats, seasonal kulfi pavilions, and lighter vegetable
              curries alongside the staple Marwari specialties.
            </p>

            <h2 className="font-display text-3xl text-foreground">
              2. Calculate Realistic Guest Counts and Buffers
            </h2>
            <p>
              In Ajmer, joint families and community networks often mean significant variation
              between confirmed RSVP and actual attendance. We recommend planning for your realistic
              core guest count while confirming a 10% to 15% flexible buffer with your caterer.
              Ensure your caterer maintains live backup cooking capabilities so fresh batches can be
              prepared rapidly without food wastage.
            </p>

            <h2 className="font-display text-3xl text-foreground">
              3. Design Theatrical Live Stalls to Prevent Buffet Congestion
            </h2>
            <p>
              A common challenge at wedding banquets is overcrowding at the main buffet line.
              Strategic placement of interactive live counters solves this effortlessly:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Hot Bread & Tandoor Station:</strong> Live Missi Roti, naan, and stuffed
                kulchas baked fresh on clay tandoors.
              </li>
              <li>
                <strong>Theatrical Chaat Galli:</strong> Fresh Golgappe with 5 flavored waters,
                Moong Dal Chilla, and hot Tikki with curd.
              </li>
              <li>
                <strong>Live Sweet Bhatti:</strong> Thin, crispy Jalebis fried live in pure desi
                ghee and paired with saffron rabdi.
              </li>
            </ul>

            <h2 className="font-display text-3xl text-foreground">
              4. Insist on an Advance Kitchen Tasting Session
            </h2>
            <p>
              Never finalize a caterer solely based on a printed menu brochure. Reputable caterers
              welcome hosts to visit their production kitchen. At N Sattu Cuisine, we host private
              family tasting sessions at our Ajmer kitchen where couples can taste their prospective
              dishes, calibrate spice levels, and inspect serveware styling.
            </p>

            <h2 className="font-display text-3xl text-foreground">
              5. Verify Separate Utensils for Jain Guests
            </h2>
            <p>
              Respecting dietary restrictions is paramount in Marwari celebrations. Ensure that your
              caterer does not simply offer an onion-garlic-free dish from the general kitchen, but
              maintains dedicated cookware, ladles, and demarcated service counters.
            </p>
          </div>

          <div className="mt-14 rounded-sm border border-gold/40 bg-secondary/50 p-8">
            <h3 className="font-display text-2xl text-foreground">
              Plan Your Wedding Menu with N Sattu Cuisine
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Our directors Nathu Ji Prajapati, Satyanarayan Prajapati, and Chanchal Prajapati
              invite you to discuss your wedding plans with us. We cater events across Ajmer,
              Pushkar, and Kishangarh.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button variant="royal" asChild>
                <Link to="/book">
                  Schedule a Tasting & Quote <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/wedding-catering-ajmer">Explore Ajmer Catering Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
