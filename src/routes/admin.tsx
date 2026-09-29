import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import { contentFields, mediaSections, useAllMedia, useContent, type SiteMedia } from "@/lib/site-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | N-Sattu Cuisine" },
      { name: "description", content: "Manage N-Sattu Cuisine website photos, videos and page text." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(null); return; }
    supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  return <section className="min-h-screen bg-muted px-5 pb-20 pt-36 lg:px-8"><div className="mx-auto max-w-6xl">
    {!ready ? <Loader2 className="mx-auto animate-spin text-primary" /> :
      !session ? <SignIn /> :
      isAdmin === null ? <Loader2 className="mx-auto animate-spin text-primary" /> :
      !isAdmin ? <div className="mx-auto max-w-md bg-card p-8 text-center shadow-soft"><h1 className="font-display text-3xl">No admin access</h1><p className="mt-3 text-sm text-muted-foreground">{session.user.email} is signed in but is not an admin.</p><Button className="mt-6" variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button></div> :
      <Dashboard email={session.user.email ?? ""} />}
  </div></section>;
}

function SignIn() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    const res = mode === "in"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    setBusy(false);
    if (res.error) { toast.error(res.error.message); return; }
    if (mode === "up" && !res.data.session) toast.success("Check your email to confirm your account.");
  }
  return <form onSubmit={submit} className="mx-auto max-w-md space-y-4 bg-card p-8 shadow-soft">
    <h1 className="font-display text-4xl">Admin {mode === "in" ? "sign in" : "sign up"}</h1>
    <p className="text-sm text-muted-foreground">Manage website photos, videos and page text.</p>
    <Input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
    <Input type="password" required minLength={6} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
    <Button variant="royal" className="w-full" disabled={busy}>{busy && <Loader2 className="animate-spin" />}{mode === "in" ? "Sign in" : "Create account"}</Button>
    <button type="button" className="w-full text-sm text-primary" onClick={() => setMode(mode === "in" ? "up" : "in")}>{mode === "in" ? "First time? Create the admin account" : "Have an account? Sign in"}</button>
  </form>;
}

function Dashboard({ email }: { email: string }) {
  return <>
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="font-display text-xl italic text-primary">Admin panel</p><h1 className="font-display text-5xl">Website manager</h1></div><div className="flex items-center gap-3 text-sm text-muted-foreground">{email}<Button size="sm" variant="outline" onClick={() => supabase.auth.signOut()}><LogOut />Sign out</Button></div></div>
    <Tabs defaultValue="enquiries"><TabsList><TabsTrigger value="enquiries">Bookings</TabsTrigger><TabsTrigger value="items">Menus, reviews & more</TabsTrigger><TabsTrigger value="media">Photos & videos</TabsTrigger><TabsTrigger value="text">Page text</TabsTrigger></TabsList>
      <TabsContent value="enquiries" className="mt-6"><Enquiries /></TabsContent>
      <TabsContent value="items" className="mt-6"><ItemsManager /></TabsContent>
      <TabsContent value="media" className="mt-6 space-y-10">{mediaSections.map(s => <MediaSection key={s.key} section={s.key} label={s.label} />)}</TabsContent>
      <TabsContent value="text" className="mt-6"><TextEditor /></TabsContent>
    </Tabs>
  </>;
}

type Enquiry = { id: string; event_type: string; event_date: string | null; city: string | null; guests: number | null; cuisines: string[] | null; name: string; phone: string; status: string; created_at: string };

function Enquiries() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ["booking_enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("booking_enquiries").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Enquiry[];
    },
  });
  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from("booking_enquiries").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ["booking_enquiries"] });
  }
  async function remove(id: string) {
    if (!confirm("Delete this enquiry?")) return;
    const { error } = await supabase.from("booking_enquiries").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ["booking_enquiries"] });
  }
  const [editing, setEditing] = useState<Enquiry | "new" | null>(null);
  if (isLoading) return <Loader2 className="mx-auto animate-spin text-primary" />;
  return <div className="bg-card p-6 shadow-soft">
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-display text-2xl">Booking enquiries</h2><Button variant="royal" onClick={() => setEditing("new")}><Plus />Add booking</Button></div>
    {editing && <BookingForm initial={editing === "new" ? null : editing} onDone={() => { setEditing(null); qc.invalidateQueries({ queryKey: ["booking_enquiries"] }); }} />}
    {!data.length && <p className="mt-4 text-sm text-muted-foreground">No enquiries yet. New bookings from the website will appear here.</p>}
    <div className="mt-5 space-y-4">{data.map(e => <div key={e.id} className="flex flex-wrap items-start justify-between gap-4 border border-border bg-background p-5">
      <div>
        <p className="font-display text-xl">{e.name} <span className="text-sm text-muted-foreground">• <a className="text-primary" href={`tel:${e.phone.replace(/\s/g, "")}`}>{e.phone}</a></span></p>
        <p className="mt-1 text-sm text-muted-foreground">{e.event_type} • {e.event_date} • {e.city} • {e.guests} guests</p>
        <p className="mt-1 text-xs text-muted-foreground">{(e.cuisines ?? []).join(", ")} • received {new Date(e.created_at).toLocaleString("en-IN")}</p>
      </div>
      <div className="flex items-center gap-2">
        <select value={e.status} onChange={ev => setStatus(e.id, ev.target.value)} className="h-9 border border-input bg-background px-2 text-sm">
          <option value="new">New</option><option value="called">Called</option><option value="confirmed">Confirmed</option><option value="closed">Closed</option>
        </select>
        <Button size="sm" variant="outline" onClick={() => setEditing(e)}>Edit</Button>
        <Button size="icon" variant="outline" onClick={() => remove(e.id)} aria-label="Delete"><Trash2 /></Button>
      </div>
    </div>)}</div>
  </div>;
}

function BookingForm({ initial, onDone }: { initial: Enquiry | null; onDone: () => void }) {
  const [f, setF] = useState({
    name: initial?.name ?? "", phone: initial?.phone ?? "", event_type: initial?.event_type ?? "", event_date: initial?.event_date ?? "",
    city: initial?.city ?? "", guests: initial?.guests ? String(initial.guests) : "", cuisines: (initial?.cuisines ?? []).join(", "), status: initial?.status ?? "new",
  });
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  async function save(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    const row = { name: f.name.trim(), phone: f.phone.trim(), event_type: f.event_type.trim() || "Event", event_date: f.event_date || null, city: f.city || null,
      guests: f.guests ? Number(f.guests) : null, cuisines: f.cuisines.split(",").map(x => x.trim()).filter(Boolean), status: f.status };
    const { error } = initial ? await supabase.from("booking_enquiries").update(row).eq("id", initial.id) : await supabase.from("booking_enquiries").insert(row);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(initial ? "Booking updated" : "Booking added"); onDone();
  }
  const lbl = "text-xs font-bold uppercase text-berry";
  return <form onSubmit={save} className="mt-5 grid gap-3 border border-primary/40 bg-background p-5 sm:grid-cols-2">
    <p className="font-display text-xl sm:col-span-2">{initial ? "Edit booking" : "New booking"}</p>
    <label className={lbl}>Name<Input required className="mt-1" value={f.name} onChange={set("name")} /></label>
    <label className={lbl}>Phone<Input required className="mt-1" value={f.phone} onChange={set("phone")} /></label>
    <label className={lbl}>Event type<Input className="mt-1" placeholder="Wedding, Sangeet…" value={f.event_type} onChange={set("event_type")} /></label>
    <label className={lbl}>Event date<Input type="date" className="mt-1" value={f.event_date} onChange={set("event_date")} /></label>
    <label className={lbl}>City<select className="mt-1 h-10 w-full border border-input bg-background px-2 text-sm" value={f.city} onChange={set("city")}><option value="">Choose</option><option>Ajmer</option><option>Pushkar</option><option>Kishangarh</option></select></label>
    <label className={lbl}>Guests<Input type="number" min={0} className="mt-1" value={f.guests} onChange={set("guests")} /></label>
    <label className={lbl}>Food choices (comma separated)<Input className="mt-1" value={f.cuisines} onChange={set("cuisines")} /></label>
    <label className={lbl}>Status<select className="mt-1 h-10 w-full border border-input bg-background px-2 text-sm" value={f.status} onChange={set("status")}><option value="new">New</option><option value="called">Called</option><option value="confirmed">Confirmed</option><option value="closed">Closed</option></select></label>
    <div className="flex gap-2 sm:col-span-2"><Button variant="royal" disabled={busy}>{busy && <Loader2 className="animate-spin" />}Save booking</Button><Button type="button" variant="outline" onClick={onDone}>Cancel</Button></div>
  </form>;
}

function MediaSection({ section, label }: { section: string; label: string }) {
  const qc = useQueryClient();
  const { data = [] } = useAllMedia();
  const items = data.filter(m => m.section === section);
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
        const signed = await supabase.storage.from("site-media").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
        if (signed.error) throw signed.error;
        const { error } = await supabase.from("site_media").insert({
          section, storage_path: path, url: signed.data.signedUrl,
          media_type: file.type.startsWith("video") ? "video" : "image",
          title: file.name.replace(/\.[^.]+$/, ""), sort_order: items.length + 1,
        });
        if (error) throw error;
      }
      toast.success("Uploaded");
    } catch (e) { toast.error((e as Error).message); }
    setBusy(false); refresh();
  }

  return <div className="bg-card p-6 shadow-soft">
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-display text-2xl">{label}</h2>
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}Add {section === "videos" ? "video" : "photos"}<input type="file" multiple accept={section === "videos" ? "video/*" : "image/*"} className="hidden" onChange={e => upload(e.target.files)} /></label></div>
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map(m => <MediaCard key={m.id} item={m} onChange={refresh} />)}{!items.length && <p className="text-sm text-muted-foreground">Nothing here yet.</p>}</div>
  </div>;
}

function MediaCard({ item, onChange }: { item: SiteMedia; onChange: () => void }) {
  const [title, setTitle] = useState(item.title);
  const [caption, setCaption] = useState(item.caption);
  const [order, setOrder] = useState(String(item.sort_order));
  async function save() {
    const { error } = await supabase.from("site_media").update({ title, caption, sort_order: Number(order) || 0 }).eq("id", item.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Saved"); onChange();
  }
  async function remove() {
    if (!confirm("Delete this item from the website?")) return;
    if (item.storage_path) await supabase.storage.from("site-media").remove([item.storage_path]);
    const { error } = await supabase.from("site_media").delete().eq("id", item.id);
    if (error) { toast.error(error.message); return; }
    onChange();
  }
  return <div className="border border-border bg-background p-3">
    {item.media_type === "video" ? <video src={item.url} muted className="aspect-square w-full object-cover" /> : <img src={item.url} alt={item.title} className="aspect-square w-full object-cover" />}
    <Input className="mt-3" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
    <Input className="mt-2" value={caption} onChange={e => setCaption(e.target.value)} placeholder="Caption" />
    <div className="mt-2 flex gap-2"><Input className="w-20" type="number" value={order} onChange={e => setOrder(e.target.value)} aria-label="Order" /><Button size="sm" variant="royal" className="flex-1" onClick={save}>Save</Button><Button size="icon" variant="outline" onClick={remove} aria-label="Delete"><Trash2 /></Button></div>
  </div>;
}

function TextEditor() {
  const get = useContent();
  const qc = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});
  async function save(key: string, fallback: string) {
    const { error } = await supabase.from("page_content").upsert({ key, value: values[key] ?? fallback, updated_at: new Date().toISOString() });
    if (error) { toast.error(error.message); return; }
    toast.success("Saved"); qc.invalidateQueries({ queryKey: ["page_content"] });
  }
  return <div className="space-y-5 bg-card p-6 shadow-soft">{contentFields.map(f => { const current = get(f.key, ""); return <div key={f.key}><label className="text-xs font-bold uppercase text-berry">{f.label}</label><div className="mt-2 flex gap-2"><Textarea value={values[f.key] ?? current} onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))} /><Button variant="royal" onClick={() => save(f.key, current)}>Save</Button></div></div>; })}</div>;
}

function ItemsManager() {
  const [kind, setKind] = useState(itemKinds[0]!.key);
  const def = itemKinds.find(k => k.key === kind)!;
  const { data = [], isLoading } = useAllItems();
  const qc = useQueryClient();
  const items = data.filter(i => i.kind === kind);
  const refresh = () => qc.invalidateQueries({ queryKey: ["site_items"] });
  async function add() {
    const max = items.reduce((m, i) => Math.max(m, i.sort_order), 0);
    const { error } = await supabase.from("site_items").insert({ kind, data: {}, sort_order: max + 1 });
    if (error) { toast.error(error.message); return; }
    toast.success("New item added — fill it in below"); refresh();
  }
  async function move(idx: number, dir: -1 | 1) {
    const a = items[idx], b = items[idx + dir];
    if (!a || !b) return;
    await supabase.from("site_items").update({ sort_order: b.sort_order }).eq("id", a.id);
    await supabase.from("site_items").update({ sort_order: a.sort_order === b.sort_order ? a.sort_order + dir : a.sort_order }).eq("id", b.id);
    refresh();
  }
  return <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
    <nav className="flex gap-2 overflow-x-auto lg:flex-col">{itemKinds.map(k => <button key={k.key} onClick={() => setKind(k.key)} className={`shrink-0 border px-4 py-3 text-left text-sm ${kind === k.key ? "border-primary bg-card font-semibold" : "border-border bg-background"}`}>{k.label}<span className="block text-xs text-muted-foreground">{k.page}</span></button>)}</nav>
    <div className="bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-display text-2xl">{def.label}</h2><p className="text-xs text-muted-foreground">Shown on: {def.page}</p></div><Button variant="royal" onClick={add}><Plus />Add new</Button></div>
      {isLoading ? <Loader2 className="mx-auto mt-6 animate-spin text-primary" /> : <div className="mt-5 space-y-4">
        {!items.length && <p className="text-sm text-muted-foreground">Nothing here yet. Press "Add new".</p>}
        {items.map((it, idx) => <ItemCard key={it.id} item={it} fields={def.fields} onChange={refresh} onUp={idx > 0 ? () => move(idx, -1) : undefined} onDown={idx < items.length - 1 ? () => move(idx, 1) : undefined} />)}
      </div>}
    </div>
  </div>;
}

function ItemCard({ item, fields, onChange, onUp, onDown }: { item: SiteItem; fields: (typeof itemKinds)[number]["fields"]; onChange: () => void; onUp?: (() => void) | undefined; onDown?: (() => void) | undefined }) {
  const [vals, setVals] = useState<ItemData>(item.data ?? {});
  const [busy, setBusy] = useState(false);
  const set = (k: keyof ItemData, v: string) => setVals(p => ({ ...p, [k]: v }));
  async function save() {
    const { error } = await supabase.from("site_items").update({ data: vals }).eq("id", item.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Saved — live on the website"); onChange();
  }
  async function remove() {
    if (!confirm("Delete this item from the website?")) return;
    const { error } = await supabase.from("site_items").delete().eq("id", item.id);
    if (error) { toast.error(error.message); return; }
    onChange();
  }
  async function upload(k: keyof ItemData, file?: File) {
    if (!file) return; setBusy(true);
    try {
      const path = `items/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "-")}`;
      const up = await supabase.storage.from("site-media").upload(path, file);
      if (up.error) throw up.error;
      const signed = await supabase.storage.from("site-media").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      if (signed.error) throw signed.error;
      set(k, signed.data.signedUrl); toast.success("Photo ready — press Save");
    } catch (e) { toast.error((e as Error).message); }
    setBusy(false);
  }
  return <div className="border border-border bg-background p-4">
    <div className="grid gap-3 sm:grid-cols-2">{fields.map(f => <label key={f.key} className={`text-xs font-bold uppercase text-berry ${f.type === "long" || f.type === "image" ? "sm:col-span-2" : ""}`}>{f.label}
      {f.type === "long" ? <Textarea className="mt-1 font-normal normal-case text-foreground" value={vals[f.key] ?? ""} onChange={e => set(f.key, e.target.value)} />
        : f.type === "image" ? <div className="mt-1 flex items-center gap-3">{vals[f.key] && <img src={vals[f.key]} alt="" className="size-16 object-cover" />}<label className="inline-flex cursor-pointer items-center gap-2 border border-border px-3 py-2 text-xs font-semibold normal-case text-foreground">{busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}{vals[f.key] ? "Change photo" : "Upload photo"}<input type="file" accept="image/*" className="hidden" onChange={e => upload(f.key, e.target.files?.[0])} /></label></div>
        : <Input className="mt-1 font-normal normal-case text-foreground" value={vals[f.key] ?? ""} onChange={e => set(f.key, e.target.value)} />}
    </label>)}</div>
    <div className="mt-4 flex flex-wrap gap-2"><Button size="sm" variant="royal" onClick={save}>Save</Button><Button size="icon" variant="outline" disabled={!onUp} onClick={onUp} aria-label="Move up"><ArrowUp /></Button><Button size="icon" variant="outline" disabled={!onDown} onClick={onDown} aria-label="Move down"><ArrowDown /></Button><Button size="icon" variant="outline" className="ml-auto" onClick={remove} aria-label="Delete"><Trash2 /></Button></div>
  </div>;
}
