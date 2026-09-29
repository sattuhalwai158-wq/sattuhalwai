import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { buildPageHead, buildBreadcrumbSchema } from "@/components/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildPageHead({
      title: "Terms of Service | N Sattu Cuisine",
      description:
        "General terms of service and inquiry conditions for catering and events arranged with N Sattu Cuisine in Ajmer.",
      path: "/terms",
      structuredData: [buildBreadcrumbSchema([{ name: "Terms of Service", path: "/terms" }])],
    }),
  component: Terms,
});
function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      intro="These terms explain the basis on which website inquiries and catering discussions begin."
      sections={[
        {
          heading: "Website information",
          body: "Menus, imagery and descriptions are presented for guidance. Final availability, presentation and scope are confirmed in a written proposal for each event.",
        },
        {
          heading: "Catering proposals",
          body: "An inquiry does not reserve a date. A booking is confirmed only after both parties accept the final proposal and the agreed advance payment is received.",
        },
        {
          heading: "Client responsibilities",
          body: "Clients are responsible for providing accurate venue, timing, guest count, dietary and access information within the agreed planning schedule.",
        },
        {
          heading: "Event changes",
          body: "Material changes to date, venue, service hours, guest count or menu may affect pricing and availability. Any revision must be agreed in writing.",
        },
        {
          heading: "Liability",
          body: "Responsibilities, limitations and force majeure arrangements will be set out in the event-specific catering agreement.",
        },
      ]}
    />
  );
}
