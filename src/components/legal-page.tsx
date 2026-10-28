import { Link } from "@tanstack/react-router";
import { BUSINESS_CONFIG } from "@/lib/site-config";
import { PageIntro } from "@/components/site-shell";

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <PageIntro eyebrow="N-Sattu Cuisine" title={title} copy={intro} />
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto legal-copy max-w-3xl space-y-10">
          <nav
            aria-label="On this page"
            className="rounded-lg border border-border bg-secondary/50 p-6"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              On this page
            </p>
            <ol className="space-y-1">
              {sections.map((section, index) => (
                <li key={section.heading}>
                  <a
                    href={`#policy-${index}`}
                    className="block py-2 text-sm text-primary underline-offset-4 hover:underline"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          {sections.map((section, index) => (
            <article
              id={`policy-${index}`}
              key={section.heading}
              className="border-b border-border pb-10"
            >
              <h2 className="font-display text-3xl">{section.heading}</h2>
              <p className="mt-4 leading-8 text-muted-foreground">{section.body}</p>
            </article>
          ))}
          <p className="text-sm text-muted-foreground">
            For questions, call{" "}
            <a
              className="text-primary underline underline-offset-4"
              href={`tel:${BUSINESS_CONFIG.telephone.replace(/\s/g, "")}`}
            >
              {BUSINESS_CONFIG.telephone}
            </a>
            . Last updated: September 2026.
          </p>
          <Link
            to="/book"
            className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4"
          >
            Discuss your event with us →
          </Link>
        </div>
      </section>
    </>
  );
}
