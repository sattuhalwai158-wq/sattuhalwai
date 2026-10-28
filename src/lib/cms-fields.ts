import { BUSINESS_CONFIG } from '@/lib/site-config';
export type ContentField={key:string;label:string;fallback:string;type?:'text'|'long'|'phone'|'email'|'url'};
export const contentGroups:Record<string,{title:string;copy:string;fields:ContentField[]}>= {
 home:{title:'Homepage content',copy:'Update the words visitors see on the homepage. Photos and their order are managed in Gallery & Photos.',fields:[
  {key:'home_eyebrow',label:'Small heading above the headline',fallback:'Royal Wedding & Event Catering Specialist'},
  {key:'home_title',label:'Main headline',fallback:'The Art of Royal Catering.'},
  {key:'home_subtitle',label:'Supporting description',fallback:'Authentic Rajasthani feasts, handcrafted mithai and live food counters. Thoughtfully prepared for your family’s most cherished celebrations.',type:'long'},
  {key:'home_primary_cta',label:'Main button label',fallback:'Plan your celebration'},
  {key:'home_secondary_cta',label:'Menu button label',fallback:'Explore our menus'},
  {key:'home_story_title',label:'Brand introduction heading',fallback:'A family-led legacy of royal hospitality.'},
  {key:'home_story_copy',label:'Brand introduction',fallback:'At N SATTU CUISINE, we take pride in serving authentic, home-style flavors that have been passed down through generations. We are committed to making every event memorable with delectable dishes crafted from the finest ingredients and unmatched service tailored to your needs.',type:'long'},
  {key:'home_signature_title',label:'Signature cuisine heading',fallback:'Crafted for the royal table.'},
  {key:'home_signature_copy',label:'Signature cuisine introduction',fallback:'Discover our mithai, celebration plates and live-counter favourites. Discuss your preferences with our team.',type:'long'},
  {key:'home_services_title',label:'Services heading',fallback:'Everything your celebration needs.'},
  {key:'home_gallery_title',label:'Gallery heading',fallback:'Luxury setups & live theatrics.'},
  {key:'home_areas_title',label:'Service areas heading',fallback:'Celebrations across our home region.'},
  {key:'home_booking_title',label:'Final enquiry heading',fallback:'Start planning your royal feast.'},
  {key:'home_booking_copy',label:'Final enquiry description',fallback:'Share your event details through our booking form. Our team will review your requirements and contact you.',type:'long'},
  {key:'home_booking_cta',label:'Final enquiry button',fallback:'Open booking form'},
  {key:'setups_title',label:'Catering setups page heading',fallback:'The table becomes part of the palace.'},
  {key:'setups_copy',label:'Catering setups introduction',fallback:'Sculptural brass, considered lighting and live culinary moments transform service into an experience guests gather around.',type:'long'},
 ]},
 about:{title:'About page',copy:'Share your story in your own words. Publish only information that accurately describes your business.',fields:[
  {key:'about_title',label:'Page heading',fallback:'A legacy tempered over generations.'},
  {key:'about_intro',label:'Page introduction',fallback:'At N SATTU CUISINE, we take pride in serving authentic, home-style flavors that have been passed down through generations, crafting exquisite dishes for grand weddings and intimate celebrations.',type:'long'},
  {key:'about_story_title',label:'Story heading',fallback:'Authentic, home-style flavors passed down through generations.'},
  {key:'about_story_copy',label:'Full brand story',fallback:'At N SATTU CUISINE, we take pride in serving authentic, home-style flavors that have been passed down through generations. Whether it is a wedding, a corporate gathering or an intimate celebration, we plan the food and service around your needs.',type:'long'},
  {key:'about_philosophy',label:'Your approach to hospitality',fallback:'Our approach begins with a conversation about your traditions, preferences and guests. Together, we plan the food, presentation and service that suit your occasion.',type:'long'},
 ]},
 contact:{title:'Public contact information',copy:'Everything saved here can appear on the public website. Do not enter private account or administrative contact details.',fields:[
  {key:'contact_phone',label:'Public business phone',fallback:BUSINESS_CONFIG.telephone,type:'phone'},
  {key:'contact_phone_secondary',label:'Second public business phone (optional)',fallback:BUSINESS_CONFIG.secondaryTelephone,type:'phone'},
  {key:'contact_email',label:'Public email (optional)',fallback:'',type:'email'},
  {key:'contact_location',label:'Business location / appointment details',fallback:'Ajmer, Rajasthan · Consultations by appointment'},
  {key:'contact_instagram',label:'Instagram profile (optional)',fallback:BUSINESS_CONFIG.socialLinks.instagram,type:'url'},
  {key:'contact_youtube',label:'YouTube channel (optional)',fallback:BUSINESS_CONFIG.socialLinks.youtube,type:'url'},
 ]},
 settings:{title:'Website settings',copy:'Manage your public website identity. Account credentials and hosting settings are never shown here.',fields:[
  {key:'site_title',label:'Default website title',fallback:'N Sattu Cuisine · Wedding Catering in Ajmer'},
  {key:'site_description',label:'Default website description',fallback:BUSINESS_CONFIG.description,type:'long'},
  {key:'site_og_image',label:'Default social sharing photo URL',fallback:'/media/setups/illuminated-buffet-counters.jpg'},
  {key:'footer_copy',label:'Footer description',fallback:'Rajasthani wedding dining, handcrafted mithai and live counters. Prepared with care, served with warmth.',type:'long'},
  {key:'footer_heading',label:'Footer contact heading',fallback:'Let’s plan together'},
 ]},
};
export function validateContentField(field:ContentField,value:string):string|undefined {
 if(value.length>5000)return 'Keep this text within 5,000 characters.';
 if(field.type==='email'&&value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))return 'Enter a valid public email address.';
 if(field.type==='phone'&&value&&!/^\+?[\d\s()-]{8,20}$/.test(value))return 'Enter a valid public business phone number.';
 if(field.type==='url'&&value&&!/^https:\/\//i.test(value))return 'Use a full link beginning with https://.';
 if(field.key==='site_og_image'&&value&&!/^(https:\/\/|\/[^/])/.test(value))return 'Use a secure photo URL or an existing /media/ path.';
 if(['home_title','home_primary_cta','home_secondary_cta','site_title','contact_phone'].includes(field.key)&&!value.trim())return 'This field is required.';
 return undefined;
}
export function safeWebUrl(value:string){try{const url=new URL(value);return url.protocol==='https:'?url.href:'';}catch{return '';}}
