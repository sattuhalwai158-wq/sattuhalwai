import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { dishes, setups, testimonials } from "@/lib/content";

type ItemKey = "name" | "title" | "local" | "category" | "description" | "tags" | "pairing" | "image" | "detail" | "quote" | "venue" | "date" | "q" | "a" | "hi" | "value" | "label" | "place";
export type ItemData = { [K in ItemKey]?: string | undefined };
export type SiteItem = { id: string; kind: string; data: ItemData; sort_order: number };

type Field = { key: ItemKey; label: string; type?: "text" | "long" | "image" };

export const itemKinds: { key: string; label: string; page: string; fields: Field[] }[] = [
  { key: "menu_category", label: "Menu categories", page: "Menus page", fields: [{ key: "name", label: "Category name" }] },
  { key: "dish", label: "Menu dishes", page: "Menus page + Home", fields: [
    { key: "title", label: "Dish name" }, { key: "local", label: "Hindi name" }, { key: "category", label: "Category (must match a menu category)" },
    { key: "description", label: "Description", type: "long" }, { key: "tags", label: "Badges (comma separated)" },
    { key: "pairing", label: "Pairs well with" }, { key: "image", label: "Photo", type: "image" } ] },
  { key: "setup_category", label: "Setup categories", page: "Luxury Setups page", fields: [{ key: "name", label: "Category name" }] },
  { key: "setup", label: "Setup gallery items", page: "Luxury Setups + Home gallery", fields: [
    { key: "title", label: "Title" }, { key: "category", label: "Category" }, { key: "detail", label: "Detail line" }, { key: "image", label: "Photo", type: "image" } ] },
  { key: "testimonial", label: "Reviews", page: "Home + Reviews page", fields: [
    { key: "quote", label: "Review text", type: "long" }, { key: "name", label: "Guest name" }, { key: "venue", label: "Event / place" }, { key: "date", label: "Date" } ] },
  { key: "faq", label: "FAQs", page: "Home + Reviews page", fields: [{ key: "q", label: "Question" }, { key: "a", label: "Answer", type: "long" }] },
  { key: "service", label: "Services", page: "Home page", fields: [{ key: "title", label: "Title" }, { key: "hi", label: "Hindi label" }, { key: "image", label: "Photo", type: "image" }] },
  { key: "stat", label: "Numbers strip", page: "Home page", fields: [{ key: "value", label: "Number (e.g. 500+)" }, { key: "label", label: "Label" }, { key: "hi", label: "Hindi label" }] },
  { key: "destination", label: "Places we serve", page: "Home page", fields: [{ key: "place", label: "Place" }, { key: "hi", label: "Hindi name" }, { key: "image", label: "Photo", type: "image" }] },
];

export const defaultItems: Record<string, ItemData[]> = {
  menu_category: ["Artisanal Mithai", "Live Theatrical Counters", "Royal Rajasthani Thaal", "Multi-Cuisine Banquets", "Royal Refreshments"].map(name => ({ name })),
  dish: dishes.map(d => ({ title: d.title, local: d.local, category: d.category, description: d.description, tags: d.tags.join(", "), pairing: d.pairing, image: d.image })),
  setup_category: ["LED Buffet Staging", "Live Counters & Theatrics", "Royal Serveware"].map(name => ({ name })),
  setup: setups.map(s => ({ title: s.title, category: s.category, detail: s.detail, image: s.image })),
  testimonial: testimonials.map(([quote, name, venue, date]) => ({ quote, name, venue, date })),
  faq: [
    ["Which places do you cater in?", "We cater celebrations in Ajmer, Pushkar and Kishangarh."],
    ["Do you make pure Jain food? (जैन भोजन)", "Yes. Separate Jain cooking, utensils and live counters without onion and garlic can be arranged."],
    ["How many guests can you serve?", "From intimate functions of 100 guests to grand weddings of 5,000 or more."],
    ["Can we taste the food before booking?", "Yes. Tasting sessions are arranged by appointment at our Ajmer kitchen."],
    ["Do you provide serveware and buffet décor?", "Yes. We bring complete royal brass, copper and custom LED thematic buffet installations."],
  ].map(([q, a]) => ({ q, a })),
  service: [
    ["Royal Wedding Banquets", "शादी का भोज", "/media/buffet-6.jpg"],
    ["Artisanal Mithai", "खास मिठाइयाँ", "/media/sweet-rose-platter.jpg"],
    ["Live Food Counters", "लाइव काउंटर", "/media/live-dosa-counter.jpg"],
    ["Palace Buffet Setups", "शाही सजावट", "/media/buffet-28.jpg"],
  ].map(([title, hi, image]) => ({ title, hi, image })),
  stat: [["10+", "Years of mastery", "10 साल का अनुभव"], ["500+", "Royal celebrations", "500+ शादियाँ"], ["100%", "Pure desi ghee", "शुद्ध देसी घी"], ["50+", "Halwais & crew", "हलवाई और स्टाफ"]].map(([value, label, hi]) => ({ value, label, hi })),
  destination: [["Ajmer", "अजमेर", "/media/buffet-6.jpg"], ["Pushkar", "पुष्कर", "/media/rajasthani-stall.jpg"], ["Kishangarh", "किशनगढ़", "/media/night-stalls.jpg"]].map(([place, hi, image]) => ({ place, hi, image })),
};

export function useAllItems() {
  return useQuery({
    queryKey: ["site_items"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_items").select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as unknown as SiteItem[];
    },
  });
}

/** Items of one kind from the database; falls back to built-in defaults until loaded. */
export function useItems(kind: string): ItemData[] {
  const q = useAllItems();
  if (!q.data) return defaultItems[kind] ?? [];
  return q.data.filter(i => i.kind === kind).map(i => i.data);
}
