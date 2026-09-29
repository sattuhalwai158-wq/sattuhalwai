import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { buildPageHead, buildBreadcrumbSchema } from "@/components/seo";

export const Route = createFileRoute("/booking-policy")({
  head: () =>
    buildPageHead({
      title: "Booking & Cancellation Policy | N Sattu Cuisine",
      description:
        "Booking, advance payment, guest count, and cancellation policies for wedding and event catering with N Sattu Cuisine in Ajmer.",
      path: "/booking-policy",
      structuredData: [
        buildBreadcrumbSchema([{ name: "Booking Policy", path: "/booking-policy" }]),
      ],
    }),
  component: Policy,
});
function Policy() {
  return (
    <LegalPage
      title="Booking & cancellation"
      intro="Every celebration is planned individually. Your proposal will contain the exact commercial terms that apply to your date."
      sections={[
        {
          heading: "Date confirmation",
          body: "Dates remain subject to availability until the proposal is accepted and the specified advance is received. Advance amounts and payment milestones are stated in your written proposal.",
        },
        {
          heading: "Guest count and menu",
          body: "Final menu, service format, dietary requirements and guaranteed guest count must be confirmed within the timeline stated in your event agreement.",
        },
        {
          heading: "Rescheduling",
          body: "We will make reasonable efforts to accommodate a new date, subject to team and venue availability. Seasonal rate changes and committed third-party costs may apply.",
        },
        {
          heading: "Cancellation",
          body: "Cancellation terms, including treatment of advances and costs already incurred, vary by event and are set out before booking. Please review and accept them before payment.",
        },
        {
          heading: "Wedding season",
          body: "Peak wedding dates have limited availability. Early communication gives us the best chance to support a requested change.",
        },
      ]}
    />
  );
}
