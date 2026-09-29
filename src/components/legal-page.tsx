import { PageIntro } from "@/components/site-shell";

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: { heading: string; body: string }[] }) {
  return <><PageIntro eyebrow="N-Sattu Cuisine" title={title} copy={intro}/><section className="px-5 py-16 lg:px-8"><div className="mx-auto max-w-3xl space-y-10">{sections.map(section=><article key={section.heading} className="border-b border-border pb-10"><h2 className="font-display text-3xl">{section.heading}</h2><p className="mt-4 leading-8 text-muted-foreground">{section.body}</p></article>)}<p className="text-sm text-muted-foreground">For questions, call +91 94604 26952. Last updated: September 2026.</p></div></section></>;
}