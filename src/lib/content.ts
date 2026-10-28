const delicacies = "/media/menus/mithai/signature-mithai-platter.webp";
const liveCounter = "/media/setups/live-dosa-counter.jpg";
const masterHalwai = "/media/about/catering-team-and-service.jpg";
const banquet = "/media/setups/illuminated-buffet-counters.jpg";

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
  {
    title: "Rose Kesar Dry Fruit Mithai",
    local: "गुलाब केसर ड्राई फ्रूट मिठाई",
    category: "Artisanal Mithai",
    description:
      "Rose-coated dry-fruit mithai with a bright kesar centre, arranged around a handcrafted sugar rose.",
    tags: ["Pure Desi Ghee", "Chef Signature"],
    image: "/media/menus/mithai/rose-kesar-slices.webp",
    position: "50% 50%",
    pairing: "Masala chai, kahwa or rose milk.",
  },
  {
    title: "Rose Mawa Cups",
    local: "गुलाब मावा कप",
    category: "Artisanal Mithai",
    description:
      "Golden mawa cups crowned with rose-flavoured mithai and finished for wedding service.",
    tags: ["Pure Desi Ghee", "Chef Signature"],
    image: "/media/menus/mithai/rose-mawa-cups.webp",
    position: "50% 50%",
    pairing: "Kesar milk or masala chai.",
  },
  {
    title: "Wedding Breakfast Platter",
    local: "शादी का नाश्ता",
    category: "Multi-Cuisine Banquets",
    description:
      "A wedding breakfast plate with sandwiches, savoury bites, chaat and fresh accompaniments.",
    tags: ["Wedding Breakfast", "Jain Available"],
    image: "/media/celebrations/wedding-breakfast-platter.jpg",
    position: "50% 50%",
    pairing: "Tea, coffee or fresh juice.",
  },
  {
    title: "Haldi Breakfast Platter",
    local: "हल्दी का नाश्ता",
    category: "Multi-Cuisine Banquets",
    description:
      "A festive breakfast plate with savoury pancakes, dhokla, jalebi and colourful garnishes.",
    tags: ["Breakfast Service", "Jain Available"],
    image: "/media/celebrations/haldi-breakfast-platter.jpg",
    position: "50% 50%",
    pairing: "Masala chai or fresh juice.",
  },
  {
    title: "Mehendi Lunch Thali",
    local: "मेहंदी लंच थाली",
    category: "Royal Rajasthani Thaal",
    description: "A generous lunch thali with roti, rice, curries and traditional accompaniments.",
    tags: ["Wedding Lunch", "Heritage Service"],
    image: "/media/celebrations/mehendi-lunch-platter.jpg",
    position: "50% 50%",
    pairing: "Chaas, salad and seasonal pickle.",
  },
  {
    title: "Haldi Dinner Thali",
    local: "हल्दी डिनर थाली",
    category: "Royal Rajasthani Thaal",
    description:
      "A complete celebration thali with rice, dal, kadhi, vegetables, breads and sweets.",
    tags: ["Wedding Dinner", "Jain Available"],
    image: "/media/celebrations/haldi-dinner-platter.jpg",
    position: "50% 50%",
    pairing: "Chaas and fresh salad.",
  },
  {
    title: "Live Moong Chilla Counter",
    local: "लाइव मूंग चीला काउंटर",
    category: "Live Theatrical Counters",
    description: "Fresh moong chillas cooked and garnished live for guests at the celebration.",
    tags: ["Live Counter", "Made to Order"],
    image: "/media/setups/live-dosa-counter.jpg",
    position: "50% 50%",
    pairing: "Green chutney and house masala.",
  },
  {
    title: "Masala Maggi",
    local: "मसाला मैगी",
    category: "Live Theatrical Counters",
    description: "Hot masala Maggi tossed with vegetables and served fresh at the live counter.",
    tags: ["Live Counter", "Jain Available"],
    image: "/media/celebrations/high-tea-platter.jpg",
    position: "50% 50%",
    pairing: "Tea, coffee or chilled refreshments.",
  },
];

export const setups = [
  {
    title: "Illuminated Buffet Counters",
    category: "LED Buffet Staging",
    image: "/media/setups/illuminated-buffet-counters.jpg",
    position: "50% 50%",
    detail: "Ajmer • Winter wedding",
  },
  {
    title: "Live Dosa Counter",
    category: "Live Counters & Theatrics",
    image: "/media/setups/live-dosa-counter.jpg",
    position: "50% 50%",
    detail: "Pushkar • Sangeet supper",
  },
  {
    title: "Brass & Kulhad Service",
    category: "Royal Serveware",
    image: "/media/setups/brass-and-kulhad-service.jpg",
    position: "50% 50%",
    detail: "Pushkar • Palace reception",
  },
  {
    title: "Royal Wedding Thali",
    category: "Royal Serveware",
    image: "/media/setups/rajasthani-food-stall.jpg",
    position: "50% 50%",
    detail: "Ajmer • Tasting atelier • Private event",
  },
  {
    title: "Night Food Street",
    category: "LED Buffet Staging",
    image: "/media/setups/night-food-stalls.jpg",
    position: "50% 50%",
    detail: "Kishangarh • Wedding brunch",
  },
  {
    title: "Rose Mithai Platter",
    category: "Royal Serveware",
    image: "/media/menus/mithai/rose-mithai-cups.jpg",
    position: "50% 50%",
    detail: "Ajmer • Engagement evening",
  },
];
