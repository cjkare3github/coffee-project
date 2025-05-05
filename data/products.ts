export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  details: string;
  price: number;
  image: string;
  images: string[];
  category: 'beans' | 'ground' | 'instant' | 'accessories';
  tags: string[];
  roastLevel?: 'light' | 'medium' | 'dark';
  origin?: string;
  flavor?: string[];
  weight?: string[];
  grindOptions?: string[];
  featured?: boolean;
  bestseller?: boolean;
  new?: boolean;
  stock: number;
};

export const products: Product[] = [
  {
    id: "coffee-001",
    name: "Kilimanjaro Morning Blend",
    slug: "kilimanjaro-morning-blend",
    description: "A bright and fruity medium roast with notes of citrus and berries, perfect for starting your day.",
    details: "Our Kilimanjaro Morning Blend is sourced from the northern slopes of Mount Kilimanjaro, where the volcanic soil and high altitude create perfect growing conditions. The beans are carefully handpicked and processed using the washed method to preserve their bright, clean profile. This medium roast coffee offers a delightful combination of citrus acidity with sweet berry notes and a smooth, clean finish. Enjoy the taste of Tanzania's most famous coffee region in every cup.",
    price: 16.99,
    image: "https://images.pexels.com/photos/14276479/pexels-photo-14276479.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/14276479/pexels-photo-14276479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.pexels.com/photos/7964869/pexels-photo-7964869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.pexels.com/photos/6102737/pexels-photo-6102737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    ],
    category: "beans",
    tags: ["medium roast", "fruity", "morning", "kilimanjaro"],
    roastLevel: "medium",
    origin: "Mount Kilimanjaro, Tanzania",
    flavor: ["Citrus", "Berries", "Honey"],
    weight: ["250g", "500g", "1kg"],
    grindOptions: ["Whole Bean", "Espresso", "Filter", "French Press"],
    featured: true,
    bestseller: true,
    new: false,
    stock: 45
  },
  {
    id: "coffee-002",
    name: "Mbeya Highland Reserve",
    slug: "mbeya-highland-reserve",
    description: "A rich dark roast with chocolate and nutty notes, perfect for espresso and milk-based drinks.",
    details: "Grown in the highlands of Mbeya region in southwestern Tanzania, this exceptional coffee thrives at elevations of 1,400-1,800 meters. The cool climate and rich soil contribute to its distinctive flavor profile. Our Mbeya Highland Reserve is a dark roast that brings out deep chocolate notes with a hint of hazelnut and a smooth, full body. The finish offers a subtle sweetness reminiscent of dark chocolate. This coffee makes an outstanding espresso and holds up beautifully in milk-based drinks.",
    price: 18.99,
    image: "https://images.pexels.com/photos/7306221/pexels-photo-7306221.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/7306221/pexels-photo-7306221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.pexels.com/photos/2334156/pexels-photo-2334156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.pexels.com/photos/15489106/pexels-photo-15489106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    ],
    category: "beans",
    tags: ["dark roast", "chocolate", "espresso", "mbeya"],
    roastLevel: "dark",
    origin: "Mbeya Region, Tanzania",
    flavor: ["Dark Chocolate", "Hazelnut", "Caramel"],
    weight: ["250g", "500g", "1kg"],
    grindOptions: ["Whole Bean", "Espresso", "Filter", "French Press"],
    featured: true,
    bestseller: false,
    new: false,
    stock: 38
  },
  {
    id: "coffee-003",
    name: "Tanzanian Peaberry",
    slug: "tanzanian-peaberry",
    description: "A special light roast made from rare peaberry beans with bright acidity and floral notes.",
    details: "Peaberry coffee beans are a natural mutation that occurs in roughly 5% of coffee cherries, where a single, rounded bean develops instead of the usual two flat-sided beans. Our Tanzanian Peaberry is carefully sorted to collect only these special beans, which many believe offer a more concentrated flavor. This light roast showcases the exceptional qualities of Tanzanian peaberry - bright, clean acidity with pronounced floral notes and a hint of black tea. The finish is crisp and wine-like, making this a truly distinctive coffee experience.",
    price: 21.99,
    image: "https://images.pexels.com/photos/2119525/pexels-photo-2119525.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/2119525/pexels-photo-2119525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.pexels.com/photos/1850957/pexels-photo-1850957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.pexels.com/photos/4820818/pexels-photo-4820818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    ],
    category: "beans",
    tags: ["light roast", "peaberry", "floral", "specialty"],
    roastLevel: "light",
    origin: "Various regions, Tanzania",
    flavor: ["Floral", "Black Tea", "Citrus"],
    weight: ["250g", "500g"],
    grindOptions: ["Whole Bean", "Espresso", "Filter", "French Press"],
    featured: true,
    bestseller: false,
    new: true,
    stock: 25
  },
  {
    id: "coffee-004",
    name: "Arusha Estate Blend",
    slug: "arusha-estate-blend",
    description: "A balanced medium-dark roast with notes of brown sugar and spice from the Arusha region.",
    details: "The Arusha region near Mount Meru is home to some of Tanzania's oldest coffee estates. Our Arusha Estate Blend combines beans from select estates in this historic coffee-growing area. This medium-dark roast offers a perfect balance between brightness and body, with prominent notes of brown sugar and warm baking spices like cinnamon and cardamom. The finish has a pleasant, lingering sweetness. This versatile coffee works well with all brewing methods and is especially delightful as a pour-over.",
    price: 17.99,
    image: "https://images.pexels.com/photos/1493804/pexels-photo-1493804.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/1493804/pexels-photo-1493804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.pexels.com/photos/7525168/pexels-photo-7525168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    ],
    category: "beans",
    tags: ["medium-dark roast", "balanced", "brown sugar", "arusha"],
    roastLevel: "medium",
    origin: "Arusha Region, Tanzania",
    flavor: ["Brown Sugar", "Cinnamon", "Stone Fruit"],
    weight: ["250g", "500g", "1kg"],
    grindOptions: ["Whole Bean", "Espresso", "Filter", "French Press"],
    featured: false,
    bestseller: true,
    new: false,
    stock: 42
  },
  {
    id: "coffee-005",
    name: "Organic Moshi Cooperative",
    slug: "organic-moshi-cooperative",
    description: "A light-medium roast with bright acidity and notes of tropical fruit from the Moshi cooperative.",
    details: "The Moshi Cooperative encompasses small-scale farmers on the southern slopes of Kilimanjaro who have adopted organic farming practices. This light-medium roast highlights the clean, bright character of their coffee with pronounced tropical fruit notes like pineapple and mango. The cup has a juicy mouthfeel with a hint of sweet honey in the finish. By purchasing this coffee, you're supporting sustainable farming practices and fair compensation for small-scale Tanzanian farmers.",
    price: 19.99,
    image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.pexels.com/photos/5948246/pexels-photo-5948246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.pexels.com/photos/686747/pexels-photo-686747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    ],
    category: "beans",
    tags: ["organic", "light-medium roast", "tropical", "moshi"],
    roastLevel: "light",
    origin: "Moshi, Kilimanjaro Region, Tanzania",
    flavor: ["Tropical Fruit", "Honey", "Floral"],
    weight: ["250g", "500g", "1kg"],
    grindOptions: ["Whole Bean", "Espresso", "Filter", "French Press"],
    featured: false,
    bestseller: false,
    new: true,
    stock: 30
  },
  {
    id: "coffee-006",
    name: "Ceramic Pour-Over Dripper",
    slug: "ceramic-pour-over-dripper",
    description: "A premium ceramic pour-over dripper for perfect home brewing, designed with precision drainage.",
    details: "Crafted from high-quality ceramic, our Pour-Over Dripper is designed to bring out the best flavors in your ERASTO COFFEE beans. The conical design with spiral ribs and three precision drainage holes provides optimal water flow for even extraction. The ceramic material helps maintain consistent temperature throughout the brewing process. Compatible with standard #2 paper filters, this dripper sits perfectly on most mugs and small carafes. Easy to clean and dishwasher safe, this is an essential tool for any coffee enthusiast looking to explore the art of manual brewing.",
    price: 24.99,
    image: "https://images.pexels.com/photos/3631434/pexels-photo-3631434.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/3631434/pexels-photo-3631434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.pexels.com/photos/7180617/pexels-photo-7180617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.pexels.com/photos/5909250/pexels-photo-5909250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    ],
    category: "accessories",
    tags: ["brewing equipment", "ceramic", "pour-over", "dripper"],
    weight: ["One Size"],
    featured: false,
    bestseller: false,
    new: false,
    stock: 20
  }
];

export const featuredProducts = products.filter(product => product.featured);
export const bestsellerProducts = products.filter(product => product.bestseller);
export const newProducts = products.filter(product => product.new);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

export function getRelatedProducts(currentProductId: string, limit = 3): Product[] {
  const currentProduct = products.find(p => p.id === currentProductId);
  if (!currentProduct) return [];
  
  return products
    .filter(p => p.id !== currentProductId && p.category === currentProduct.category)
    .slice(0, limit);
}

export function getCategoryProducts(category: string): Product[] {
  return products.filter(p => p.category === category);
}