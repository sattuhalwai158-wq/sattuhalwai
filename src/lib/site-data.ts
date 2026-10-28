import { queryOptions, useQuery } from "@tanstack/react-query";
import { getPublicContentClient } from "@/lib/public-content-client";

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

// The homepage loader and client observers share one cache contract. Loading
// media before SSR prevents a bundled photo from flashing before CMS photos.
export const siteMediaQueryOptions = queryOptions({
  queryKey: ["site_media"],
  staleTime: 5 * 60 * 1000,
  retry: 0,
  queryFn: async ({ signal }) => {
    const { data, error } = await getPublicContentClient()
      .from("site_media")
      .select("*")
      .order("sort_order")
      .abortSignal(AbortSignal.any([signal, AbortSignal.timeout(3000)]));
    if (error) throw error;
    return (data ?? []) as SiteMedia[];
  },
});

export function useAllMedia(initialData?: SiteMedia[]) {
  return useQuery({
    ...siteMediaQueryOptions,
    ...(initialData ? { initialData } : {}),
  });
}

export function useMedia(section: string, initialData?: SiteMedia[]) {
  const q = useAllMedia(initialData);
  const seen = new Set<string>();
  return (q.data ?? []).filter((media) => {
    if (media.section !== section || seen.has(media.url)) return false;
    seen.add(media.url);
    return true;
  });
}

export function useContentQuery() {
  return useQuery({
    queryKey: ["page_content"],
    staleTime: 5 * 60 * 1000,
    retry: 1,
    queryFn: async ({ signal }) => {
      const { data, error } = await getPublicContentClient()
        .from("page_content")
        .select("key,value")
        .abortSignal(AbortSignal.any([signal, AbortSignal.timeout(8000)]));
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((r) => [r.key, r.value])) as Record<
        string,
        string
      >;
    },
  });
}

export function useContent() {
  const q = useContentQuery();
  return (key: string, fallback: string) => q.data?.[key] || fallback;
}
