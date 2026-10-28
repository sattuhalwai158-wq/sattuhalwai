import { createFileRoute } from "@tanstack/react-router";
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
import { itemKinds, useAllItems, type ItemData, type SiteItem } from "@/lib/site-items";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import {
  contentFields,
  mediaSections,
  useAllMedia,
  useContent,
  useContentQuery,
  type SiteMedia,
} from "@/lib/site-data";

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
    <section className="admin-panel min-h-screen bg-muted px-5 pb-20 pt-36 lg:px-8">
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

function Dashboard({ email }: { email: string }) {
  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-display text-xl italic text-primary">Admin panel</p>
          <h1 className="font-display text-5xl">Website manager</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 break-all text-sm text-muted-foreground">
          {email}
          <Button size="sm" variant="outline" onClick={() => supabase.auth.signOut()}>
            <LogOut />
            Sign out
          </Button>
        </div>
      </div>
      <Tabs defaultValue="enquiries">
        <TabsList>
          <TabsTrigger value="enquiries">Bookings</TabsTrigger>
          <TabsTrigger value="items">Menus, reviews & more</TabsTrigger>
          <TabsTrigger value="media">Photos & videos</TabsTrigger>
          <TabsTrigger value="text">Page text</TabsTrigger>
        </TabsList>
        <TabsContent value="enquiries" className="mt-6">
          <Enquiries />
        </TabsContent>
        <TabsContent value="items" className="mt-6">
          <ItemsManager />
        </TabsContent>
        <TabsContent value="media" className="mt-6 space-y-10">
          {mediaSections.map((s) => (
            <MediaSection key={s.key} section={s.key} label={s.label} />
          ))}
        </TabsContent>
        <TabsContent value="text" className="mt-6">
          <TextEditor />
        </TabsContent>
      </Tabs>
    </>
  );
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
        {data.map((e) => (
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
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const row = {
        name: f.name.trim(),
        phone: f.phone.trim(),
        event_type: f.event_type.trim() || "Event",
        event_date: f.event_date || null,
        city: f.city || null,
        guests: f.guests ? Number(f.guests) : null,
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

function MediaSection({ section, label }: { section: string; label: string }) {
  const qc = useQueryClient();
  const { data = [], isLoading, isError, refetch } = useAllMedia();
  const items = data.filter((m) => m.section === section);
  const [busy, setBusy] = useState(false);
  const refresh = () => qc.invalidateQueries({ queryKey: ["site_media"] });

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    try {
      for (const file of Array.from(files)) {
        const path = `${section}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "-")}`;
        const up = await supabase.storage.from("site-media").upload(path, file);
        if (up.error) throw up.error;
        const signed = await supabase.storage
          .from("site-media")
          .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
        if (signed.error) throw signed.error;
        const { error } = await supabase.from("site_media").insert({
          section,
          storage_path: path,
          url: signed.data.signedUrl,
          media_type: file.type.startsWith("video") ? "video" : "image",
          title: file.name.replace(/\.[^.]+$/, ""),
          sort_order: items.length + 1,
        });
        if (error) throw error;
      }
      toast.success("Uploaded");
    } catch (e) {
      toast.error((e as Error).message);
    }
    setBusy(false);
    refresh();
  }

  return (
    <div className="bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl">{label}</h2>
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md bg-primary focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 px-4 py-2 text-sm font-semibold text-primary-foreground">
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}Add{" "}
          {section === "videos" ? "video" : "photos"}
          <input
            type="file"
            multiple
            accept={section === "videos" ? "video/*" : "image/*"}
            className="sr-only"
            disabled={busy}
            aria-label={`Add media to ${label}`}
            onChange={(e) => {
              void upload(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      {isError && (
        <QueryNotice
          retry={() => {
            void refetch();
          }}
        />
      )}
      {isLoading && (
        <p role="status" className="mt-5 text-sm text-muted-foreground">
          Loading media…
        </p>
      )}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((m) => (
          <MediaCard key={m.id} item={m} onChange={refresh} />
        ))}
        {!isLoading && !isError && !items.length && (
          <p className="text-sm text-muted-foreground">
            No media in this section. Add photos when ready.
          </p>
        )}
      </div>
    </div>
  );
}

function MediaCard({ item, onChange }: { item: SiteMedia; onChange: () => void }) {
  const { pending, run } = useAdminAction();
  const [title, setTitle] = useState(item.title);
  const [caption, setCaption] = useState(item.caption);
  const [order, setOrder] = useState(String(item.sort_order));
  async function save() {
    const { error } = await supabase
      .from("site_media")
      .update({ title, caption, sort_order: Number(order) || 0 })
      .eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved");
    onChange();
  }
  async function remove() {
    if (!confirm("Delete this item from the website?")) return;
    if (item.storage_path) await supabase.storage.from("site-media").remove([item.storage_path]);
    const { error } = await supabase.from("site_media").delete().eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    onChange();
  }
  return (
    <div className="rounded-lg border border-border bg-background p-3">
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
      <Input
        className="mt-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Media title"
        placeholder="Title"
      />
      <Input
        className="mt-2"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        aria-label="Media caption"
        placeholder="Caption"
      />
      <div className="mt-2 flex gap-2">
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

function ItemsManager() {
  const { pending, run } = useAdminAction();
  const [kind, setKind] = useState(itemKinds[0]!.key);
  const def = itemKinds.find((k) => k.key === kind)!;
  const { data = [], isLoading, isError, refetch } = useAllItems();
  const qc = useQueryClient();
  const items = data.filter((i) => i.kind === kind);
  const refresh = () => qc.invalidateQueries({ queryKey: ["site_items"] });
  async function add() {
    const max = items.reduce((m, i) => Math.max(m, i.sort_order), 0);
    const { error } = await supabase
      .from("site_items")
      .insert({ kind, data: {}, sort_order: max + 1 });
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
    await supabase.from("site_items").update({ sort_order: b.sort_order }).eq("id", a.id);
    await supabase
      .from("site_items")
      .update({ sort_order: a.sort_order === b.sort_order ? a.sort_order + dir : a.sort_order })
      .eq("id", b.id);
    refresh();
  }
  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <nav className="flex gap-2 overflow-x-auto lg:flex-col">
        {itemKinds.map((k) => (
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
  const [vals, setVals] = useState<ItemData>(item.data ?? {});
  const [busy, setBusy] = useState(false);
  const set = (k: keyof ItemData, v: string) => setVals((p) => ({ ...p, [k]: v }));
  async function save() {
    const { error } = await supabase.from("site_items").update({ data: vals }).eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved — live on the website");
    onChange();
  }
  async function remove() {
    if (!confirm("Delete this item from the website?")) return;
    const { error } = await supabase.from("site_items").delete().eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    onChange();
  }
  async function upload(k: keyof ItemData, file?: File) {
    if (!file) return;
    setBusy(true);
    try {
      const path = `items/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "-")}`;
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
    <div className="border border-border bg-background p-4">
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
            {f.type === "long" ? (
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
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="royal"
          disabled={busy || pending}
          onClick={() => {
            void run(save);
          }}
        >
          Save
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
