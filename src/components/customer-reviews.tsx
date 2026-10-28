import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Star, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getPublicContentClient } from '@/lib/public-content-client';
import { usePublishedReviews } from '@/lib/review-data';
import { createReviewSubmitter, emptyReview, reviewEvents, validateReview, type ReviewInput, type ReviewErrors } from '@/lib/reviews';

export function ReviewStars({rating}:{rating:number}) {
 return <span className="inline-flex items-center gap-1 text-gold" aria-label={`${rating} out of 5 stars`}>{[1,2,3,4,5].map(star=><Star key={star} aria-hidden="true" className={`size-4 ${star<=rating?'fill-current':''}`} />)}</span>;
}
export function PublishedReviews({featured=false}:{featured?:boolean}) {
 const query=usePublishedReviews();const [page,setPage]=useState(0);
 const reviews=(query.data??[]).filter(review=>!featured||review.featured);
 if(featured && !reviews.length)return null;
 const shown=featured?reviews.slice(0,3):reviews.slice(page*6,page*6+6);
 return <section className="px-5 py-14 lg:px-8"><div className="mx-auto max-w-7xl">
  <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-semibold uppercase tracking-widest text-primary">Shared by our customers</p><h2 className="mt-3 font-display text-4xl">Experiences around the table.</h2></div><Button variant="regalOutline" asChild><Link to="/reviews" hash="share-review">Share your experience</Link></Button></div>
  {query.isPending && <p role="status" className="mt-8 text-sm text-muted-foreground">Loading customer experiences…</p>}
  {query.isError && <div role="alert" className="mt-8 rounded-md border border-border p-5"><p className="text-sm">Customer experiences are temporarily unavailable.</p><Button variant="outline" className="mt-3" onClick={()=>{void query.refetch();}}>Try again</Button></div>}
  {!query.isPending&&!query.isError&&!reviews.length && <p className="mt-8 rounded-lg border border-dashed border-border bg-secondary/40 p-7 leading-8 text-muted-foreground">Be among the first to share your experience. Customer reviews appear here after permission and moderation.</p>}
  <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{shown.map(review=><article key={review.id} className="flex flex-col rounded-lg border border-border bg-card p-6"><ReviewStars rating={review.rating} />{review.title&&<h3 className="mt-4 font-display text-2xl">{review.title}</h3>}<p className="mt-4 flex-1 whitespace-pre-wrap text-sm leading-8 text-foreground">{review.body}</p>{review.edited&&<p className="mt-3 text-xs text-muted-foreground">Edited for formatting or privacy.</p>}<div className="mt-6 border-t border-border pt-4"><p className="font-semibold">{review.customer_name}</p>{(review.event_type||review.event_month)&&<p className="mt-1 text-xs text-muted-foreground">{[review.event_type,review.event_month].filter(Boolean).join(' · ')}</p>}</div></article>)}</div>
  {!featured&&reviews.length>6&&<nav aria-label="Customer review pages" className="mt-7 flex items-center gap-4"><Button variant="outline" disabled={page===0} onClick={()=>setPage(page-1)}>Previous</Button><span className="text-sm" role="status">Page {page+1} of {Math.ceil(reviews.length/6)}</span><Button variant="outline" disabled={(page+1)*6>=reviews.length} onClick={()=>setPage(page+1)}>Next</Button></nav>}
 </div></section>;
}
export function ReviewForm(){
 const [input,setInput]=useState<ReviewInput>({...emptyReview});const [errors,setErrors]=useState<ReviewErrors>({});
 const [token,setToken]=useState('');const [preparing,setPreparing]=useState(false);const [ready,setReady]=useState(false);const requesting=useRef(false);
 const [busy,setBusy]=useState(false);const [done,setDone]=useState(false);const [failure,setFailure]=useState('');
 const [submitReview]=useState(()=>createReviewSubmitter(payload=>getPublicContentClient().rpc('submit_customer_review',payload).abortSignal(AbortSignal.timeout(15000))));
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{if(!token)return;setReady(false);const timer=setTimeout(()=>setReady(true),2200);return()=>clearTimeout(timer);},[token]);
 async function prepare(){
  if(requesting.current||token)return;requesting.current=true;setPreparing(true);
  try{const {data,error}=await getPublicContentClient().rpc('begin_customer_review').abortSignal(AbortSignal.timeout(8000));if(error||!data)throw error;setToken(data);setFailure('');}
  catch{setFailure('The review form is temporarily unavailable. Your writing is still here. Please try again later.');}
  finally{requesting.current=false;setPreparing(false);}
 }
 function update<K extends keyof ReviewInput>(key:K,value:ReviewInput[K]){setInput(current=>({...current,[key]:value}));setErrors(current=>({...current,[key]:undefined}));}
 async function submit(event:React.FormEvent){
  event.preventDefault();if(busy)return;
  const found=validateReview(input);setErrors(found);const first=Object.keys(found)[0];
  if(first){document.getElementById(`review-${first}`)?.focus();return;}
  if(!token||!ready){void prepare();setFailure('Please wait a moment, then send your review.');return;}
  setBusy(true);setFailure('');const result=await submitReview(input,token);if(result.status==='duplicate'){setBusy(false);return;}setBusy(false);
  if(result.status==='success'){setDone(true);requestAnimationFrame(()=>heading.current?.focus());}
  else setFailure('Your review could not be confirmed. Please try again. If this keeps happening, refresh the submission below; your writing will be kept.');
 }
 const error=(key:keyof ReviewInput)=>errors[key]?<p id={`review-${key}-error`} className="field-error" role="alert">{errors[key]}</p>:null;
 if(done)return <section id="share-review" className="px-5 py-14"><div className="mx-auto max-w-3xl rounded-lg border border-border bg-secondary p-8"><CheckCircle2 className="size-10 text-primary" /><h2 ref={heading} tabIndex={-1} className="mt-5 font-display text-3xl">Thank you for sharing your experience.</h2><p className="mt-4 leading-8">Your review has been submitted for moderation. It will appear on our website only after approval.</p></div></section>;
 return <section id="share-review" className="border-y border-border bg-secondary/40 px-5 py-14 lg:px-8"><div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-xs font-semibold uppercase tracking-widest text-primary">Your experience matters</p><h2 className="mt-3 font-display text-4xl">Tell us about your celebration.</h2><p className="mt-5 text-sm leading-8 text-muted-foreground">Share your own experience. Please avoid including phone numbers, addresses or other private information. Submissions are reviewed before publication.</p></div><form onSubmit={submit} onFocusCapture={()=>{void prepare();}} noValidate aria-busy={busy} className="rounded-lg border border-border bg-card p-5 sm:p-8"><fieldset disabled={busy} className="space-y-6"><legend className="sr-only">Customer review</legend>
  <div><Label htmlFor="review-name">Your name *</Label><Input id="review-name" autoComplete="name" maxLength={80} required className="mt-2" value={input.name} onChange={event=>update('name',event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name?'review-name-error':undefined}/>{error('name')}</div>
  <fieldset id="review-rating" tabIndex={-1} aria-invalid={!!errors.rating} aria-describedby={errors.rating?'review-rating-error':undefined}><legend className="mb-2 text-sm font-medium">Your rating *</legend><div className="flex flex-wrap gap-2">{[1,2,3,4,5].map(rating=><label key={rating} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-md border px-3 py-2 ${input.rating===rating?'border-primary bg-primary/5':'border-border'}`}><input type="radio" name="rating" value={rating} checked={input.rating===rating} required onChange={()=>update('rating',rating)} className="accent-primary" /><span>{rating}</span><Star aria-hidden className="size-4 text-gold" /></label>)}</div>{error('rating')}</fieldset>
  <div><Label htmlFor="review-title">Review title (optional)</Label><Input id="review-title" maxLength={100} className="mt-2" value={input.title} onChange={event=>update('title',event.target.value)} aria-invalid={!!errors.title}/>{error('title')}</div>
  <div><Label htmlFor="review-body">Your experience *</Label><Textarea id="review-body" required minLength={20} maxLength={2000} className="mt-2 min-h-40" value={input.body} onChange={event=>update('body',event.target.value)} aria-invalid={!!errors.body} aria-describedby={`review-count${errors.body?' review-body-error':''}`}/><p id="review-count" className="mt-2 text-xs text-muted-foreground">{input.body.length} / 2,000 characters · At least 20 characters</p>{error('body')}</div>
  <div className="grid gap-5 sm:grid-cols-2"><div><Label htmlFor="review-eventType">Event type (optional)</Label><select id="review-eventType" value={input.eventType} onChange={event=>update('eventType',event.target.value)} className="mt-2 w-full border border-input bg-card px-3 text-sm"><option value="">Prefer not to say</option>{reviewEvents.map(value=><option key={value}>{value}</option>)}</select>{error('eventType')}</div><div><Label htmlFor="review-eventMonth">Event month (optional)</Label><Input id="review-eventMonth" type="month" className="mt-2" value={input.eventMonth} onChange={event=>update('eventMonth',event.target.value)} aria-invalid={!!errors.eventMonth}/>{error('eventMonth')}</div></div>
  <label className="flex min-h-11 items-start gap-3 text-sm leading-7"><input id="review-consent" type="checkbox" required checked={input.consent} onChange={event=>update('consent',event.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent?'review-consent-error':undefined} className="mt-2 size-4 shrink-0 accent-primary"/><span>I give N-Sattu Cuisine permission to publish this review after moderation. *</span></label>{error('consent')}
  <label className="flex min-h-11 items-start gap-3 text-sm leading-7"><input type="checkbox" checked={input.displayName} onChange={event=>update('displayName',event.target.checked)} className="mt-2 size-4 shrink-0 accent-primary"/><span>You may display my name alongside my review. If unchecked, it will be shown as “A customer”.</span></label>
  <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="review-website">Leave this blank</label><input id="review-website" tabIndex={-1} autoComplete="off" value={input.website} onChange={event=>update('website',event.target.value)}/></div>
 </fieldset>{failure&&<div role="alert" className="mt-5 rounded-md border border-destructive/30 p-4 text-sm leading-7 text-destructive"><p>{failure}</p><Button type="button" variant="outline" className="mt-3" disabled={busy||preparing} onClick={()=>{setToken('');setReady(false);setFailure('Please focus a field or press Send to refresh your submission.');}}>Refresh submission</Button></div>}<p className="mt-5 text-xs leading-6 text-muted-foreground">We store your submission and consent to manage reviews. Read our <Link to="/privacy" target="_blank" rel="noreferrer" className="text-primary underline">privacy policy (opens in a new tab)</Link>.</p><Button type="submit" variant="royal" className="mt-5" disabled={busy||preparing||!!token&&!ready}>{(busy||preparing)&&<Loader2 className="size-4 animate-spin" />}{busy?'Sending review…':preparing?'Preparing form…':'Send for approval'}</Button><p role="status" className="sr-only">{busy?'Sending your review. Please wait.':''}</p></form></div></section>;
}
