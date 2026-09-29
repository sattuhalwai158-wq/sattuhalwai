import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageIntro } from "@/components/site-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useItems } from "@/lib/site-items";
import { buildPageHead, buildBreadcrumbSchema, buildFaqSchema } from "@/components/seo";

export const Route = createFileRoute("/reviews")({
  head: () =>
    buildPageHead({
      title: "Wedding Catering Reviews Ajmer & Pushkar | Client Testimonials",
      description:
        "Read real host reviews from wedding families across Ajmer, Pushkar and Kishangarh. Verified client experiences of royal catering, live counters, and halwai sweets.",
      path: "/reviews",
      ogImage: "/media/buffet-28.jpg",
      structuredData: [
        buildBreadcrumbSchema([{ name: "Reviews & FAQ", path: "/reviews" }]),
        buildFaqSchema([
          {
            question: "Which places do you cater in?",
            answer: "We cater celebrations in Ajmer, Pushkar and Kishangarh, Rajasthan.",
          },
          {
            question: "Do you make pure Jain food? (जैन भोजन)",
            answer:
              "Yes. Separate Jain cooking, utensils and live counters without onion and garlic can be arranged.",
          },
          {
            question: "How many guests can you serve?",
            answer: "From intimate functions of 100 guests to grand weddings of 5,000 or more.",
          },
          {
            question: "Can we taste the food before booking?",
            answer: "Yes. Tasting sessions are arranged by appointment at our Ajmer kitchen.",
          },
          {
            question: "Do you provide serveware and buffet décor?",
            answer:
              "Yes. We bring complete royal brass, copper and custom LED thematic buffet installations.",
          },
        ]),
      ],
    }),
  component: Reviews,
});

function Reviews() {
  const testimonials = useItems("testimonial").map((t) => [t.quote, t.name, t.venue, t.date]);
  const faqs = useItems("faq").map((f) => [f.q ?? "", f.a ?? ""]);

  return (
    <>
      <PageIntro
        eyebrow="Client love • ग्राहकों की राय"
        title="Remembered long after the last course."
        copy="A celebration is judged in shared moments: a warm plate arriving on time, an old family flavour recognised, a guest asking for one more jalebi."
      />

      <div className="border-b border-border bg-secondary/40 px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: "Reviews & FAQs" }]} />
        </div>
      </div>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(([q, n, v, d]) => (
            <article key={`${n}${q}`} className="bg-background p-7">
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-8 font-display text-2xl leading-8">“{q}”</blockquote>
              <div className="mt-8 border-t border-border pt-5">
                <p className="font-semibold">{n}</p>
                <p className="text-xs text-muted-foreground">
                  {v} • {d}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-xs font-bold uppercase text-primary">Questions, answered</p>
            <h2 className="mt-4 font-display text-5xl">Planning with confidence.</h2>
          </div>
          <Accordion type="single" collapsible>
            {faqs.map(([q, a], i) => (
              <AccordionItem key={q} value={`f${i}`} className="border-border">
                <AccordionTrigger className="py-6 font-display text-xl hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-6 leading-7 text-muted-foreground">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
