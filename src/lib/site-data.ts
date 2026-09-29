import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteMedia = {
  id: string;
  section: string;
  media_type: string;
  url: string;
  storage_path: string | null;
  title: string;
  caption: string;
  sort_order: number;
};

export const mediaSections = [
  { key: "hero", label: "Home banner slideshow" },
  { key: "signatures", label: "Home signature sweets" },
  { key: "journey", label: "Home wedding journey (meal plates)" },
  { key: "gallery", label: "Luxury Setups photo gallery" },
  { key: "videos", label: "Luxury Setups videos" },
] as const;

export const contentFields = [
  { key: "home_eyebrow", label: "Home banner small heading" },
  { key: "home_title", label: "Home banner main heading" },
  { key: "home_subtitle", label: "Home banner text" },
  { key: "setups_title", label: "Luxury Setups heading" },
  { key: "setups_copy", label: "Luxury Setups intro text" },
] as const;

export function useAllMedia() {
  return useQuery({
    queryKey: ["site_media"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_media").select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as SiteMedia[];
    },
  });
}

export function useMedia(section: string) {
  const q = useAllMedia();
  const seen = new Set<string>();
  return (q.data ?? []).filter((media) => {
    if (media.section !== section || seen.has(media.url)) return false;
    seen.add(media.url);
    return true;
  });
}

export function useContent() {
  const q = useQuery({
    queryKey: ["page_content"],
    queryFn: async () => {
      const { data, error } = await supabase.from("page_content").select("key,value");
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((r) => [r.key, r.value])) as Record<string, string>;
    },
  });
  return (key: string, fallback: string) => q.data?.[key] || fallback;
}
