import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChefHat, ClipboardList, Gem, MapPin, ShieldCheck, Sparkles, Star, UtensilsCrossed } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/content";
import { useItems } from "@/lib/site-items";
import { pageMeta } from "@/components/seo";
import { useContent, useMedia } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => pageMeta("N-Sattu Cuisine | Luxury Royal Wedding Catering", "Royal wedding feasts, artisanal mithai and theatrical live counters from Ajmer for celebrations in Ajmer, Pushkar & Kishangarh."),
  component: Index,
});

const experiences = [
  [Gem, "Grand Royal Banquets", "Royal thaals and lavish multi-cuisine buffets composed for destination celebrations.", images.banquet],
  [Sparkles, "Artisanal Mithai Vault", "Sculpted sweets, slow-roasted mawa and premium dry fruits crafted in-house.", images.delicacies],
  [ChefHat, "Theatrical Live Counters", "Jalebi, tandoor, chaat and global flavours finished before your guests.", images.liveCounter],
  [ShieldCheck, "Palace Buffet Staging", "Brass, copper and bespoke illuminated presentations made for grand rooms.", images.banquet],
] as const;

function SectionTitle({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <div className="mx-auto max-w-3xl text-center"><p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">{eyebrow}</p><h2 className={`mt-4 font-display text-4xl leading-tight sm:text-5xl ${light ? "text-primary-foreground" : "text-foreground"}`}>{title}</h2><div className="mx-auto mt-5 flex items-center justify-center gap-3"><span className="h-px w-14 bg-gold"/><span className="size-1.5 rotate-45 bg-gold"/><span className="h-px w-14 bg-gold"/></div>{copy && <p className={`mx-auto mt-5 max-w-2xl leading-7 ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{copy}</p>}</div>;
}

function ImageCard({ image, title, label, to, position = "50% 50%", tall = false }: { image: string; title: string; label?: string; to: "/menus" | "/setups" | "/about" | "/book"; position?: string; tall?: boolean }) {
  return <Link to={to} className={`group relative block overflow-hidden rounded-sm bg-obsidian ${tall ? "aspect-[3/4]" : "aspect-[4/5]"}`}><img src={image} alt={title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: position }}/><div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-obsidian/10 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">{label && <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{label}</p>}<h3 className="mt-2 font-display text-2xl leading-tight">{title}</h3><span className="mt-3 inline-flex items-center gap-2 border-b border-gold pb-1 text-xs font-semibold uppercase tracking-widest text-gold">Explore more <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1"/></span></div></Link>;
}

const process = [
  [ClipboardList, "01", "Plan • योजना", "We meet your family, understand every function and suggest a menu that fits your guests and budget."],
  [UtensilsCrossed, "02", "Taste • चखें", "Visit our Ajmer kitchen for a tasting session and fine-tune every dish before the big day."],
  [ChefHat, "03", "Serve • परोसें", "Our halwais, chefs and staff set up, cook live and serve with royal hospitality till the last guest."],
] as const;


function Index() {
  const heroMedia = useMedia("hero");
  const signatures = useMedia("signatures");
  const journey = useMedia("journey");
  const videos = useMedia("videos");
  const text = useContent();
  const dishes = useItems("dish");
  const setups = useItems("setup");
  const testimonials = useItems("testimonial").map(t => [t.quote, t.name, t.venue] as const);
  const faqs = useItems("faq").map(f => [f.q ?? "", f.a ?? ""] as const);
  const stats = useItems("stat").map(x => [x.value, x.label, x.hi] as const);
  const destinations = useItems("destination").map(x => [x.place, x.hi, x.image] as const);
  const serviceIcons = [Gem, Sparkles, ChefHat, ShieldCheck];
  const heroImages = heroMedia.filter(m => m.media_type === "image");
  const slides = heroImages.length ? heroImages.map(m => m.url) : [images.delicacies];
  const [slide, setSlide] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setSlide(value => (value + 1) % slides.length), 5000); return () => window.clearInterval(timer); }, [slides.length]);
  const featured = signatures.length ? signatures.slice(0, 3).map(m => ({ key: m.id, image: m.url, title: m.title || "Chef signature", label: m.caption || "Signature mithai", position: "50% 50%" })) : dishes.slice(0, 3).map(d => ({ key: d.title ?? "", image: d.image ?? "", title: d.title ?? "", label: d.local ?? "", position: "50% 50%" }));
  const services = useItems("service").map((x, i) => [serviceIcons[i % 4] ?? Gem, x.title, x.hi, x.image] as const);
  return <>
    <section className="relative mt-20 h-[calc(100svh-5rem)] min-h-[620px] overflow-hidden bg-hero-ink md:mt-28 md:h-[calc(100svh-7rem)]">
      {slides.map((image, index) => <img key={image} src={image} alt={heroImages[index]?.title || "N-Sattu Cuisine royal catering"} className={`absolute inset-0 size-full object-cover saturate-[1.08] contrast-[1.04] transition-all duration-1000 ${slide === index ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"}`}/>)}
      <div className="absolute inset-0 bg-gradient-to-b from-hero-ink/40 via-hero-ink/15 to-hero-ink/65"/>
      <div className="relative mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-5 text-center animate-rise">
        <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-gold drop-shadow-sm">N-Sattu Cuisine</p>
        <div className="mt-4 flex items-center gap-4"><span className="h-px w-10 bg-gold/60"/><p className="text-[10px] font-medium uppercase tracking-[0.28em] text-hero-foreground sm:text-[11px]">{text("home_eyebrow","Royal Wedding & Event Catering Specialist")}</p><span className="h-px w-10 bg-gold/60"/></div>
        <h1 className="mt-7 font-display text-5xl font-medium leading-[0.95] text-hero-foreground drop-shadow-lg sm:text-7xl lg:text-8xl">{text("home_title","The Art of Royal Catering.")}</h1>
        <p className="mt-7 max-w-2xl text-base leading-7 text-hero-foreground/90 sm:text-lg sm:leading-8">{text("home_subtitle","Where every bite becomes a memory—authentic Rajasthani feasts, artisanal sweets and live food stalls in Ajmer, Pushkar & Kishangarh.")}</p>
        <div className="mt-9 flex w-full max-w-md flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row"><Button variant="royal" size="lg" className="h-12 px-9 uppercase tracking-wider" asChild><Link to="/book">Plan your celebration <ArrowRight/></Link></Button><Button size="lg" variant="ghost" className="h-12 border border-hero-foreground/60 bg-hero-ink/10 px-9 uppercase tracking-wider text-hero-foreground backdrop-blur-sm hover:bg-hero-foreground/15 hover:text-hero-foreground" asChild><Link to="/menus">Explore menus</Link></Button></div>
      </div>
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1">{slides.map((_, index) => <button key={index} aria-label={`Show image ${index + 1}`} onClick={() => setSlide(index)} className="grid size-9 place-items-center"><span className={`block h-px transition-all ${slide === index ? "w-8 bg-gold" : "w-4 bg-hero-foreground/70"}`}/></button>)}</div>
    </section>

    <section className="border-b border-border bg-background px-6 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-[4/5] overflow-hidden border border-gold/30 bg-secondary p-3">
          <img
            src={images.masterHalwai}
            alt="N-Sattu Cuisine team preparing a royal celebration"
            className="size-full object-cover"
          />
          <div className="absolute inset-x-8 bottom-8 border-l-2 border-gold bg-background/95 p-5 shadow-soft">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Authentic & Heritage • प्रामाणिक परंपरा
            </p>
            <p className="mt-2 font-display text-2xl">Ajmer • Pushkar • Kishangarh</p>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            Our story • हमारी कहानी
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
            A family-led legacy of royal hospitality.
          </h2>
          <div className="mt-5 h-px w-20 bg-gold" />
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            At N SATTU CUISINE, we take pride in serving authentic, home-style flavors that have been passed down through generations. We are committed to making every event memorable with delectable dishes crafted from the finest ingredients and unmatched service tailored to your needs.
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            <div className="border-l-2 border-gold bg-secondary p-4">
              <p className="text-[11px] font-semibold uppercase text-primary">Founder • संस्थापक</p>
              <h3 className="mt-2 font-display text-xl">Nathu Ji Prajapati</h3>
              <p className="mt-1 text-xs text-muted-foreground">Culinary Traditions</p>
            </div>
            <div className="border-l-2 border-gold bg-secondary p-4">
              <p className="text-[11px] font-semibold uppercase text-primary">Managing Director • MD</p>
              <h3 className="mt-2 font-display text-xl">Satyanarayan Prajapati</h3>
              <p className="mt-1 text-xs text-muted-foreground">Quality & Authenticity</p>
            </div>
            <div className="border-l-2 border-gold bg-secondary p-4">
              <p className="text-[11px] font-semibold uppercase text-primary">CEO • मुख्य कार्यकारी</p>
              <h3 className="mt-2 font-display text-xl">Chanchal Prajapati</h3>
              <p className="mt-1 text-xs text-muted-foreground">Exquisite Celebrations</p>
            </div>
          </div>
          <Button variant="regalOutline" className="mt-8" asChild>
            <Link to="/about">
              Read our heritage <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>

    <section className="px-6 py-24 lg:py-32"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Signature creations • खास पकवान" title="Crafted for the royal table." copy="Handmade in pure desi ghee by our master halwais — the dishes our hosts remember long after the wedding."/><div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map(f => <ImageCard key={f.key} to="/menus" image={f.image} title={f.title} label={f.label} position={f.position}/>)}</div></div></section>

    <section className="border-y border-gold/30 bg-secondary px-6 py-16"><div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 md:grid-cols-4">{stats.map(([value,label,hi]) => <div key={label} className="relative px-4 text-center md:after:absolute md:after:right-0 md:after:top-1/2 md:after:h-16 md:after:w-px md:after:-translate-y-1/2 md:after:bg-gold/40 md:last:after:hidden"><strong className="block font-display text-5xl font-semibold leading-none text-primary sm:text-6xl">{value}</strong><span className="mx-auto mt-4 block h-px w-8 bg-gold"/><span className="mt-3 block text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">{label}</span><span className="mt-1 block text-sm text-berry">{hi}</span></div>)}</div></section>

    <section className="relative overflow-hidden bg-obsidian px-6 py-24 lg:py-28"><img src="/media/buffet-28.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-15"/><div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/80 to-obsidian"/><div className="relative mx-auto max-w-7xl"><SectionTitle light eyebrow="Kind words • ग्राहकों की राय" title="Loved by families we have served."/><div className="mt-14 grid gap-6 lg:grid-cols-3">{testimonials.slice(0,3).map(([quote,name,venue]) => <figure key={name} className="relative flex flex-col rounded-sm border border-gold/30 bg-primary-foreground/[0.04] p-8 pt-12 backdrop-blur-sm transition-colors hover:border-gold/60"><span aria-hidden className="absolute -top-6 left-8 grid size-12 place-items-center rounded-full border border-gold/50 bg-obsidian font-display text-4xl leading-none text-gold">“</span><div className="flex gap-1 text-gold">{Array.from({length:5}).map((_,i)=><Star key={i} className="size-3.5 fill-current"/>)}</div><blockquote className="mt-5 flex-1 font-display text-[1.35rem] italic leading-8 text-primary-foreground/90">{quote}</blockquote><figcaption className="mt-8 flex items-center gap-3 border-t border-gold/20 pt-5"><span className="grid size-10 place-items-center rounded-full bg-gold font-display text-lg font-semibold text-foreground">{(name ?? "N").charAt(0)}</span><span><span className="block text-sm font-semibold text-primary-foreground">{name}</span><span className="block text-xs text-gold/80">{venue}</span></span></figcaption></figure>)}</div><div className="mt-12 text-center"><Button variant="ghost" className="border border-gold/50 text-gold hover:bg-gold hover:text-foreground" asChild><Link to="/reviews">Read all reviews <ArrowRight/></Link></Button></div></div></section>

    <section className="px-6 py-24 lg:py-32"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Our services • हमारी सेवाएँ" title="Everything your celebration needs."/><div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{services.map(([Icon, title, hi, image]) => <Link key={title} to="/setups" className="group overflow-hidden border border-border bg-card shadow-soft transition-shadow hover:shadow-lift"><div className="aspect-[4/3] overflow-hidden"><img src={image} alt={title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105"/></div><div className="p-6"><Icon className="size-5 text-gold"/><h3 className="mt-3 font-display text-2xl">{title}</h3><p className="text-sm text-berry">{hi}</p><span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">Explore more <ArrowRight className="size-3.5"/></span></div></Link>)}</div></div></section>

    <section className="bg-secondary px-6 py-24"><div className="mx-auto max-w-6xl"><SectionTitle eyebrow="How we work • कैसे काम करते हैं" title="Plan. Taste. Serve."/><div className="mt-14 grid gap-10 md:grid-cols-3">{process.map(([Icon, num, title, copy]) => <div key={num} className="text-center"><span className="mx-auto grid size-16 place-items-center rounded-full border border-gold bg-background text-primary"><Icon className="size-6"/></span><p className="mt-5 font-display text-sm text-gold">{num}</p><h3 className="mt-1 font-display text-3xl">{title}</h3><p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-muted-foreground">{copy}</p></div>)}</div></div></section>

    <section className="px-6 py-24 lg:py-32"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Gallery • सजावट और लाइव काउंटर" title="Luxury setups & live theatrics."/><div className="mt-14 grid auto-rows-[240px] gap-4 md:grid-cols-3">{setups.slice(0,6).map((setup,index) => <Link key={setup.title} to="/setups" className={`group relative overflow-hidden ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}><img src={setup.image} alt={setup.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent"/><div className="absolute bottom-0 p-5 text-primary-foreground"><p className="text-[10px] uppercase tracking-widest text-gold">{setup.category}</p><h3 className="font-display text-2xl">{setup.title}</h3></div></Link>)}</div>
      {journey.length > 0 && <div className="mt-20"><p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Real weddings, real plates • शादी का हर भोज</p><div className="mt-8 flex snap-x gap-5 overflow-x-auto pb-4">{journey.map(m => <figure key={m.id} className="w-60 shrink-0 snap-start"><img src={m.url} alt={m.title} loading="lazy" className="aspect-square w-full object-cover"/><figcaption className="mt-3 font-display text-xl">{m.title}</figcaption></figure>)}</div></div>}
      {videos.length > 0 && <div className="mt-20"><SectionTitle eyebrow="Live moments • असली झलक" title="See our celebrations in motion."/><div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">{videos.map(video => <figure key={video.id} className="overflow-hidden border border-border bg-card shadow-soft"><video src={video.url} poster={video.url === "/media/video-1.mp4" ? "/media/video-1-poster.jpg" : video.url === "/media/video-2.mp4" ? "/media/video-2-poster.jpg" : undefined} muted loop playsInline controls preload="metadata" className="aspect-[9/16] max-h-[560px] w-full bg-muted object-cover"/><figcaption className="p-5"><h3 className="font-display text-2xl">{video.title}</h3>{video.caption && <p className="mt-1 text-sm text-muted-foreground">{video.caption}</p>}</figcaption></figure>)}</div></div>}
      <div className="mt-10 text-center"><Button variant="regalOutline" asChild><Link to="/setups">View full gallery <ArrowRight/></Link></Button></div></div></section>

    <section className="bg-muted px-6 py-24"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Where we serve • अजमेर, पुष्कर, किशनगढ़" title="Celebrations across our home region."/><div className="mt-14 grid gap-6 md:grid-cols-3">{destinations.map(([place,hi,img]) => <Link key={place} to="/book" className="group relative block aspect-[4/3] overflow-hidden"><img src={img} alt={`${place} wedding catering`} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-obsidian/40"/><div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground"><MapPin className="text-gold"/><h3 className="mt-2 font-display text-4xl">{place}</h3><p className="text-gold">{hi}</p></div></Link>)}</div></div></section>

    <section className="relative overflow-hidden bg-obsidian px-6 py-24"><img src="/media/buffet-39.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-25"/><div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2"><div><p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Enquiry • पूछताछ</p><h2 className="mt-4 font-display text-4xl leading-tight text-primary-foreground sm:text-5xl">Start planning your royal feast.</h2><p className="mt-5 leading-7 text-primary-foreground/75">Share your event details through our booking form. Satyanarayan Prajapati and team will review your requirements and contact you.</p></div>
      <div className="border border-gold/30 bg-background p-8 shadow-lift sm:p-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Booking enquiry • बुकिंग पूछताछ</p><h3 className="mt-4 font-display text-3xl">Tell us about your celebration.</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">Submit the event date, location, guest count, menu preferences and your contact details in one secure form.</p><Button variant="royal" size="lg" className="mt-7 w-full" asChild><Link to="/book">Open booking form <ArrowRight/></Link></Button></div></div></section>

    <section className="px-6 py-24"><div className="mx-auto max-w-3xl"><SectionTitle eyebrow="Questions • सवाल-जवाब" title="Frequently asked."/><Accordion type="single" collapsible className="mt-12">{faqs.map(([q,a]) => <AccordionItem key={q} value={q}><AccordionTrigger className="font-display text-xl hover:no-underline">{q}</AccordionTrigger><AccordionContent className="leading-7 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion><div className="mt-8 text-center"><Button variant="regalOutline" asChild><Link to="/reviews">All reviews & FAQs</Link></Button></div></div></section>

    <section className="border-t border-border bg-secondary px-6 py-24"><div className="mx-auto max-w-6xl"><SectionTitle eyebrow="Why choose us • हमें क्यों चुनें" title="Royal wedding catering in Ajmer, Pushkar & Kishangarh."/><div className="mt-14 grid gap-6 md:grid-cols-3">{[["Pure ingredients","Every sweet and dish is made in 100% pure desi ghee with premium dry fruits and fresh, in-house mawa."],["Master halwais","Led by Satyanarayan Prajapati, our team brings over a decade of authentic Marwari and Rajasthani recipes."],["Complete setup","Brass & copper serveware, lit buffet counters and trained staff — we bring everything your venue needs."]].map(([t,c]) => <div key={t} className="border-t-2 border-gold bg-background p-7 shadow-soft"><h3 className="font-display text-2xl">{t}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{c}</p></div>)}</div><div className="mt-12 text-center"><Button variant="royal" size="lg" asChild><Link to="/about">Discover our story <ArrowRight/></Link></Button></div></div></section>
  </>;
}
