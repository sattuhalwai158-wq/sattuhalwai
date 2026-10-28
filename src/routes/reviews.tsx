import { createFileRoute, Link } from "@tanstack/react-router";
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
      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-border bg-card p-6 sm:p-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <MessageCircle className="size-8 text-primary" />
            <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-primary">
              Before you choose
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              Get to know the people behind your menu.
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="leading-8 text-muted-foreground">
              Explore our event photography and discuss your venue, menu and service expectations
              directly with the team. If you’d like a customer reference, ask us during your
              consultation.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Customer reviews will appear here once their source and permission to publish have
              been confirmed.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="royal" asChild>
                <Link to="/book">
                  Arrange a conversation <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/setups" hash="gallery">
                  Explore the gallery
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
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
