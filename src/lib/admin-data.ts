import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { SiteItem } from '@/lib/site-items';
import type { SiteMedia } from '@/lib/site-data';
export function useAdminItems(){return useQuery({queryKey:['admin_site_items'],retry:1,queryFn:async({signal})=>{const {data,error}=await supabase.from('site_items').select('*').order('sort_order').abortSignal(AbortSignal.any([signal,AbortSignal.timeout(10000)]));if(error)throw error;return (data??[]) as unknown as SiteItem[];}});}
export function useAdminMedia(){return useQuery({queryKey:['admin_site_media'],retry:1,queryFn:async({signal})=>{const {data,error}=await supabase.from('site_media').select('*').order('sort_order').abortSignal(AbortSignal.any([signal,AbortSignal.timeout(10000)]));if(error)throw error;return (data??[]) as SiteMedia[];}});}
export function useRefreshContent(){const client=useQueryClient();return ()=>Promise.all(['site_items','site_media','page_content','admin_site_items','admin_site_media','published_reviews','admin_reviews','admin_overview','review_audit'].map(key=>client.invalidateQueries({queryKey:[key]})));}
