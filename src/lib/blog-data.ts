export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishDate: string;
  readTime: string;
  author: string;
  category: string;
  excerpt: string;
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "wedding-catering-ajmer-guide",
    title: "How to Plan Wedding Catering in Ajmer: The Complete Host's Guide",
    metaTitle: "Planning Wedding Catering in Ajmer: The Complete Host's Guide",
    metaDescription:
      "A comprehensive guide to planning wedding catering in Ajmer: budgeting, choosing venues, selecting traditional Rajasthani menus, and arranging tastings.",
    publishDate: "2026-02-15",
    readTime: "6 min read",
    author: "Satyanarayan Prajapati",
    category: "Wedding Planning",
    excerpt:
      "From calculating guest portions to selecting live counters and booking kitchen tastings in Ajmer, here is everything hosts need to know before finalizing their wedding caterer.",
    image: "/media/buffet-6.jpg",
  },
  {
    slug: "rajasthani-wedding-food-menu",
    title: "The Ultimate Rajasthani Wedding Food Menu Guide: From Dal Baati to Royal Mithai",
    metaTitle: "Authentic Rajasthani Wedding Food Menu Guide | N Sattu Cuisine",
    metaDescription:
      "Discover how to compose an authentic Rajasthani wedding menu: Dal Baati Churma varieties, desert Ker Sangri, live jalebi counters, and pure desi ghee sweets.",
    publishDate: "2026-03-01",
    readTime: "7 min read",
    author: "Chanchal Prajapati",
    category: "Culinary Heritage",
    excerpt:
      "Explore the customary dishes, seasonal baatis, slow-roasted mawa sweets, and theatrical live food counters that define an unforgettable Marwari wedding feast.",
    image: "/media/rajasthani-stall.jpg",
  },
];
