import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageIntro } from "@/components/site-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildPageHead, buildBreadcrumbSchema } from "@/components/seo";
import { BUSINESS_CONFIG as business } from "@/lib/site-config";
import {
  bookingSteps,
  cities,
  cuisineTypes,
  eventTypes,
  initialBooking,
  indiaToday,
  validateBookingStep,
  createBookingSubmitter,
  type BookingData,
  type BookingErrors,
} from "@/lib/booking";

export const Route = createFileRoute("/book")({
  head: () =>
    buildPageHead({
      title: "Plan Your Event | Catering Enquiry | N Sattu Cuisine",
      description:
        "Discuss your event date, venue and menu with our catering team in Ajmer, Pushkar and Kishangarh.",
      path: "/book",
      structuredData: [buildBreadcrumbSchema([{ name: "Plan Your Event", path: "/book" }])],
    }),
  component: Book,
});

function Book() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>({ ...initialBooking, cuisines: [] });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [failure, setFailure] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const [send] = useState(() =>
    createBookingSubmitter((payload) =>
      supabase.from("booking_enquiries").insert(payload).abortSignal(AbortSignal.timeout(15000)),
    ),
  );
  const today = indiaToday();
  function update<K extends keyof BookingData>(key: K, value: BookingData[K]) {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFailure("");
  }
  function go(next: number) {
    setStep(next);
    setErrors({});
    setFailure("");
    requestAnimationFrame(() => heading.current?.focus());
  }
  function checkField(key: keyof BookingData) {
    setErrors((current) => ({ ...current, [key]: validateBookingStep(data, step, today)[key] }));
  }
  async function advance(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    const found = validateBookingStep(data, step, today);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      if (step === 5) {
        const fieldStep: Record<string, number> = {
          event: 1,
          date: 1,
          city: 2,
          guests: 2,
          cuisines: 3,
          name: 4,
          phone: 4,
        };
        setStep(fieldStep[first] ?? 1);
        requestAnimationFrame(() => document.getElementById(first)?.focus());
      } else document.getElementById(first)?.focus();
      return;
    }
    if (step < 5) {
      go(step + 1);
      return;
    }
    setBusy(true);
    setFailure("");
    const result = await send(data);
    if (result.status === "duplicate") return;
    setBusy(false);
    if (result.status === "success") {
      setDone(true);
      requestAnimationFrame(() => heading.current?.focus());
    }
    if (result.status === "error") setFailure(result.message);
  }
  function error(key: keyof BookingData) {
    return errors[key] ? (
      <p id={`${key}-error`} className="field-error" role="alert">
        {errors[key]}
      </p>
    ) : null;
  }
  return (
    <>
      <PageIntro
        eyebrow="Your celebration starts here • आयोजन की शुरुआत"
        title="Let’s make room for something memorable."
        copy="Tell us a little about your occasion. We’ll discuss a menu and service plan shaped around your guests, traditions and venue."
      />
      <div className="border-b border-border px-5 py-4">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: "Plan Your Event" }]} />
        </div>
      </div>
      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[1.4fr_.7fr] lg:gap-12">
          {done ? (
            <div className="editorial-card p-6 sm:p-10" role="status">
              <CheckCircle2 className="size-12 text-primary" />
              <h2 ref={heading} tabIndex={-1} className="mt-6 font-display text-4xl">
                Your enquiry is with us.
              </h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                Thank you, {data.name.trim()}. We received your {data.event.toLowerCase()} enquiry
                for {data.date} in {data.city}. Our team will contact you on {data.phone} to discuss
                availability and next steps.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Your event is confirmed only after availability and booking terms are agreed with
                the team.
              </p>
              <Button variant="regalOutline" className="mt-8" asChild>
                <Link to="/menus">
                  Keep exploring our menus <ArrowRight />
                </Link>
              </Button>
            </div>
          ) : (
            <form
              aria-labelledby="booking-title"
              noValidate
              onSubmit={advance}
              aria-busy={busy}
              className="editorial-card p-5 sm:p-9"
            >
              <ol aria-label="Enquiry progress" className="mb-8 grid grid-cols-5 gap-2">
                {bookingSteps.map((label, index) => (
                  <li key={label} aria-current={index + 1 === step ? "step" : undefined}>
                    <button
                      type="button"
                      disabled={index + 1 >= step || busy}
                      onClick={() => go(index + 1)}
                      className={`flex min-h-11 w-full items-center gap-2 border-b-2 pb-3 text-left text-xs ${index + 1 <= step ? "border-primary text-primary" : "border-border text-muted-foreground"}`}
                      aria-label={`Step ${index + 1}: ${label}${index + 1 < step ? ", edit" : ""}`}
                    >
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-full ${index + 1 === step ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                      >
                        {index + 1 < step ? <Check className="size-3.5" /> : index + 1}
                      </span>
                      <span className="hidden sm:block">{label}</span>
                    </button>
                  </li>
                ))}
              </ol>
              <p
                className="text-xs font-semibold uppercase tracking-widest text-primary"
                aria-live="polite"
              >
                Step {step} of 5 · {bookingSteps[step - 1]}
              </p>
              <h2
                id="booking-title"
                ref={heading}
                tabIndex={-1}
                className="mt-3 font-display text-3xl sm:text-4xl"
              >
                {
                  [
                    "What are you celebrating?",
                    "Where will we be serving?",
                    "What would you love to serve?",
                    "How can we reach you?",
                    "Everything look right?",
                  ][step - 1]
                }
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {step === 5
                  ? "Review your details below. Sending an enquiry does not confirm a booking."
                  : "Fields marked * are required. You can go back without losing your details."}
              </p>
              <fieldset disabled={busy} className="mt-7 space-y-6">
                <legend className="sr-only">{bookingSteps[step - 1]}</legend>
                {step === 1 && (
                  <>
                    <fieldset
                      id="event"
                      tabIndex={-1}
                      aria-describedby={errors.event ? "event-error" : undefined}
                      aria-invalid={!!errors.event}
                    >
                      <legend className="mb-3 text-sm font-semibold">Occasion *</legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {eventTypes.map((value) => (
                          <label
                            key={value}
                            className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-md border p-4 text-sm ${data.event === value ? "border-primary bg-primary/5" : "border-border"}`}
                          >
                            <input
                              type="radio"
                              name="event"
                              value={value}
                              checked={data.event === value}
                              onChange={() => update("event", value)}
                              className="size-4 accent-primary"
                            />
                            {value}
                          </label>
                        ))}
                      </div>
                      {error("event")}
                    </fieldset>
                    <div>
                      <Label htmlFor="date">Event date *</Label>
                      <Input
                        id="date"
                        type="date"
                        required
                        min={today}
                        className="mt-2"
                        value={data.date}
                        onBlur={() => checkField("date")}
                        onChange={(e) => update("date", e.target.value)}
                        aria-invalid={!!errors.date}
                        aria-describedby={errors.date ? "date-error" : undefined}
                      />
                      {error("date")}
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div>
                      <Label htmlFor="city">Event destination *</Label>
                      <select
                        id="city"
                        required
                        value={data.city}
                        onBlur={() => checkField("city")}
                        onChange={(e) => update("city", e.target.value)}
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? "city-error" : undefined}
                        className="mt-2 w-full border border-input bg-card px-3 text-base"
                      >
                        <option value="">Select your destination</option>
                        {cities.map((city) => (
                          <option key={city}>{city}</option>
                        ))}
                      </select>
                      {error("city")}
                    </div>
                    <div>
                      <Label htmlFor="guests">Estimated guest count *</Label>
                      <Input
                        id="guests"
                        type="number"
                        inputMode="numeric"
                        min={100}
                        max={5000}
                        required
                        className="mt-2"
                        value={data.guests || ""}
                        onChange={(e) => update("guests", Number(e.target.value))}
                        onBlur={() => checkField("guests")}
                        aria-invalid={!!errors.guests}
                        aria-describedby={`guests-help${errors.guests ? " guests-error" : ""}`}
                      />
                      <p id="guests-help" className="mt-2 text-sm text-muted-foreground">
                        An estimate is fine. For fewer than 100 or more than 5,000 guests, call us
                        to discuss your plans.
                      </p>
                      {error("guests")}
                    </div>
                  </>
                )}
                {step === 3 && (
                  <fieldset
                    id="cuisines"
                    tabIndex={-1}
                    aria-invalid={!!errors.cuisines}
                    aria-describedby={errors.cuisines ? "cuisines-error" : undefined}
                  >
                    <legend className="mb-3 text-sm font-semibold">
                      Menu preferences *{" "}
                      <span className="font-normal text-muted-foreground">
                        (choose one or more)
                      </span>
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {cuisineTypes.map((value) => (
                        <label
                          key={value}
                          className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-md border p-4 text-sm ${data.cuisines.includes(value) ? "border-primary bg-primary/5" : "border-border"}`}
                        >
                          <input
                            type="checkbox"
                            checked={data.cuisines.includes(value)}
                            onChange={() =>
                              update(
                                "cuisines",
                                data.cuisines.includes(value)
                                  ? data.cuisines.filter((x) => x !== value)
                                  : [...data.cuisines, value],
                              )
                            }
                            className="size-4 accent-primary"
                          />
                          {value}
                        </label>
                      ))}
                    </div>
                    {error("cuisines")}
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      Share Jain, allergy and other dietary requirements with our team when we
                      discuss your menu.
                    </p>
                  </fieldset>
                )}
                {step === 4 && (
                  <>
                    <div>
                      <Label htmlFor="name">Full name *</Label>
                      <Input
                        id="name"
                        autoComplete="name"
                        required
                        className="mt-2"
                        value={data.name}
                        onChange={(e) => update("name", e.target.value)}
                        onBlur={() => checkField("name")}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {error("name")}
                    </div>
                    <div>
                      <Label htmlFor="phone">Mobile number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        required
                        className="mt-2"
                        placeholder="e.g. +91 98765 43210"
                        value={data.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        onBlur={() => checkField("phone")}
                        aria-invalid={!!errors.phone}
                        aria-describedby={`phone-help${errors.phone ? " phone-error" : ""}`}
                      />
                      <p id="phone-help" className="mt-2 text-sm text-muted-foreground">
                        Use a 10-digit Indian mobile number, optionally with +91.
                      </p>
                      {error("phone")}
                    </div>
                  </>
                )}
                {step === 5 && (
                  <dl className="divide-y divide-border rounded-md border border-border bg-secondary/40 px-5">
                    {[
                      ["Occasion", data.event],
                      ["Date", data.date],
                      ["Destination", data.city],
                      ["Guests", String(data.guests)],
                      ["Menu", data.cuisines.join(", ")],
                      ["Name", data.name],
                      ["Mobile", data.phone],
                    ].map(([label, value]) => (
                      <div key={label} className="grid gap-1 py-3 sm:grid-cols-[110px_1fr]">
                        <dt className="text-sm text-muted-foreground">{label}</dt>
                        <dd className="text-sm font-medium break-words">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </fieldset>
              <div className="mt-7 flex items-start gap-2 rounded-md bg-secondary/60 p-4 text-xs leading-6 text-muted-foreground">
                <ShieldCheck className="mt-1 size-4 shrink-0 text-primary" />
                <p>
                  We use your details to respond to your catering enquiry and plan your event. Read
                  our{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-primary underline underline-offset-4"
                  >
                    privacy policy (opens in a new tab)
                  </Link>
                  .
                </p>
              </div>
              {failure && (
                <div
                  role="alert"
                  className="mt-5 rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm leading-7 text-destructive"
                >
                  {failure}
                </div>
              )}
              <div className="mt-7 flex flex-wrap justify-between gap-3 border-t border-border pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={step === 1 || busy}
                  onClick={() => go(step - 1)}
                >
                  <ArrowLeft />
                  Back
                </Button>
                <Button type="submit" variant="royal" disabled={busy}>
                  {busy ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Sending enquiry…
                    </>
                  ) : step === 5 ? (
                    "Send enquiry"
                  ) : (
                    <>
                      Continue <ArrowRight />
                    </>
                  )}
                </Button>
              </div>
              <p className="sr-only" role="status">
                {busy ? "Sending your enquiry. Please wait." : ""}
              </p>
            </form>
          )}
          <aside id="contact" className="space-y-5 lg:sticky lg:top-36">
            <div className="rounded-lg bg-primary p-6 text-primary-foreground sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest">
                Prefer a conversation?
              </p>
              <h2 className="mt-4 font-display text-3xl">Talk to our catering team.</h2>
              {[business.telephone, business.secondaryTelephone].map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="mt-4 flex min-h-11 items-center gap-3 text-lg"
                >
                  <Phone className="size-4" />
                  {phone}
                </a>
              ))}
              <p className="mt-6 border-t border-primary-foreground/20 pt-5 text-sm leading-7 text-primary-foreground/85">
                Ajmer · Pushkar · Kishangarh
                <br />
                Consultations and tastings by appointment.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h3 className="font-display text-2xl">What happens next?</h3>
              <ol className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
                <li>01 · We discuss your event and check availability.</li>
                <li>02 · We shape the menu, service and quotation together.</li>
                <li>03 · You review the arrangements and booking terms.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
