const delicacies = "/media/sweet-rose-platter.jpg";
const liveCounter = "/media/live-dosa-counter.jpg";
const masterHalwai = "/media/buffet-17.jpg";
const banquet = "/media/buffet-6.jpg";

export const navItems = [
  { label: "Home", hi: "होम", to: "/" },
  { label: "Menus", hi: "मेन्यू", to: "/menus" },
  { label: "Luxury Setups", hi: "सजावट", to: "/setups" },
  { label: "Reviews & FAQ", hi: "राय और सवाल", to: "/reviews" },
  { label: "Book Event", hi: "बुकिंग", to: "/book" },
  { label: "About", hi: "हमारी कहानी", to: "/about" },
] as const;

export const images = { delicacies, liveCounter, masterHalwai, banquet };

export const dishes = [
  { title: "Rose Kesar Dry Fruit Mithai", local: "गुलाब केसर ड्राई फ्रूट मिठाई", category: "Artisanal Mithai", description: "Rose-coated dry-fruit mithai with a bright kesar centre, arranged around a handcrafted sugar rose.", tags: ["Pure Desi Ghee", "Chef Signature"], image: "/media/rose-sweet-slices.jpg", position: "50% 50%", pairing: "Masala chai, kahwa or rose milk." },
  { title: "Rose Mawa Cups", local: "गुलाब मावा कप", category: "Artisanal Mithai", description: "Golden mawa cups crowned with rose-flavoured mithai and finished for wedding service.", tags: ["Pure Desi Ghee", "Chef Signature"], image: "/media/rose-sweet-cups-2.jpg", position: "50% 50%", pairing: "Kesar milk or masala chai." },
  { title: "Wedding Breakfast Platter", local: "शादी का नाश्ता", category: "Multi-Cuisine Banquets", description: "A wedding breakfast plate with sandwiches, savoury bites, chaat and fresh accompaniments.", tags: ["Wedding Breakfast", "Jain Available"], image: "/media/shadi-breakfast.jpg", position: "50% 50%", pairing: "Tea, coffee or fresh juice." },
  { title: "Haldi Breakfast Platter", local: "हल्दी का नाश्ता", category: "Multi-Cuisine Banquets", description: "A festive breakfast plate with savoury pancakes, dhokla, jalebi and colourful garnishes.", tags: ["Breakfast Service", "Jain Available"], image: "/media/haldi-breakfast.jpg", position: "50% 50%", pairing: "Masala chai or fresh juice." },
  { title: "Mehendi Lunch Thali", local: "मेहंदी लंच थाली", category: "Royal Rajasthani Thaal", description: "A generous lunch thali with roti, rice, curries and traditional accompaniments.", tags: ["Wedding Lunch", "Heritage Service"], image: "/media/mehendi-lunch.jpg", position: "50% 50%", pairing: "Chaas, salad and seasonal pickle." },
  { title: "Haldi Dinner Thali", local: "हल्दी डिनर थाली", category: "Royal Rajasthani Thaal", description: "A complete celebration thali with rice, dal, kadhi, vegetables, breads and sweets.", tags: ["Wedding Dinner", "Jain Available"], image: "/media/haldi-dinner.jpg", position: "50% 50%", pairing: "Chaas and fresh salad." },
  { title: "Live Moong Chilla Counter", local: "लाइव मूंग चीला काउंटर", category: "Live Theatrical Counters", description: "Fresh moong chillas cooked and garnished live for guests at the celebration.", tags: ["Live Counter", "Made to Order"], image: "/media/live-dosa-counter.jpg", position: "50% 50%", pairing: "Green chutney and house masala." },
  { title: "Masala Maggi", local: "मसाला मैगी", category: "Live Theatrical Counters", description: "Hot masala Maggi tossed with vegetables and served fresh at the live counter.", tags: ["Live Counter", "Jain Available"], image: "/media/high-tea.jpg", position: "50% 50%", pairing: "Tea, coffee or chilled refreshments." },
];

export const setups = [
  { title: "Illuminated Buffet Counters", category: "LED Buffet Staging", image: "/media/buffet-6.jpg", position: "50% 50%", detail: "Ajmer • Winter wedding • 1,200 guests" },
  { title: "Live Dosa Counter", category: "Live Counters & Theatrics", image: "/media/live-dosa-counter.jpg", position: "50% 50%", detail: "Pushkar • Sangeet supper • 650 guests" },
  { title: "Brass & Kulhad Service", category: "Royal Serveware", image: "/media/buffet-28.jpg", position: "50% 50%", detail: "Pushkar • Palace reception • 900 guests" },
  { title: "Royal Wedding Thali", category: "Royal Serveware", image: "/media/rajasthani-stall.jpg", position: "50% 50%", detail: "Ajmer • Tasting atelier • Private event" },
  { title: "Night Food Street", category: "LED Buffet Staging", image: "/media/night-stalls.jpg", position: "50% 50%", detail: "Kishangarh • Wedding brunch • 800 guests" },
  { title: "Rose Mithai Platter", category: "Royal Serveware", image: "/media/rose-sweet-cups.jpg", position: "50% 50%", detail: "Ajmer • Engagement evening • 500 guests" },
];

export const testimonials = [
  ["The food arrived piping hot at every table. Our guests still speak about the dal baati and live jalebi.", "Ritika & Arjun", "Pushkar wedding", "November 2025"],
  ["They understood our palace venue instantly. The brass buffet became part of the décor, not just service.", "Meera Shah", "Ajmer reception", "February 2026"],
  ["Every Jain counter was truly separate and beautifully presented. Our family felt completely looked after.", "Devanshi & Rohan", "Ajmer wedding", "December 2025"],
  ["From tasting to the final plate, their team was calm, precise and generous. The mithai was exceptional.", "Ishita Jain", "Kishangarh celebration", "January 2026"],
  ["Guests gathered around the live counters all evening. It gave the celebration wonderful energy.", "Kunal & Naina", "Pushkar sangeet", "March 2026"],
  ["The flavours felt deeply traditional, yet the presentation was worthy of an international luxury event.", "Aarav Mehta", "Pushkar destination wedding", "April 2026"],
];
