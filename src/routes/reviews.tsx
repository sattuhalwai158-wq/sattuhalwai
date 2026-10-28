import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PublishedReviews, ReviewForm } from "@/components/customer-reviews";
import { MessageCircle, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageIntro } from "@/components/site-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EnquiryBanner, QueryNotice } from "@/components/page-sections";
import { Button } from "@/components/ui/button";
import { useItems, useAllItems } from "@/lib/site-items";
import { buildPageHead, buildBreadcrumbSchema } from "@/components/seo";

export const Route = createFileRoute("/reviews")({
  head: () =>
    buildPageHead({
      title: "Reviews & Catering Questions | N Sattu Cuisine",
      description:
        "Plan your celebration with answers to catering questions, menu guidance and a direct conversation with N Sattu Cuisine.",
      path: "/reviews",
      structuredData: [buildBreadcrumbSchema([{ name: "Reviews & FAQ", path: "/reviews" }])],
    }),
  component: Reviews,
});
function Reviews() {
  const hash = useRouterState({ select: (state) => state.location.hash });
  const [formOpen, setFormOpen] = useState(false);
  useEffect(() => {
    if (hash === "share-review") setFormOpen(true);
  }, [hash]);
  useEffect(() => {
    if (!formOpen) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById("share-review")?.scrollIntoView({ block: "start" });
      document.getElementById("review-name")?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [formOpen]);
  const faqs = useItems("faq").filter((item) => item.q && item.a);
  const query = useAllItems();
  return (
    <>
      <PageIntro
        eyebrow="A conversation worth having • सवाल और जवाब"
        title="Plan with clarity. Celebrate with confidence."
        copy="From tasting to service, thoughtful planning makes the difference. Find answers below or speak to our team about your celebration."
      />
      <div className="border-b border-border px-5 py-4">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: "Reviews & FAQ" }]} />
        </div>
      </div>
      <PublishedReviews formOpen={formOpen} onShare={() => setFormOpen(true)} />
      <div id="review-form-panel" hidden={!formOpen}>
        <div className="mx-auto flex max-w-7xl justify-end px-5 pt-4 lg:px-8">
          <Button variant="outline" onClick={() => {
            setFormOpen(false);
            document.getElementById("share-review-trigger")?.focus();
          }}>Hide form</Button>
        </div>
        <ReviewForm />
      </div>
      <section className="border-t border-border bg-secondary/40 px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Questions, answered
            </p>
            <h2 className="mt-4 font-display text-4xl">A little guidance for your gathering.</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Every event has its own needs. Confirm the details of your arrangements with our team
              before booking.
            </p>
          </div>
          <div>
            {query.isError && (
              <QueryNotice
                retry={() => {
                  void query.refetch();
                }}
              />
            )}
            <Accordion type="single" collapsible>
              {faqs.map((item, index) => (
                <AccordionItem key={item.q} value={`question-${index}`}>
                  <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl pb-6 text-base leading-8 text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {!faqs.length && (
              <p className="py-6 text-sm leading-7 text-muted-foreground">
                Have a catering question? Contact our team for help with your event.
              </p>
            )}
          </div>
        </div>
      </section>
      <EnquiryBanner />
    </>
  );
}
