import { useContent } from '@/lib/site-data';
import { BUSINESS_CONFIG } from '@/lib/site-config';
import { safeWebUrl } from '@/lib/cms-fields';
export function useSiteSettings(){
 const text=useContent();
 return {...BUSINESS_CONFIG,
  telephone:text('contact_phone',BUSINESS_CONFIG.telephone),
  secondaryTelephone:text('contact_phone_secondary',BUSINESS_CONFIG.secondaryTelephone),
  email:text('contact_email',''),
  location:text('contact_location','Ajmer, Rajasthan · Consultations by appointment'),
  socialLinks:{instagram:safeWebUrl(text('contact_instagram',BUSINESS_CONFIG.socialLinks.instagram)),youtube:safeWebUrl(text('contact_youtube',BUSINESS_CONFIG.socialLinks.youtube))},
  footerCopy:text('footer_copy','Rajasthani wedding dining, handcrafted mithai and live counters. Prepared with care, served with warmth.'),
  footerHeading:text('footer_heading','Let’s plan together'),
 };
}
