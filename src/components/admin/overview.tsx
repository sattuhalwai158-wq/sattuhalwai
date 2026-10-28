import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
export function AdminOverview({go}:{go:(section:string)=>void}) {
 const query=useQuery({queryKey:['admin_overview'],retry:1,queryFn:async()=>{
  const results=await Promise.all([
   supabase.from('booking_enquiries').select('id',{count:'exact',head:true}),
   supabase.from('booking_enquiries').select('id',{count:'exact',head:true}).in('status',['new','called']),
   supabase.from('booking_enquiries').select('id',{count:'exact',head:true}).eq('status','confirmed'),
   supabase.from('booking_enquiries').select('id',{count:'exact',head:true}).eq('status','closed'),
   supabase.from('customer_reviews').select('id',{count:'exact',head:true}).eq('status','pending'),
   supabase.from('customer_reviews').select('id',{count:'exact',head:true}).eq('status','published'),
   supabase.from('site_items').select('id',{count:'exact',head:true}).eq('kind','dish'),
   supabase.from('site_items').select('id',{count:'exact',head:true}).eq('kind','menu_category'),
   supabase.from('site_media').select('id',{count:'exact',head:true}).eq('section','gallery').eq('media_type','image'),
  ]);return results.map(result=>result.error?null:result.count);
 }});
 const cards=[['Total enquiries','bookings'],['Awaiting follow-up','bookings'],['Confirmed bookings','bookings'],['Closed enquiries','bookings'],['Reviews awaiting approval','reviews'],['Published reviews','reviews'],['Menu dishes','menus'],['Menu categories','menus'],['Gallery photos','gallery']];
 return <div className="space-y-7"><div className="rounded-lg bg-primary p-6 text-primary-foreground sm:p-8"><p className="text-xs font-semibold uppercase tracking-widest">Your website, at a glance</p><h2 className="mt-3 font-display text-3xl">Welcome to your control centre.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-primary-foreground/85">Keep your menu current, organise enquiries and decide which customer experiences appear on your website.</p></div>{query.isError&&<p role="alert" className="rounded-lg border border-border p-5">The overview couldn’t be loaded. Choose a section to continue.</p>}<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([label,section],index)=><button key={label} onClick={()=>go(section!)} className="rounded-lg border border-border bg-card p-5 text-left hover:border-primary"><span className="text-sm text-muted-foreground">{label}</span><strong className="mt-4 block font-display text-4xl text-primary">{query.isPending?'…':query.data?.[index]??'Unavailable'}</strong></button>)}</div>{!!query.data?.[4]&&<div className="rounded-lg border border-primary/20 bg-secondary p-5"><p className="text-sm">Customer reviews are waiting for your decision.</p><Button variant="royal" className="mt-3" onClick={()=>go('reviews')}>Review submissions</Button></div>}<div className="rounded-lg border border-border bg-card p-6"><h2 className="font-display text-2xl">Quick actions</h2><div className="mt-5 flex flex-wrap gap-3">{[['Add a dish','menus'],['Upload photos','gallery'],['Edit homepage text','home'],['Review submissions','reviews']].map(([label,section])=><Button key={label} variant="outline" onClick={()=>go(section!)}>{label}</Button>)}</div></div><p className="text-xs leading-6 text-muted-foreground">Closed enquiries use your existing Closed status; they are not automatically counted as completed events. Unavailable totals are shown without substituting demonstration numbers.</p></div>;
}
