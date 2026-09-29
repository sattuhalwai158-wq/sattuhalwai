CREATE TABLE public.site_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_items TO authenticated;
GRANT ALL ON public.site_items TO service_role;
ALTER TABLE public.site_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view items" ON public.site_items FOR SELECT USING (true);
CREATE POLICY "Admins insert items" ON public.site_items FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update items" ON public.site_items FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete items" ON public.site_items FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX site_items_kind_idx ON public.site_items(kind, sort_order);
INSERT INTO public.site_items (kind, data, sort_order) VALUES
('menu_category','{"name":"Artisanal Mithai"}'::jsonb,1),
('menu_category','{"name":"Live Theatrical Counters"}'::jsonb,2),
('menu_category','{"name":"Royal Rajasthani Thaal"}'::jsonb,3),
('menu_category','{"name":"Multi-Cuisine Banquets"}'::jsonb,4),
('menu_category','{"name":"Royal Refreshments"}'::jsonb,5),
('dish','{"title":"Kesar Badam Flower","local":"केसर बादाम पुष्प","category":"Artisanal Mithai","description":"Kashmiri saffron and Californian almond confection, sculpted petal by petal.","tags":"Pure Desi Ghee, Chef Signature","pairing":"Kahwa, rose milk or a light after-dinner tea.","image":"/media/rose-sweet-slices.jpg"}'::jsonb,1),
('dish','{"title":"Mini Mawa Kachori","local":"मावा कचौरी","category":"Artisanal Mithai","description":"A crisp golden shell filled with slow-roasted khoya, nuts and warm spice.","tags":"Pure Desi Ghee, Chef Signature","pairing":"Saffron rabdi and masala chai.","image":"/media/rose-sweet-cups-2.jpg"}'::jsonb,2),
('dish','{"title":"Royal Dal Baati Churma","local":"दाल बाटी चूरमा","category":"Royal Rajasthani Thaal","description":"Clay-baked baatis, fragrant panchmel dal and three artisanal churmas.","tags":"Jain Available, Heritage Recipe","pairing":"Chaas, lehsun chutney and ker sangri.","image":"/media/shadi-breakfast.jpg"}'::jsonb,3),
('dish','{"title":"Live Jalebi & Rabdi","local":"जलेबी रबड़ी","category":"Live Theatrical Counters","description":"Golden spirals fried live in desi ghee, served with saffron laccha rabdi.","tags":"Live Counter, Pure Desi Ghee","pairing":"Warm milk or pistachio kulfi.","image":"/media/haldi-breakfast.jpg"}'::jsonb,4),
('dish','{"title":"Ker Sangri","local":"केर सांगरी","category":"Royal Rajasthani Thaal","description":"Desert berries and beans tempered with heirloom spices and dried mango.","tags":"Jain Available, Heritage Recipe","pairing":"Bajra roti, boondi raita and dal.","image":"/media/mehendi-lunch.jpg"}'::jsonb,5),
('dish','{"title":"Paneer Lababdar","local":"पनीर लबाबदार","category":"Multi-Cuisine Banquets","description":"Soft paneer in a velvety tomato-cashew gravy finished to order.","tags":"Jain Available, Banquet Favourite","pairing":"Garlic naan and saffron pulao.","image":"/media/haldi-dinner.jpg"}'::jsonb,6),
('dish','{"title":"Tandoor Theatre","local":"लाइव तंदूर","category":"Live Theatrical Counters","description":"Fragrant breads and kebabs emerge from the tandoor before your guests.","tags":"Live Counter, Chef Signature","pairing":"Mint chutney and smoked chaas.","image":"/media/live-dosa-counter.jpg"}'::jsonb,7),
('dish','{"title":"Kesar Thandai","local":"केसर ठंडाई","category":"Royal Refreshments","description":"A chilled saffron, almond and rose refreshment served from ornate brass urns.","tags":"Royal Refreshment, Jain Available","pairing":"Welcome canapés and mithai.","image":"/media/high-tea.jpg"}'::jsonb,8),
('setup_category','{"name":"LED Buffet Staging"}'::jsonb,1),
('setup_category','{"name":"Live Counters & Theatrics"}'::jsonb,2),
('setup_category','{"name":"Royal Serveware"}'::jsonb,3),
('setup','{"title":"Illuminated Buffet Counters","category":"LED Buffet Staging","detail":"Ajmer • Winter wedding • 1,200 guests","image":"/media/buffet-6.jpg"}'::jsonb,1),
('setup','{"title":"Live Dosa Counter","category":"Live Counters & Theatrics","detail":"Pushkar • Sangeet supper • 650 guests","image":"/media/live-dosa-counter.jpg"}'::jsonb,2),
('setup','{"title":"Brass & Kulhad Service","category":"Royal Serveware","detail":"Pushkar • Palace reception • 900 guests","image":"/media/buffet-28.jpg"}'::jsonb,3),
('setup','{"title":"Royal Wedding Thali","category":"Royal Serveware","detail":"Ajmer • Tasting atelier • Private event","image":"/media/rajasthani-stall.jpg"}'::jsonb,4),
('setup','{"title":"Night Food Street","category":"LED Buffet Staging","detail":"Kishangarh • Wedding brunch • 800 guests","image":"/media/night-stalls.jpg"}'::jsonb,5),
('setup','{"title":"Rose Mithai Platter","category":"Royal Serveware","detail":"Ajmer • Engagement evening • 500 guests","image":"/media/rose-sweet-cups.jpg"}'::jsonb,6),
('testimonial','{"quote":"The food arrived piping hot at every table. Our guests still speak about the dal baati and live jalebi.","name":"Ritika & Arjun","venue":"Pushkar wedding","date":"November 2025"}'::jsonb,1),
('testimonial','{"quote":"They understood our palace venue instantly. The brass buffet became part of the décor, not just service.","name":"Meera Shah","venue":"Ajmer reception","date":"February 2026"}'::jsonb,2),
('testimonial','{"quote":"Every Jain counter was truly separate and beautifully presented. Our family felt completely looked after.","name":"Devanshi & Rohan","venue":"Ajmer wedding","date":"December 2025"}'::jsonb,3),
('testimonial','{"quote":"From tasting to the final plate, their team was calm, precise and generous. The mithai was exceptional.","name":"Ishita Jain","venue":"Kishangarh celebration","date":"January 2026"}'::jsonb,4),
('testimonial','{"quote":"Guests gathered around the live counters all evening. It gave the celebration wonderful energy.","name":"Kunal & Naina","venue":"Pushkar sangeet","date":"March 2026"}'::jsonb,5),
('testimonial','{"quote":"The flavours felt deeply traditional, yet the presentation was worthy of an international luxury event.","name":"Aarav Mehta","venue":"Pushkar destination wedding","date":"April 2026"}'::jsonb,6),
('faq','{"q":"Which places do you cater in?","a":"We cater celebrations in Ajmer, Pushkar and Kishangarh."}'::jsonb,1),
('faq','{"q":"Do you make pure Jain food? (जैन भोजन)","a":"Yes. Separate Jain cooking, utensils and live counters without onion and garlic can be arranged."}'::jsonb,2),
('faq','{"q":"How many guests can you serve?","a":"From intimate functions of 100 guests to grand weddings of 5,000 or more."}'::jsonb,3),
('faq','{"q":"Can we taste the food before booking?","a":"Yes. Tasting sessions are arranged by appointment at our Ajmer kitchen."}'::jsonb,4),
('faq','{"q":"Do you provide serveware and buffet décor?","a":"Yes. We bring complete royal brass, copper and custom LED thematic buffet installations."}'::jsonb,5),
('service','{"title":"Royal Wedding Banquets","hi":"शादी का भोज","image":"/media/buffet-6.jpg"}'::jsonb,1),
('service','{"title":"Artisanal Mithai","hi":"खास मिठाइयाँ","image":"/media/sweet-rose-platter.jpg"}'::jsonb,2),
('service','{"title":"Live Food Counters","hi":"लाइव काउंटर","image":"/media/live-dosa-counter.jpg"}'::jsonb,3),
('service','{"title":"Palace Buffet Setups","hi":"शाही सजावट","image":"/media/buffet-28.jpg"}'::jsonb,4),
('stat','{"value":"10+","label":"Years of mastery","hi":"10 साल का अनुभव"}'::jsonb,1),
('stat','{"value":"500+","label":"Royal celebrations","hi":"500+ शादियाँ"}'::jsonb,2),
('stat','{"value":"100%","label":"Pure desi ghee","hi":"शुद्ध देसी घी"}'::jsonb,3),
('stat','{"value":"50+","label":"Halwais & crew","hi":"हलवाई और स्टाफ"}'::jsonb,4),
('destination','{"place":"Ajmer","hi":"अजमेर","image":"/media/buffet-6.jpg"}'::jsonb,1),
('destination','{"place":"Pushkar","hi":"पुष्कर","image":"/media/rajasthani-stall.jpg"}'::jsonb,2),
('destination','{"place":"Kishangarh","hi":"किशनगढ़","image":"/media/night-stalls.jpg"}'::jsonb,3);