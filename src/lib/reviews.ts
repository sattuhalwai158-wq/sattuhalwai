export type ReviewInput = {name:string;rating:number;title:string;body:string;eventType:string;eventMonth:string;consent:boolean;displayName:boolean;website:string};
export type ReviewErrors = Partial<Record<keyof ReviewInput,string>>;
export type PublicReview = {id:string;customer_name:string;rating:number;title:string;body:string;event_type:string;event_month:string;published_at:string;featured:boolean;sort_order:number;edited:boolean};
export type CustomerReview = {id:string;customer_name:string;display_name:boolean;rating:number;title:string;body:string;event_type:string;event_month:string;publication_consent:boolean;consent_at:string;status:'pending'|'published'|'rejected'|'hidden';created_at:string;published_at:string|null;moderated_at:string|null;moderator_id:string|null;edited_title:string|null;edited_body:string|null;moderation_note:string;featured:boolean;sort_order:number;fingerprint:string};
export const reviewEvents = ['Royal Wedding','Sangeet / Mehendi','Reception','Corporate Gala','Private Feast'];
export const emptyReview:ReviewInput={name:'',rating:0,title:'',body:'',eventType:'',eventMonth:'',consent:false,displayName:false,website:''};
export function normalizeReview(input:ReviewInput):ReviewInput {
 const clean=(value:string)=>value.replace(/[\u0000-\u001f\u007f]/g,' ').trim();
 return {...input,name:clean(input.name),title:clean(input.title),body:clean(input.body),eventType:input.eventType.trim(),eventMonth:input.eventMonth.trim()};
}
export function validateReview(raw:ReviewInput,month=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit'}).format(new Date()).slice(0,7)):ReviewErrors {
 const input=normalizeReview(raw);const errors:ReviewErrors={};
 if(input.name.length<2||input.name.length>80) errors.name='Use between 2 and 80 characters for your name.';
 if(!Number.isInteger(input.rating)||input.rating<1||input.rating>5) errors.rating='Choose a rating from 1 to 5 stars.';
 if(input.title.length>100) errors.title='Keep the title within 100 characters.';
 if(input.body.length<20||input.body.length>2000) errors.body='Write between 20 and 2,000 characters about your experience.';
 if(input.eventType && !reviewEvents.includes(input.eventType)) errors.eventType='Choose an event from the list.';
 if(input.eventMonth && (!/^\d{4}-(0[1-9]|1[0-2])$/.test(input.eventMonth)||input.eventMonth>month)) errors.eventMonth='Choose the month of a past or current event.';
 if(!input.consent) errors.consent='Your permission to publish is required.';
 if(input.website) errors.website='Please leave this field blank.';
 return errors;
}
export function reviewPayload(input:ReviewInput,token:string) {
 const clean=normalizeReview(input);
 return {_token:token,_name:clean.name,_rating:clean.rating,_title:clean.title,_body:clean.body,_event_type:clean.eventType,_event_month:clean.eventMonth,_consent:clean.consent,_display_name:clean.displayName,_website:clean.website};
}
export function createReviewSubmitter(write:(payload:ReturnType<typeof reviewPayload>)=>PromiseLike<{error:unknown}>) {
 let pending=false;
 return async(input:ReviewInput,token:string)=>{
  if(pending) return {status:'duplicate' as const};
  if(Object.keys(validateReview(input)).length||!token) return {status:'invalid' as const};
  pending=true;
  try{const result=await write(reviewPayload(input,token));if(result.error)throw result.error;return {status:'success' as const};}
  catch{return {status:'error' as const};}finally{pending=false;}
 };
}
export function reviewSummary(reviews:PublicReview[]) {
 return {count:reviews.length,average:reviews.length?reviews.reduce((total,review)=>total+review.rating,0)/reviews.length:null};
}
