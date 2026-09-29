import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, User, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildPageHead, buildBreadcrumbSchema } from "@/components/seo";
import { absoluteUrl, BUSINESS_CONFIG } from "@/lib/site-config";

export const Route = createFileRoute("/blog/rajasthani-wedding-food-menu")({
  head: () =>
    buildPageHead({
      title: "Royal Rajasthani Wedding Food Menu Guide | N Sattu Cuisine",
      description:
        "Comprehensive guide to crafting an authentic royal Rajasthani wedding menu: Dal Baati Churma varieties, desert Ker Sangri, Gatte, and pure desi ghee sweets.",
      path: "/blog/rajasthani-wedding-food-menu",
      ogImage: "/media/rajasthani-stall.jpg",
      ogType: "article",
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "The Ultimate Rajasthani Wedding Food Menu Guide: From Dal Baati to Royal Mithai",
          description:
            "Discover how to compose an authentic Rajasthani wedding menu: Dal Baati Churma varieties, desert Ker Sangri, live jalebi counters, and pure desi ghee sweets.",
          image: absoluteUrl("/media/rajasthani-stall.jpg"),
          author: {
            "@type": "Person",
            name: "Chanchal Prajapati",
          },
          publisher: {
            "@type": "Organization",
            name: BUSINESS_CONFIG.name,
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl(BUSINESS_CONFIG.logo),
            },
          },
          datePublished: "2026-03-01",
          dateModified: "2026-03-01",
          mainEntityOfPage: absoluteUrl("/blog/rajasthani-wedding-food-menu"),
        },
        buildBreadcrumbSchema([
          { name: "Blog", path: "/blog" },
          { name: "Rajasthani Wedding Food Menu", path: "/blog/rajasthani-wedding-food-menu" },
        ]),
      ],
    }),
  component: RajasthaniWeddingFoodMenuGuide,
});

function RajasthaniWeddingFoodMenuGuide() {
  return (
    <>
      <PageIntro
        eyebrow="Culinary Heritage • शाही भोजन का स्वाद"
        title="Royal Rajasthani Wedding Menu Guide."
        copy="An authentic course-by-course blueprint for planning an unforgettable Marwari celebration menu in Ajmer, Pushkar, and Kishangarh."
      />

      <div className="border-b border-border bg-secondary/40 px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { label: "Blog", to: "/blog" },
              { label: "Rajasthani Wedding Food Menu Guide" },
            ]}
          />
        </div>
      </div>

      <article className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-b border-border pb-6">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-3.5 text-gold" /> Chanchal Prajapati
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5 text-gold" /> March 1, 2026
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-gold" /> 7 min read
            </span>
            <span>•</span>
            <span className="text-primary font-semibold uppercase">Traditional Menu Design</span>
          </div>

          <div className="mt-8 overflow-hidden rounded-sm border border-border">
            <img
              src="/media/rajasthani-stall.jpg"
              alt="Authentic Rajasthani wedding food menu and thaal"
              width={1200}
              height={675}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>

          <div className="mt-10 space-y-8 text-base leading-8 text-muted-foreground">
            <p className="text-lg font-medium text-foreground leading-relaxed">
              A Rajasthani wedding feast is a royal symphony of textures and aromas. Across Marwar
              and Mewar, the wedding banquet is designed to showcase generosity, heritage
              craftsmanship, and the unmatched purity of desi ghee. Here is how we recommend
              curating an authentic multi-course wedding menu.
            </p>

            <h2 className="font-display text-3xl text-foreground">
              1. The Royal Centerpiece: Dal Baati Churma
            </h2>
            <p>
              No wedding in Ajmer, Pushkar, or Kishangarh is complete without{" "}
              <strong>Dal Baati Churma</strong>. However, a luxury wedding banquet elevates this
              from a humble household dish into a feast fit for royalty:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Baati Selection:</strong> Classical plain wheat baati, Masala baati stuffed
                with spiced peas and cashews, and Dry-fruit baati.
              </li>
              <li>
                <strong>Panchmel Dal:</strong> A slow-simmered blend of five lentils tempered with
                pure ghee, whole asafoetida (heeng), cumin, and Kashmiri deghi chili.
              </li>
              <li>
                <strong>Churma Trio:</strong> Rose Gulab Churma, Kesar Dry Fruit Churma, and roasted
                Besan Churma generously soaked in desi ghee.
              </li>
            </ul>

            <h2 className="font-display text-3xl text-foreground">2. Heritage Desert Curries</h2>
            <p>
              The desert heritage of Rajasthan is celebrated through prized indigenous ingredients:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Ker Sangri:</strong> Braised desert wild berries and beans prepared in
                mustard oil with whole red chilies, fenugreek, and sweet raisins.
              </li>
              <li>
                <strong>Govind Gatta:</strong> Besan dumplings filled with rich mawa and dry fruits,
                poached in a luscious yogurt gravy.
              </li>
              <li>
                <strong>Pithore ki Sabzi:</strong> Spiced besan diamond cakes simmered in a spiced
                curry—a cherished heirloom recipe.
              </li>
              <li>
                <strong>Marwari Kadhi:</strong> Tangy, heeng-infused buttermilk kadhi served piping
                hot with boondi.
              </li>
            </ul>

            <h2 className="font-display text-3xl text-foreground">
              3. Fresh Breads from the Bhatti
            </h2>
            <p>
              Traditional breads should be served straight from the tandoor and iron bhattis to
              every table: fresh Missi Roti made with gram flour and fenugreek leaves, winter Bajra
              Roti paired with freshly churned white makhan (butter) and natural organic jaggery
              (gud), alongside soft butter naans and crisp pooris.
            </p>

            <h2 className="font-display text-3xl text-foreground">
              4. Artisanal Halwai Mithai Pavilion
            </h2>
            <p>The sweet finale must showcase the master halwai's talent:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Live Desi Ghee Jalebi:</strong> Swirled live in pure ghee, dipped in
                cardamom syrup, and accompanied by slow-reduced thick laccha rabdi.
              </li>
              <li>
                <strong>Rose Kesar Dry Fruit Mithai:</strong> Handcrafted mawa sweets sculpted with
                edible rose petals.
              </li>
              <li>
                <strong>Mini Mawa Kachori:</strong> Crisp pastry pockets bursting with
                saffron-sweetened mawa and crushed nuts.
              </li>
              <li>
                <strong>Ghevar & Malpua:</strong> Seasonal delights topped with pistachio slivers
                and silver leaf.
              </li>
            </ul>
          </div>

          <div className="mt-14 rounded-sm border border-gold/40 bg-secondary/50 p-8">
            <h3 className="font-display text-2xl text-foreground">
              Craft Your Wedding Menu With Master Halwais
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Contact Satyanarayan Prajapati and our catering team to compose an authentic
              Rajasthani menu tailored to your guests and venue.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button variant="royal" asChild>
                <Link to="/book">
                  Request Custom Menu Quote <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/rajasthani-catering-ajmer">View Rajasthani Catering Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
