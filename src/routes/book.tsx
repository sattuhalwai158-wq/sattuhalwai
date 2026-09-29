import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Instagram,
  Loader2,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { PageIntro } from "@/components/site-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildPageHead, buildBreadcrumbSchema } from "@/components/seo";

const events = [
  "Royal Wedding",
  "Sangeet / Mehendi",
  "Reception",
  "Corporate Gala",
  "Private Feast",
];
const cities = ["Ajmer", "Pushkar", "Kishangarh"];
const cuisines = ["Royal Rajasthani", "Artisanal Sweets", "Live Counters", "Multi-Cuisine"];

export const Route = createFileRoute("/book")({
  head: () =>
    buildPageHead({
      title: "Book Wedding Caterers in Ajmer | Catering Enquiry | N Sattu Cuisine",
      description:
        "Request a custom wedding catering quotation in Ajmer, Pushkar or Kishangarh. Direct booking with Satyanarayan Prajapati & culinary team for 100 to 5,000+ guests.",
      path: "/book",
      ogImage: "/media/buffet-6.jpg",
      structuredData: [buildBreadcrumbSchema([{ name: "Book Catering", path: "/book" }])],
    }),
  component: Book,
});

function Book() {
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    event: "",
    date: "",
    city: "",
    guests: 500,
    cuisines: [] as string[],
    name: "",
    phone: "",
  });

  const valid =
    step === 1
      ? !!data.event
      : step === 2
        ? !!data.date && !!data.city
        : step === 3
          ? true
          : step === 4
            ? data.cuisines.length > 0
            : !!data.name && data.phone.replace(/\D/g, "").length >= 10;

  const toggle = (x: string) =>
    setData({
      ...data,
      cuisines: data.cuisines.includes(x)
        ? data.cuisines.filter((c) => c !== x)
        : [...data.cuisines, x],
    });

  async function submit() {
    setBusy(true);
    const { error } = await supabase.from("booking_enquiries").insert({
      event_type: data.event,
      event_date: data.date,
      city: data.city,
      guests: data.guests,
      cuisines: data.cuisines,
      name: data.name,
      phone: data.phone,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setDone(true);
  }

  if (done)
    return (
      <>
        <PageIntro
          eyebrow="Private event concierge • बुकिंग प्राप्त"
          title="Tell us how you wish to celebrate."
          copy="Share the first details of your occasion. We will shape them into a thoughtful tasting and service conversation."
        />
        <div className="border-b border-border bg-secondary/40 px-5 py-4 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Breadcrumbs items={[{ label: "Book Catering" }, { label: "Confirmation" }]} />
          </div>
        </div>
        <section className="px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-xl border border-border bg-card p-10 text-center rounded-sm">
            <CheckCircle2 className="mx-auto size-14 text-primary" />
            <h2 className="mt-6 font-display text-4xl">Booking received.</h2>
            <p className="mt-2 font-display text-xl italic text-primary">बुकिंग मिल गई</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Thank you, {data.name}. Your enquiry for <b>{data.event}</b> on <b>{data.date}</b> in{" "}
              <b>{data.city}</b> ({data.guests} guests) has been submitted. Our team will contact
              you on <b>{data.phone}</b> shortly.
            </p>
            <Button
              variant="royal"
              className="mt-8"
              onClick={() => {
                setDone(false);
                setStep(1);
                setData({
                  event: "",
                  date: "",
                  city: "",
                  guests: 500,
                  cuisines: [],
                  name: "",
                  phone: "",
                });
              }}
            >
              Submit another booking
            </Button>
          </div>
        </section>
      </>
    );

  return (
    <>
      <PageIntro
        eyebrow="Private event concierge • आयोजन बुकिंग"
        title="Tell us how you wish to celebrate."
        copy="Share the first details of your occasion. We will shape them into a thoughtful tasting and service conversation."
      />

      <div className="border-b border-border bg-secondary/40 px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: "Book Catering" }]} />
        </div>
      </div>

      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.3fr_.7fr]">
          <div className="border border-border bg-card p-6 sm:p-10 rounded-sm">
            <div className="mb-10 flex gap-2">
              {[1, 2, 3, 4, 5].map((x) => (
                <div key={x} className={`h-1 flex-1 ${x <= step ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
            <p className="text-xs font-bold uppercase text-primary">Step {step} of 5</p>
            {step === 1 && (
              <Choice
                title="What are you celebrating?"
                values={events}
                selected={[data.event]}
                pick={(x) => setData({ ...data, event: x })}
              />
            )}
            {step === 2 && (
              <div>
                <h2 className="mt-3 font-display text-4xl">When and where?</h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="date">Event date</Label>
                    <Input
                      id="date"
                      type="date"
                      className="mt-2"
                      value={data.date}
                      onChange={(e) => setData({ ...data, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Destination</Label>
                    <select
                      id="city"
                      className="mt-2 h-9 w-full border border-input bg-background px-3 text-sm rounded-sm"
                      value={data.city}
                      onChange={(e) => setData({ ...data, city: e.target.value })}
                    >
                      <option value="">Select city</option>
                      {cities.map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="mt-3 font-display text-4xl">How many guests?</h2>
                <p className="mt-10 text-center font-display text-7xl text-primary">
                  {data.guests}
                  {data.guests === 5000 ? "+" : ""}
                </p>
                <Slider
                  className="mt-10"
                  min={100}
                  max={5000}
                  step={50}
                  value={[data.guests]}
                  onValueChange={(x) => setData({ ...data, guests: x[0] ?? data.guests })}
                />
              </div>
            )}
            {step === 4 && (
              <Choice
                title="What should the feast include?"
                values={cuisines}
                selected={data.cuisines}
                pick={toggle}
                multi
              />
            )}
            {step === 5 && (
              <div>
                <h2 className="mt-3 font-display text-4xl">Your contact details.</h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      className="mt-2"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="mt-2"
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mt-8 border-l-2 border-primary bg-secondary/50 p-5">
                  <p className="font-display text-2xl">Inquiry summary</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {data.event} • {data.date} • {data.city}
                    <br />
                    {data.guests} guests • {data.cuisines.join(", ")}
                  </p>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Press Book now to submit these details. Our team will contact you to confirm
                  availability and the next steps.
                </p>
              </div>
            )}
            <div className="mt-10 flex justify-between">
              <Button variant="ghost" disabled={step === 1} onClick={() => setStep(step - 1)}>
                <ArrowLeft /> Back
              </Button>
              {step < 5 ? (
                <Button variant="royal" disabled={!valid} onClick={() => setStep(step + 1)}>
                  Continue <ArrowRight />
                </Button>
              ) : (
                <Button variant="royal" disabled={!valid || busy} onClick={submit}>
                  {busy && <Loader2 className="animate-spin" />} Book now
                </Button>
              )}
            </div>
          </div>
          <aside className="space-y-5">
            <div className="border border-border p-7 bg-card rounded-sm">
              <p className="text-xs font-bold uppercase text-primary">Direct concierge</p>
              <a href="tel:+919460426952" className="mt-5 block font-display text-3xl">
                +91 94604 26952
              </a>
              <a href="tel:+919950611631" className="mt-2 block font-display text-3xl">
                +91 99506 11631
              </a>
              <p className="mt-5 text-sm text-muted-foreground">
                Ajmer, Pushkar & Kishangarh, Rajasthan
                <br />
                Consultations by appointment
              </p>
            </div>
            <div className="border border-border p-7 bg-card rounded-sm">
              <p className="text-xs font-bold uppercase text-primary">Follow the craft</p>
              <a
                href="https://instagram.com/sattu__halwai"
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex items-center gap-3 text-sm hover:text-primary"
              >
                <Instagram className="text-primary size-5" /> @sattu__halwai
              </a>
              <a
                href="https://youtube.com/@SattuhalwaiAjmer"
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center gap-3 text-sm hover:text-primary"
              >
                <Youtube className="text-primary size-5" /> @SattuhalwaiAjmer
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
function Choice({
  title,
  values,
  selected,
  pick,
  multi = false,
}: {
  title: string;
  values: string[];
  selected: string[];
  pick: (x: string) => void;
  multi?: boolean;
}) {
  return (
    <div>
      <h2 className="mt-3 font-display text-4xl">{title}</h2>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {values.map((x) => (
          <button
            key={x}
            onClick={() => pick(x)}
            className={`flex min-h-16 items-center justify-between border p-4 text-left text-sm transition-colors ${selected.includes(x) ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"}`}
          >
            {x}
            {selected.includes(x) && <Check className="size-4" />}
          </button>
        ))}
      </div>
      {multi && <p className="mt-4 text-xs text-muted-foreground">Choose one or more.</p>}
    </div>
  );
}
