import { useQuery } from '@tanstack/react-query';
import { getPublicContentClient } from '@/lib/public-content-client';
import { supabase } from '@/integrations/supabase/client';
export function usePublishedReviews() {
 return useQuery({queryKey:['published_reviews'],staleTime:30000,retry:1,queryFn:async({signal})=>{
  const {data,error}=await getPublicContentClient().rpc('list_published_reviews').abortSignal(AbortSignal.any([signal,AbortSignal.timeout(8000)]));
  if(error)throw error;return data??[];
 }});
}
export function useAdminReviews() {
 return useQuery({queryKey:['admin_reviews'],retry:1,queryFn:async({signal})=>{
  const {data,error}=await supabase.from('customer_reviews').select('*').order('created_at',{ascending:false}).abortSignal(AbortSignal.any([signal,AbortSignal.timeout(8000)]));
  if(error)throw error;return data??[];
 }});
}
