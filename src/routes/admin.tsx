import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { Loader2, LogOut, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { itemKinds, type ItemData, type SiteItem } from "@/lib/site-items";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import {
  contentFields,
  mediaSections,
  useContent,
  useContentQuery,
  type SiteMedia,
} from "@/lib/site-data";

import { AdminOverview } from "@/components/admin/overview";
import { ContentEditor } from "@/components/admin/content-editor";
import { ReviewManager } from "@/components/admin/review-manager";
import { useAdminItems, useAdminMedia, useRefreshContent } from "@/lib/admin-data";
import { validateUpload } from "@/lib/uploads";
import { QueryNotice } from "@/components/page-sections";
import { Label } from "@/components/ui/label";
import { buildPageHead } from "@/components/seo";

export const Route = createFileRoute("/admin")({
  head: () =>
    buildPageHead({
      title: "Admin Panel | N Sattu Cuisine",
      description: "Manage N Sattu Cuisine website photos, videos and page text.",
      path: "/admin",
      noindex: true,
    }),
  component: Admin,
});

function useAdminAction() {
  const lock = useRef(false);
  const [pending, setPending] = useState(false);
  async function run(action: () => Promise<void>) {
    if (lock.current) return;
    lock.current = true;
    setPending(true);
    try {
      await action();
    } catch {
      toast.error("The change couldn’t be completed. Check your connection and try again.");
    } finally {
      lock.current = false;
      setPending(false);
    }
  }
  return { pending, run };
}

function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    let unsubscribe = () => {};
    try {
      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        if (active) {
          setSession(session);
          setIsAdmin(null);
        }
      });
      unsubscribe = () => sub.subscription.unsubscribe();
      void supabase.auth
        .getSession()
        .then(({ data, error }) => {
          if (!active) return;
          if (error) throw error;
          setSession(data.session);
          setReady(true);
        })
        .catch(() => {
          if (active) {
            setAuthError("Your session couldn’t be restored. Reload the page to try again.");
            setReady(true);
          }
        });
    } catch {
      setAuthError("Admin sign-in is unavailable. Check the connection and reload the page.");
      setReady(true);
    }
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let active = true;
    setIsAdmin(null);
    if (session) {
      void (async () => {
        try {
          const { data, error } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", session.user.id)
            .eq("role", "admin")
            .abortSignal(AbortSignal.timeout(10000))
            .maybeSingle();
          if (error) throw error;
          if (active) setIsAdmin(!!data);
        } catch {
          if (active) {
            setIsAdmin(false);
            setAuthError("We couldn’t verify admin access. Reload to try again.");
          }
        }
      })();
    }
    return () => {
      active = false;
    };
  }, [session]);

  return (
    <section className="admin-panel min-h-screen bg-muted px-4 pb-16 pt-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {authError ? (
          <div
            role="alert"
            className="mx-auto max-w-lg rounded-lg border border-border bg-card p-8"
          >
            <h1 className="font-display text-3xl">Connection interrupted</h1>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{authError}</p>
            <Button className="mt-5" variant="royal" onClick={() => window.location.reload()}>
              Reload page
            </Button>
          </div>
        ) : !ready ? (
          <p role="status" className="flex items-center justify-center gap-3 text-sm text-primary">
            <Loader2 aria-hidden="true" className="size-5 animate-spin" />
            Loading, please wait…
          </p>
        ) : !session ? (
          <SignIn />
        ) : isAdmin === null ? (
          <p role="status" className="flex items-center justify-center gap-3 text-sm text-primary">
            <Loader2 aria-hidden="true" className="size-5 animate-spin" />
            Loading, please wait…
          </p>
        ) : !isAdmin ? (
          <div className="mx-auto max-w-md bg-card p-8 text-center shadow-soft">
            <h1 className="font-display text-3xl">No admin access</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {session.user.email} is signed in but is not an admin.
            </p>
            <Button className="mt-6" variant="outline" onClick={() => supabase.auth.signOut()}>
              Sign out
            </Button>
          </div>
        ) : (
          <Dashboard email={session.user.email ?? ""} />
        )}
      </div>
    </section>
  );
}

function SignIn() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErrorMessage("");
    setNotice("");
    try {
      const res =
        mode === "in"
          ? await supabase.auth.signInWithPassword({ email: email.trim(), password })
          : await supabase.auth.signUp({
              email: email.trim(),
              password,
              options: { emailRedirectTo: `${window.location.origin}/admin` },
            });
      if (res.error) {
        setErrorMessage(res.error.message);
        return;
      }
      if (mode === "up" && !res.data.session)
        setNotice(
          "Check your email to confirm your account. Admin permissions must be assigned before you can manage the website.",
        );
    } catch {
      setErrorMessage("Sign-in couldn’t be completed. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      aria-busy={busy}
      className="mx-auto max-w-md space-y-4 rounded-lg border border-border bg-card p-6 shadow-soft sm:p-8"
    >
      <h1 className="font-display text-4xl">Admin {mode === "in" ? "sign in" : "sign up"}</h1>
      <p className="text-sm text-muted-foreground">Manage website photos, videos and page text.</p>
      <Label htmlFor="admin-email">Email address</Label>
      <Input
        id="admin-email"
        autoComplete="username"
        disabled={busy}
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Label htmlFor="admin-password">Password</Label>
      <Input
        id="admin-password"
        autoComplete={mode === "in" ? "current-password" : "new-password"}
        disabled={busy}
        type="password"
        required
        minLength={6}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && (
        <p role="alert" className="field-error">
          {errorMessage}
        </p>
      )}
      {notice && (
        <p role="status" className="text-sm leading-7 text-primary">
          {notice}
        </p>
      )}
      <Button variant="royal" className="w-full" disabled={busy}>
        {busy && <Loader2 className="animate-spin" />}
        {mode === "in" ? "Sign in" : "Create account"}
      </Button>
      <button
        type="button"
        disabled={busy}
        className="min-h-11 w-full text-sm text-primary"
        onClick={() => {
          setMode(mode === "in" ? "up" : "in");
          setErrorMessage("");
          setNotice("");
        }}
      >
        {mode === "in" ? "First time? Create an account" : "Have an account? Sign in"}
      </button>
    </form>
  );
}

const ownerSections = [
 ["dashboard","Dashboard"],["bookings","Booking enquiries"],["menus","Menus & dishes"],["setups","Catering setups"],["gallery","Gallery & photos"],["reviews","Customer reviews"],["faqs","FAQs"],["services","Services & locations"],["home","Homepage content"],["about","About page"],["contact","Contact information"],["settings","Website settings"],["account","Account & security"],
] as const;
function Dashboard({email}:{email:string}) {
 const [section,setSection]=useState("dashboard");
 const title=ownerSections.find(([key])=>key===section)?.[1]??"Dashboard";
 const go=(next:string)=>{if(document.querySelector('[data-unsaved="true"]')&&!confirm("You have unsaved changes. Leave this section without saving?"))return;setSection(next);window.scrollTo({top:0});};
 return <><header className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5"><Link to="/admin" className="font-display text-2xl font-semibold text-primary">N-Sattu Cuisine <span className="ml-2 font-sans text-xs font-normal text-muted-foreground">Website manager</span></Link><div className="flex gap-2"><Button variant="outline" asChild><a href="/" target="_blank" rel="noreferrer">View website ↗</a></Button><Button variant="ghost" onClick={()=>{void supabase.auth.signOut();}}><LogOut/>Sign out</Button></div></header>
 <div className="grid items-start gap-7 lg:grid-cols-[225px_minmax(0,1fr)]"><aside className="lg:sticky lg:top-6"><label htmlFor="owner-section" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-primary lg:hidden">Manage your website</label><select id="owner-section" className="w-full border border-input bg-card px-3 text-sm lg:hidden" value={section} onChange={event=>go(event.target.value)}>{ownerSections.map(([key,label])=><option key={key} value={key}>{label}</option>)}</select><nav aria-label="Website management" className="hidden space-y-1 rounded-lg border border-border bg-card p-3 lg:block">{ownerSections.map(([key,label])=><button key={key} aria-current={section===key?'page':undefined} onClick={()=>go(key)} className={`flex min-h-11 w-full items-center rounded-md px-3 py-2.5 text-left text-sm ${section===key?'bg-primary text-primary-foreground':'text-muted-foreground hover:bg-secondary hover:text-primary'}`}>{label}</button>)}</nav></aside>
 <div className="min-w-0"><p className="text-xs text-muted-foreground">Website manager / {title}</p><h1 className="mb-6 mt-3 font-display text-4xl">{title}</h1>
 {section==='dashboard'&&<AdminOverview go={go}/>}
 {section==='bookings'&&<Enquiries/>}
 {section==='menus'&&<ItemsManager key="menus" kinds={['menu_category','dish']}/>}
 {section==='setups'&&<ItemsManager key="setups" kinds={['setup_category','setup']}/>}
 {section==='faqs'&&<ItemsManager key="faqs" kinds={['faq']}/>}
 {section==='services'&&<ItemsManager key="services" kinds={['service','destination']}/>}
 {section==='gallery'&&<div className="space-y-7"><p className="text-sm leading-7 text-muted-foreground">Each group controls the photos shown in that part of your website. Use display order to choose which appears first.</p>{mediaSections.map(item=><MediaSection key={item.key} section={item.key} label={item.label}/>)}</div>}
 {section==='reviews'&&<ReviewManager/>}
 {['home','about','contact','settings'].includes(section)&&<ContentEditor key={section} group={section}/>}
 {section==='home'&&<div className="mt-7 space-y-7"><MediaSection section="hero" label="Homepage hero photos"/><MediaSection section="signatures" label="Signature cuisine photos"/></div>}
 {section==='account'&&<div className="rounded-lg border border-border bg-card p-7"><h2 className="font-display text-3xl">Your account</h2><p className="mt-5 break-all text-sm">Signed in as {email}</p><p className="mt-4 text-sm leading-7 text-muted-foreground">Only approved website administrators can manage content, enquiries and customer reviews. Signing up does not give a new account administrative access.</p><p className="mt-4 text-sm leading-7 text-muted-foreground">Keep your password private and sign out when using a shared device. For access changes, contact the person who manages your website.</p><Button className="mt-6" variant="outline" onClick={()=>{void supabase.auth.signOut();}}>Sign out of this account</Button></div>}
 </div></div></>;
}

type Enquiry = {
  id: string;
  event_type: string;
  event_date: string | null;
  city: string | null;
  guests: number | null;
  cuisines: string[] | null;
  name: string;
  phone: string;
  status: string;
  created_at: string;
};

function Enquiries() {
  const qc = useQueryClient();
  const { pending, run } = useAdminAction();
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["booking_enquiries"],
    retry: 1,
    queryFn: async ({ signal }) => {
      const { data, error } = await supabase
        .from("booking_enquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .abortSignal(AbortSignal.any([signal, AbortSignal.timeout(10000)]));
      if (error) throw error;
      return data as Enquiry[];
    },
  });
  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from("booking_enquiries").update({ status }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    qc.invalidateQueries({ queryKey: ["booking_enquiries"] });
  }
  async function remove(id: string) {
    if (!confirm("Delete this enquiry?")) return;
    const { error } = await supabase.from("booking_enquiries").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    qc.invalidateQueries({ queryKey: ["booking_enquiries"] });
  }
  const [editing, setEditing] = useState<Enquiry | "new" | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "event">("newest");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const pageSize = 8;
  const filtered = data
    .filter((e) => statusFilter === "all" || e.status === statusFilter)
    .filter((e) => {
      const haystack = [e.name, e.phone, e.city, e.event_type, ...(e.cuisines ?? [])].join(" ").toLowerCase();
      return haystack.includes(query.trim().toLowerCase());
    })
    .sort((a, b) => {
      if (sort === "oldest") return a.created_at.localeCompare(b.created_at);
      if (sort === "event") return (a.event_date ?? "9999").localeCompare(b.event_date ?? "9999");
      return b.created_at.localeCompare(a.created_at);
    });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  useEffect(() => setPage(1), [query, statusFilter, sort]);
  if (isError)
    return (
      <QueryNotice
        retry={() => {
          void refetch();
        }}
      />
    );
  if (isLoading)
    return (
      <p role="status" className="flex items-center justify-center gap-3 text-sm text-primary">
        <Loader2 aria-hidden="true" className="size-5 animate-spin" />
        Loading, please wait…
      </p>
    );
  return (
    <div className="bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl">Booking enquiries</h2>
        <Button variant="royal" onClick={() => setEditing("new")}>
          <Plus />
          Add booking
        </Button>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <Input aria-label="Search booking enquiries" placeholder="Search name, phone, city or event" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select aria-label="Filter booking status" className="h-10 border border-input bg-background px-2 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All statuses</option><option value="new">New</option><option value="called">Called</option><option value="confirmed">Confirmed</option><option value="closed">Closed</option>
        </select>
        <select aria-label="Sort bookings" className="h-10 border border-input bg-background px-2 text-sm" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
          <option value="newest">Newest received</option><option value="oldest">Oldest received</option><option value="event">Upcoming event date</option>
        </select>
      </div>
      {editing && (
        <BookingForm
          initial={editing === "new" ? null : editing}
          onDone={() => {
            setEditing(null);
            qc.invalidateQueries({ queryKey: ["booking_enquiries"] });
          }}
        />
      )}
      {!data.length && (
        <p className="mt-4 text-sm text-muted-foreground">
          No enquiries yet. New bookings from the website will appear here.
        </p>
      )}
      <div className="mt-5 space-y-4">
        {visible.map((e) => (
          <div
            key={e.id}
            className="flex flex-wrap items-start justify-between gap-4 border border-border bg-background p-5"
          >
            <div>
              <p className="font-display text-xl">
                {e.name}{" "}
                <span className="text-sm text-muted-foreground">
                  •{" "}
                  <a className="text-primary" href={`tel:${e.phone.replace(/\s/g, "")}`}>
                    {e.phone}
                  </a>
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {e.event_type} • {e.event_date} • {e.city} • {e.guests} guests
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {(e.cuisines ?? []).join(", ")} • received{" "}
                {new Date(e.created_at).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                aria-label={`Status for ${e.name}`}
                value={e.status}
                disabled={pending}
                onChange={(ev) => {
                  void run(() => setStatus(e.id, ev.target.value));
                }}
                className="h-9 border border-input bg-background px-2 text-sm"
              >
                <option value="new">New</option>
                <option value="called">Called</option>
                <option value="confirmed">Confirmed</option>
                <option value="closed">Closed</option>
              </select>
              <Button size="sm" variant="outline" onClick={() => setEditing(e)}>
                Edit
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setSelected(e)}>Details</Button>
              <Button
                size="icon"
                variant="outline"
                disabled={pending}
                onClick={() => {
                  void run(() => remove(e.id));
                }}
                aria-label="Delete"
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filtered.length > pageSize && <div className="mt-5 flex items-center justify-between gap-3 text-sm text-muted-foreground"><span>Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}</span><div className="flex gap-2"><Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</Button><Button size="sm" variant="outline" disabled={page >= pageCount} onClick={() => setPage((p) => p + 1)}>Next</Button></div></div>}
      {selected && <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setSelected(null)}><div className="max-h-[90vh] w-full max-w-xl overflow-auto bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}><div className="flex items-start justify-between gap-4"><h3 className="font-display text-2xl">Booking details</h3><Button variant="ghost" onClick={() => setSelected(null)}>Close</Button></div><dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2"><div><dt className="text-muted-foreground">Name</dt><dd>{selected.name}</dd></div><div><dt className="text-muted-foreground">Phone</dt><dd><a className="text-primary" href={`tel:${selected.phone.replace(/\s/g, "")}`}>{selected.phone}</a></dd></div><div><dt className="text-muted-foreground">Event</dt><dd>{selected.event_type}</dd></div><div><dt className="text-muted-foreground">Date</dt><dd>{selected.event_date || "Not set"}</dd></div><div><dt className="text-muted-foreground">City</dt><dd>{selected.city || "Not set"}</dd></div><div><dt className="text-muted-foreground">Guests</dt><dd>{selected.guests ?? "Not set"}</dd></div><div className="sm:col-span-2"><dt className="text-muted-foreground">Food choices</dt><dd>{(selected.cuisines ?? []).join(", ") || "Not set"}</dd></div><div><dt className="text-muted-foreground">Received</dt><dd>{new Date(selected.created_at).toLocaleString("en-IN")}</dd></div><div><dt className="text-muted-foreground">Status</dt><dd className="capitalize">{selected.status}</dd></div></dl></div></div>}
    </div>
  );
}

function BookingForm({ initial, onDone }: { initial: Enquiry | null; onDone: () => void }) {
  const [f, setF] = useState({
    name: initial?.name ?? "",
    phone: initial?.phone ?? "",
    event_type: initial?.event_type ?? "",
    event_date: initial?.event_date ?? "",
    city: initial?.city ?? "",
    guests: initial?.guests ? String(initial.guests) : "",
    cuisines: (initial?.cuisines ?? []).join(", "),
    status: initial?.status ?? "new",
  });
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setErrorMessage("");
    const name = f.name.trim();
    const phone = f.phone.trim();
    const guests = f.guests ? Number(f.guests) : null;
    if (name.length < 2) return setErrorMessage("Enter the customer’s name.");
    if (!/^[+\d][\d\s().-]{7,}$/.test(phone)) return setErrorMessage("Enter a valid phone number.");
    if (guests !== null && (!Number.isInteger(guests) || guests < 1 || guests > 10000)) return setErrorMessage("Guests must be a whole number between 1 and 10,000.");
    if (f.event_date && f.event_date < new Date().toISOString().slice(0, 10)) return setErrorMessage("Event date cannot be in the past.");
    setBusy(true);
    try {
      const row = {
        name,
        phone,
        event_type: f.event_type.trim() || "Event",
        event_date: f.event_date || null,
        city: f.city || null,
        guests,
        cuisines: f.cuisines
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
        status: f.status,
      };
      const { error } = initial
        ? await supabase.from("booking_enquiries").update(row).eq("id", initial.id)
        : await supabase.from("booking_enquiries").insert(row);

      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success(initial ? "Booking updated" : "Booking added");
      onDone();
    } catch {
      toast.error("The booking couldn’t be saved. Your details are still here.");
    } finally {
      setBusy(false);
    }
  }
  const lbl = "text-xs font-bold uppercase text-berry";
  return (
    <form
      onSubmit={save}
      className="mt-5 grid gap-3 border border-primary/40 bg-background p-5 sm:grid-cols-2"
    >
      <p className="font-display text-xl sm:col-span-2">
        {initial ? "Edit booking" : "New booking"}
      </p>
      {errorMessage && <p role="alert" className="field-error sm:col-span-2">{errorMessage}</p>}
      <label className={lbl}>
        Name
        <Input required className="mt-1" value={f.name} onChange={set("name")} />
      </label>
      <label className={lbl}>
        Phone
        <Input required className="mt-1" value={f.phone} onChange={set("phone")} />
      </label>
      <label className={lbl}>
        Event type
        <Input
          className="mt-1"
          placeholder="Wedding, Sangeet…"
          value={f.event_type}
          onChange={set("event_type")}
        />
      </label>
      <label className={lbl}>
        Event date
        <Input type="date" className="mt-1" value={f.event_date} onChange={set("event_date")} />
      </label>
      <label className={lbl}>
        City
        <select
          className="mt-1 h-10 w-full border border-input bg-background px-2 text-sm"
          value={f.city}
          onChange={set("city")}
        >
          <option value="">Choose</option>
          <option>Ajmer</option>
          <option>Pushkar</option>
          <option>Kishangarh</option>
        </select>
      </label>
      <label className={lbl}>
        Guests
        <Input type="number" min={0} className="mt-1" value={f.guests} onChange={set("guests")} />
      </label>
      <label className={lbl}>
        Food choices (comma separated)
        <Input className="mt-1" value={f.cuisines} onChange={set("cuisines")} />
      </label>
      <label className={lbl}>
        Status
        <select
          className="mt-1 h-10 w-full border border-input bg-background px-2 text-sm"
          value={f.status}
          onChange={set("status")}
        >
          <option value="new">New</option>
          <option value="called">Called</option>
          <option value="confirmed">Confirmed</option>
          <option value="closed">Closed</option>
        </select>
      </label>
      <div className="flex gap-2 sm:col-span-2">
        <Button variant="royal" disabled={busy}>
          {busy && <Loader2 className="animate-spin" />}Save booking
        </Button>
        <Button type="button" variant="outline" disabled={busy} onClick={onDone}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function MediaSection({section,label}:{section:string;label:string}) {
 const query=useAdminMedia();const items=(query.data??[]).filter(item=>item.section===section);
 const refresh=useRefreshContent();const {pending,run}=useAdminAction();
 const [queue,setQueue]=useState<File[]>([]);const [previews,setPreviews]=useState<string[]>([]);const [progress,setProgress]=useState(0);const [publish,setPublish]=useState(true);
 useEffect(()=>{const urls=queue.map(file=>URL.createObjectURL(file));setPreviews(urls);return()=>urls.forEach(url=>URL.revokeObjectURL(url));},[queue]);
 async function upload(){
  let completed=0;setProgress(0);
  try {
   let nextOrder=Math.max(0,...items.map(item=>item.sort_order))+1;
   for(const file of queue){
    const path=`${section}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.]/g,'-')}`;
    const up=await supabase.storage.from('site-media').upload(path,file);if(up.error)throw up.error;
    const signed=await supabase.storage.from('site-media').createSignedUrl(path,60*60*24*365*10);if(signed.error)throw signed.error;
    const title=file.name.replace(/\.[^.]+$/,'');
    const result=await supabase.from('site_media').insert({section,storage_path:path,url:signed.data.signedUrl,media_type:section==='videos'?'video':'image',title,alt_text:title,sort_order:nextOrder++,published:publish});if(result.error)throw result.error;
    completed++;setProgress(completed);
   }
   toast.success(publish?'Upload complete. Your photos are on the website.':'Upload complete. Saved as hidden drafts.');
  } finally {if(completed)setQueue(current=>current.slice(completed));await refresh();}
 }
 return <div data-unsaved={queue.length>0} className="rounded-lg border border-border bg-card p-5 sm:p-7"><div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="font-display text-2xl">{label}</h2><p className="mt-2 text-xs leading-6 text-muted-foreground">{section==='videos'?'MP4 or WebM · Up to 25 MB each':'JPG, PNG, WebP or AVIF · Up to 10 MB each'}. Existing photos stay unchanged until you save or remove them.</p></div><label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary focus-within:ring-2 focus-within:ring-ring"><Upload className="size-4"/>Choose {section==='videos'?'videos':'photos'}<input type="file" multiple className="sr-only" disabled={pending} accept={section==='videos'?'video/mp4,video/webm':'image/jpeg,image/png,image/webp,image/avif'} onChange={event=>{const files=Array.from(event.target.files??[]);if(files.length>20){toast.error('Choose up to 20 files at a time.');return;}for(const file of files){const error=validateUpload(file,section==='videos');if(error){toast.error(`${file.name}: ${error}`);event.target.value='';return;}}setQueue(files);event.target.value='';}}/></label></div>
 {queue.length>0&&<div className="mt-6 rounded-md border border-border bg-secondary/30 p-4"><p className="text-sm font-semibold">Ready to upload · {queue.length} files</p><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{queue.map((file,index)=><figure key={`${file.name}-${index}`}>{section==='videos'?<video src={previews[index]} controls preload="metadata" className="aspect-square w-full rounded-md object-cover"/>:<img src={previews[index]} alt={`Preview of ${file.name}`} className="aspect-square w-full rounded-md object-cover"/>}<figcaption className="mt-2 break-all text-xs">{file.name}</figcaption></figure>)}</div><label className="mt-4 flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" checked={publish} disabled={pending} onChange={event=>setPublish(event.target.checked)} className="accent-primary"/>Show on website after upload</label><div className="mt-4 flex flex-wrap gap-3"><Button variant="royal" disabled={pending} onClick={()=>{void run(upload);}}>{pending?'Uploading…':'Upload selected files'}</Button><Button variant="outline" disabled={pending} onClick={()=>setQueue([])}>Cancel selection</Button></div>{pending&&<p role="progressbar" aria-label="Files uploaded" aria-valuemin={0} aria-valuemax={queue.length} aria-valuenow={progress} className="mt-3 text-sm">{progress} of {queue.length} uploaded</p>}</div>}
 {query.isError&&<QueryNotice retry={()=>{void query.refetch();}}/>}{query.isPending&&<p role="status" className="mt-5 text-sm">Loading photos…</p>}<div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map(item=><MediaCard key={item.id} item={item} onChange={()=>{void refresh();}}/>)}</div>{!query.isPending&&!query.isError&&!items.length&&<p className="mt-5 rounded-md bg-secondary p-5 text-sm text-muted-foreground">No photos in this group yet. Choose files above to get started.</p>}</div>;
}

function MediaCard({ item, onChange }: { item: SiteMedia; onChange: () => void }) {
  const { pending, run } = useAdminAction();
  const [published,setPublished] = useState(item.published !== false);
  const [alt,setAlt] = useState(item.alt_text ?? item.title);
  const [title, setTitle] = useState(item.title);
  const [caption, setCaption] = useState(item.caption);
  const [order, setOrder] = useState(String(item.sort_order));
  const dirty = published !== (item.published !== false) || alt !== (item.alt_text ?? item.title) || title !== item.title || caption !== item.caption || order !== String(item.sort_order);
  useEffect(() => { if (!dirty) return; const handler = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; }; window.addEventListener("beforeunload", handler); return () => window.removeEventListener("beforeunload", handler); }, [dirty]);
  async function save() {
    const { error } = await supabase
      .from("site_media")
      .update({ title, caption, alt_text:alt, published, sort_order: Number(order) || 0 })
      .eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved");
    onChange();
  }
  async function remove() {
    if (!confirm("Remove this photo from this website section? The uploaded file will be kept so other sections can continue using it.")) return;
    const { error } = await supabase.from("site_media").delete().eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    onChange();
  }
  return (
    <div data-unsaved={dirty} className="rounded-lg border border-border bg-background p-3">
      {item.media_type === "video" ? (
        <video
          src={item.url}
          preload="none"
          controls
          muted
          className="aspect-square w-full object-cover"
        />
      ) : (
        <img src={item.url} alt={item.title} className="aspect-square w-full object-cover" />
      )}
      <p className="mt-3 text-xs font-semibold text-primary">{published?"Shown on website":"Hidden from website"}</p>
      <label className="mt-3 block text-xs font-medium">Photo title<Input
        className="mt-1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Media title"
        placeholder="Title"
      /></label>
      <label className="mt-3 block text-xs font-medium">Caption<Input
        className="mt-1"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        aria-label="Media caption"
        placeholder="Caption"
      /></label>
      <label className="mt-3 block text-xs font-medium">Image description for accessibility<Input value={alt} onChange={event=>setAlt(event.target.value)} className="mt-1"/></label>
      <label className="mt-3 flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={published} onChange={event=>setPublished(event.target.checked)} className="accent-primary"/>Show on website after saving</label>
      <div className="mt-2 flex flex-wrap gap-2">
        <Input
          className="w-20"
          type="number"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          aria-label="Order"
        />
        <Button
          size="sm"
          variant="royal"
          className="flex-1"
          disabled={pending}
          onClick={() => {
            void run(save);
          }}
        >
          Save
        </Button>
        <Button
          size="icon"
          variant="outline"
          disabled={pending}
          onClick={() => {
            void run(remove);
          }}
          aria-label="Delete"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}

function TextEditor() {
  const get = useContent();
  const contentQuery = useContentQuery();
  const { pending, run } = useAdminAction();
  const qc = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});
  async function save(key: string, fallback: string) {
    const { error } = await supabase
      .from("page_content")
      .upsert({ key, value: values[key] ?? fallback, updated_at: new Date().toISOString() });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved");
    qc.invalidateQueries({ queryKey: ["page_content"] });
  }
  if (contentQuery.isError)
    return (
      <QueryNotice
        retry={() => {
          void contentQuery.refetch();
        }}
      />
    );
  if (contentQuery.isLoading)
    return (
      <p role="status" className="text-sm text-primary">
        Loading page text…
      </p>
    );
  return (
    <div className="space-y-5 bg-card p-6 shadow-soft">
      {contentFields.map((f) => {
        const current = get(f.key, "");
        return (
          <div key={f.key}>
            <label htmlFor={`text-${f.key}`} className="text-xs font-bold uppercase text-berry">
              {f.label}
            </label>
            <div className="mt-2 flex gap-2">
              <Textarea
                id={`text-${f.key}`}
                value={values[f.key] ?? current}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              />
              <Button
                variant="royal"
                disabled={pending}
                onClick={() => {
                  void run(() => save(f.key, current));
                }}
              >
                Save
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ItemsManager({kinds}:{kinds:string[]}) {
  const { pending, run } = useAdminAction();
  const [kind, setKind] = useState(kinds[0] ?? "dish");
  const def = itemKinds.find((k) => k.key === kind)!;
  const { data = [], isLoading, isError, refetch } = useAdminItems();
  const qc = useQueryClient();
  const items = data.filter((i) => i.kind === kind);
  const refresh = useRefreshContent();
  async function add() {
    const max = items.reduce((m, i) => Math.max(m, i.sort_order), 0);
    const { error } = await supabase
      .from("site_items")
      .insert({ kind, data: {}, sort_order: max + 1, published:false });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("New item added — fill it in below");
    refresh();
  }
  async function move(idx: number, dir: -1 | 1) {
    const a = items[idx],
      b = items[idx + dir];
    if (!a || !b) return;
    const first = await supabase.from("site_items").update({ sort_order: b.sort_order }).eq("id", a.id);
    if(first.error)throw first.error;
    const second = await supabase
      .from("site_items")
      .update({ sort_order: a.sort_order === b.sort_order ? a.sort_order + dir : a.sort_order })
      .eq("id", b.id);
    if(second.error)throw second.error;
    refresh();
  }
  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <nav className="flex gap-2 overflow-x-auto lg:flex-col">
        {itemKinds.filter(k=>kinds.includes(k.key)).map((k) => (
          <button
            key={k.key}
            aria-pressed={kind === k.key}
            onClick={() => setKind(k.key)}
            className={`shrink-0 border px-4 py-3 text-left text-sm ${kind === k.key ? "border-primary bg-card font-semibold" : "border-border bg-background"}`}
          >
            {k.label}
            <span className="block text-xs text-muted-foreground">{k.page}</span>
          </button>
        ))}
      </nav>
      <div className="bg-card p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl">{def.label}</h2>
            <p className="text-xs text-muted-foreground">Content area: {def.page}</p>
            {(kind === "testimonial" || kind === "stat") && (
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                Saved records are retained here. Public reviews and statistics are paused until
                their sources and permission to publish are verified.
              </p>
            )}
          </div>
          <Button
            variant="royal"
            disabled={pending}
            onClick={() => {
              void run(add);
            }}
          >
            <Plus />
            Add new
          </Button>
        </div>
        {isError ? (
          <QueryNotice
            retry={() => {
              void refetch();
            }}
          />
        ) : isLoading ? (
          <Loader2 className="mx-auto mt-6 animate-spin text-primary" />
        ) : (
          <div className="mt-5 space-y-4">
            {!items.length && (
              <p className="text-sm text-muted-foreground">Nothing here yet. Press "Add new".</p>
            )}
            {items.map((it, idx) => (
              <ItemCard
                key={it.id}
                item={it}
                fields={def.fields}
                onChange={refresh}
                onUp={
                  idx > 0
                    ? () => {
                        void run(() => move(idx, -1));
                      }
                    : undefined
                }
                onDown={
                  idx < items.length - 1
                    ? () => {
                        void run(() => move(idx, 1));
                      }
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ItemCard({
  item,
  fields,
  onChange,
  onUp,
  onDown,
}: {
  item: SiteItem;
  fields: (typeof itemKinds)[number]["fields"];
  onChange: () => void;
  onUp?: (() => void) | undefined;
  onDown?: (() => void) | undefined;
}) {
  const { pending, run } = useAdminAction();
  const catalog = useAdminItems();
  const [published,setPublished] = useState(item.published !== false);
  const [failure,setFailure] = useState("");
  const [vals, setVals] = useState<ItemData>(item.data ?? {});
  const [busy, setBusy] = useState(false);
  const set = (k: keyof ItemData, v: string) => setVals((p) => ({ ...p, [k]: v }));
  const dirty=JSON.stringify(vals)!==JSON.stringify(item.data) || published !== (item.published !== false);
  useEffect(()=>{if(!dirty)return;const warn=(event:BeforeUnloadEvent)=>{event.preventDefault();};window.addEventListener("beforeunload",warn);return()=>window.removeEventListener("beforeunload",warn);},[dirty]);
  const categoryKind=item.kind === "dish"?"menu_category":"setup_category";
  const categories=(catalog.data??[]).filter(record=>record.kind === categoryKind && record.data.name);
  async function save() {
    setFailure("");
    const required=item.kind.endsWith("_category")?["name"]:item.kind === "faq"?["q","a"]:item.kind === "destination"?["place"]:["title"];
    if(published && required.some(key=>!vals[key as keyof ItemData]?.trim())) {setFailure("Complete the required name or text before publishing. You can save it as a draft instead.");return;}
    if(published && ["dish","setup"].includes(item.kind) && !categories.some(category=>category.data.name === vals.category)){setFailure("Choose an existing category before publishing.");return;}
    const { error } = await supabase.from("site_items").update({ data: vals, published }).eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(published ? "Saved and shown on the website." : "Draft saved. Hidden from visitors.");
    onChange();
  }
  async function remove() {
    if(item.kind.endsWith("_category")) {
      const childKind=item.kind === "menu_category"?"dish":"setup";
      if((catalog.data??[]).some(record=>record.kind===childKind && record.data.category===item.data.name)){toast.error("Move the items in this category to another category before deleting it.");return;}
    }
    if (!confirm("Permanently delete this item? Use Hide from website to keep it for later.")) return;
    const { error } = await supabase.from("site_items").delete().eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    onChange();
  }
  async function upload(k: keyof ItemData, file?: File) {
    if (!file) return;
    const invalid=validateUpload(file);if(invalid){toast.error(invalid);return;}
    setBusy(true);
    try {
      const path = `items/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "-")}`;
      const up = await supabase.storage.from("site-media").upload(path, file);
      if (up.error) throw up.error;
      const signed = await supabase.storage
        .from("site-media")
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      if (signed.error) throw signed.error;
      set(k, signed.data.signedUrl);
      toast.success("Photo ready — press Save");
    } catch (e) {
      toast.error((e as Error).message);
    }
    setBusy(false);
  }
  return (
    <div data-unsaved={dirty} className="rounded-lg border border-border bg-background p-4">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-semibold text-primary">{published?"Shown on website":"Draft · Hidden from website"}</p><label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={published} onChange={event=>setPublished(event.target.checked)} className="accent-primary"/>Show on website after saving</label></div>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <div
            key={f.key}
            className={f.type === "long" || f.type === "image" ? "sm:col-span-2" : ""}
          >
            <label
              htmlFor={`item-${item.id}-${f.key}`}
              className="text-xs font-bold uppercase text-berry"
            >
              {f.label}
            </label>
            {f.key === "category" ? <select id={`item-${item.id}-${f.key}`} value={vals.category??""} disabled={pending} onChange={event=>set("category",event.target.value)} className="mt-2 w-full border border-input bg-card px-3 text-sm"><option value="">Choose a category</option>{categories.map(category=><option key={category.id}>{category.data.name}</option>)}</select> : f.type === "long" ? (
              <Textarea
                id={`item-${item.id}-${f.key}`}
                className="mt-2"
                disabled={pending}
                value={vals[f.key] ?? ""}
                onChange={(event) => set(f.key, event.target.value)}
              />
            ) : f.type === "image" ? (
              <div className="mt-2 flex flex-wrap items-center gap-3">
                {vals[f.key] && (
                  <img
                    src={vals[f.key]}
                    alt={vals.title || "Current item photo"}
                    loading="lazy"
                    className="size-20 rounded-md object-cover"
                  />
                )}
                <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                  {busy ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Upload className="size-4" />
                  )}
                  {vals[f.key] ? "Choose a different photo" : "Upload photo"}
                  <input
                    id={`item-${item.id}-${f.key}`}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    disabled={busy || pending}
                    onChange={(event) => {
                      void upload(f.key, event.target.files?.[0]);
                      event.target.value = "";
                    }}
                  />
                </label>
              </div>
            ) : (
              <Input
                id={`item-${item.id}-${f.key}`}
                className="mt-2"
                disabled={pending}
                value={vals[f.key] ?? ""}
                onChange={(event) => set(f.key, event.target.value)}
              />
            )}
          </div>
        ))}
      </div>
      {failure && <p role="alert" className="field-error">{failure}</p>}
      <details className="mt-5 rounded-md border border-border p-4"><summary className="cursor-pointer text-sm font-semibold">Preview this item</summary>{vals.image && <img src={vals.image} alt={vals.title || "Item preview"} className="mt-4 aspect-[4/3] w-full max-w-sm rounded-md object-cover"/>}<p className="mt-3 font-display text-2xl">{vals.title || vals.name || vals.q || vals.place || "Untitled draft"}</p><p className="mt-2 text-sm leading-7 text-muted-foreground">{vals.description || vals.a || vals.detail || ""}</p></details>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="royal"
          disabled={busy || pending}
          onClick={() => {
            void run(save);
          }}
        >
          {pending?"Saving…":"Save changes"}
        </Button>
        <Button
          size="icon"
          variant="outline"
          disabled={!onUp || pending}
          onClick={onUp}
          aria-label="Move up"
        >
          <ArrowUp />
        </Button>
        <Button
          size="icon"
          variant="outline"
          disabled={!onDown || pending}
          onClick={onDown}
          aria-label="Move down"
        >
          <ArrowDown />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="ml-auto"
          disabled={busy || pending}
          onClick={() => {
            void run(remove);
          }}
          aria-label="Delete"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
