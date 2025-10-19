// Mock delay function to simulate API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Popular search keywords
const popularKeywords = [
  'Ha Long Bay tours',
  'Hoi An cooking class',
  'Mekong Delta homestay',
  'Sapa trekking',
  'Phu Quoc beaches',
  'Hanoi street food',
  'Hue imperial city',
  'Cu Chi tunnels',
  'Danang resorts',
  'Ninh Binh boat tour',
  'Dalat adventure',
];

// Services data
const services = [
  {
    id: 'tour-1',
    type: 'tour',
    title: 'Ha Long Bay Premium Cruise',
    description: 'Luxury overnight cruise in Ha Long Bay with kayaking and cave exploration',
    price: 129,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 245,
    imageUrl: 'https://images.unsplash.com/photo-1582704294151-bedeb5b05d61',
    province: 'ha-long-bay',
    duration: '2 days, 1 night',
    groupSize: 'Max 20 people',
    featured: true,
    tags: ['cruise', 'kayaking', 'scenery', 'luxury'],
  },
  {
    id: 'restaurant-1',
    type: 'restaurant',
    title: 'Hanoi Home Restaurant',
    description: 'Traditional Vietnamese cuisine in a family-style setting',
    price: 15,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 187,
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    province: 'hanoi',
    cuisine: 'Vietnamese',
    dietaryOptions: ['Vegetarian friendly', 'Vegan options'],
    featured: true,
    tags: ['family-style', 'authentic', 'traditional'],
  },
  {
    id: 'lodging-1',
    type: 'lodging',
    title: 'Riverside Eco Lodge',
    description: 'Sustainable bamboo bungalows overlooking the Mekong River',
    price: 65,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 132,
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
    province: 'mekong-delta',
    accommodationType: 'Eco Lodge',
    amenities: ['River view', 'Free breakfast', 'Bicycle rental'],
    featured: true,
    tags: ['eco-friendly', 'sustainable', 'nature'],
  },
  {
    id: 'transport-1',
    type: 'transport',
    title: 'Luxury Van Transfer',
    description: 'Private transfer from Ho Chi Minh City to Mui Ne beach',
    price: 85,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9',
    province: 'ho-chi-minh-city',
    transportType: 'Private Van',
    duration: '4 hours',
    featured: true,
    tags: ['comfortable', 'air-conditioned', 'wifi'],
  },
  {
    id: 'tour-2',
    type: 'tour',
    title: 'Sapa Rice Terraces Trekking',
    description: '3-day trek through stunning rice terraces and minority villages',
    price: 220,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 163,
    imageUrl: 'https://images.unsplash.com/photo-1528884539581-87d2f45d0427',
    province: 'sapa',
    duration: '3 days, 2 nights',
    groupSize: 'Max 10 people',
    featured: true,
    tags: ['trekking', 'homestay', 'culture'],
  },
  {
    id: 'restaurant-2',
    type: 'restaurant',
    title: 'Hoi An Riverside Kitchen',
    description: 'Cooking classes and dining with river views',
    price: 25,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1523906921802-b5d2d899e93b',
    province: 'hoi-an',
    cuisine: 'Central Vietnamese',
    dietaryOptions: ['Vegetarian friendly', 'Gluten-free options'],
    featured: false,
    tags: ['cooking-class', 'river-view', 'local-cuisine'],
  },
  {
    id: 'lodging-2',
    type: 'lodging',
    title: 'Phu Quoc Island Resort',
    description: 'Beachfront resort with private villas and infinity pool',
    price: 145,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 275,
    imageUrl: 'https://images.unsplash.com/photo-1540361692939-989242037218',
    province: 'phu-quoc',
    accommodationType: 'Beach Resort',
    amenities: ['Private beach', 'Infinity pool', 'Spa', 'Free breakfast'],
    featured: false,
    tags: ['beachfront', 'luxury', 'pool'],
  },
  {
    id: 'transport-2',
    type: 'transport',
    title: 'Motorbike Adventure Rental',
    description: 'Self-guided motorcycle rental for the Ha Giang Loop',
    price: 20,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1535916707207-35f97e715e1c',
    province: 'ha-giang',
    transportType: 'Motorcycle Rental',
    duration: 'Daily rate',
    featured: false,
    tags: ['adventure', 'self-guided', 'motorbike'],
  },
];

/**
 * Fetches popular search keywords
 * @returns {Promise<string[]>} Array of popular keywords
 */
export async function getPopularKeywords() {
  await delay(500);
  return popularKeywords;
}

/**
 * Searches for services based on provided parameters
 * @param {Object} params - Search parameters
 * @param {string} [params.query] - Search query string
 * @param {string} [params.type] - Type of service (tour, restaurant, lodging, transport)
 * @param {string} [params.province] - Province/location
 * @param {Date} [params.date] - Travel date
 * @returns {Promise<Object[]>} Array of matching services
 */
export async function searchServices(params = {}) {
  await delay(800);
  
  let results = [...services];
  
  // Filter by query
  if (params.query) {
    const query = params.query.toLowerCase();
    results = results.filter(
      service => 
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  // Filter by type
  if (params.type) {
    results = results.filter(service => service.type === params.type);
  }
  
  // Filter by province
  if (params.province) {
    results = results.filter(service => service.province === params.province);
  }
  
  // Date filtering would be applied here in a real API
  
  return results;
}