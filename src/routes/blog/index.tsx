import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { PageIntro } from "@/components/site-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildPageHead, buildBreadcrumbSchema } from "@/components/seo";
import { BLOG_POSTS } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/")({
  head: () =>
    buildPageHead({
      title: "Wedding Catering Guides & Menu Insights | N Sattu Cuisine Blog",
      description:
        "Expert guides, menu planning tips, and culinary heritage articles for planning weddings and celebrations in Ajmer, Pushkar, and Kishangarh.",
      path: "/blog",
      ogImage: "/media/buffet-6.jpg",
      structuredData: [buildBreadcrumbSchema([{ name: "Blog", path: "/blog" }])],
    }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <PageIntro
        eyebrow="Catering Journal & Guides • खानपान और आयोजन की जानकारी"
        title="Wedding Catering Guides & Insights."
        copy="Practical planning advice, authentic regional recipe histories, and menu composition tips from our master halwais and wedding banquet directors."
      />

      <div className="border-b border-border bg-secondary/40 px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: "Blog & Guides" }]} />
        </div>
      </div>

      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden border border-border bg-card rounded-sm shadow-soft hover:shadow-lift transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={450}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-7">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-semibold uppercase tracking-wider text-primary">
                        {post.category}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" /> {post.readTime}
                      </span>
                    </div>

                    <h2 className="mt-3 font-display text-2xl sm:text-3xl leading-snug group-hover:text-primary transition-colors">
                      <Link
                        to={
                          post.slug === "wedding-catering-ajmer-guide"
                            ? "/blog/wedding-catering-ajmer-guide"
                            : "/blog/rajasthani-wedding-food-menu"
                        }
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="mt-4 text-xs leading-6 text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-xs text-muted-foreground">By {post.author}</span>
                    <Link
                      to={
                        post.slug === "wedding-catering-ajmer-guide"
                          ? "/blog/wedding-catering-ajmer-guide"
                          : "/blog/rajasthani-wedding-food-menu"
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                    >
                      Read Guide <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
