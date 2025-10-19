// Mock delay function to simulate API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Highlights data
const highlights = [
  {
    id: 'highlight-1',
    title: 'Ha Long Bay Luxury Cruise',
    description: 'Experience the majestic limestone karsts from our premium cruise',
    imageUrl: 'https://images.unsplash.com/photo-1578653882317-c04cd7104d77',
    price: 129,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 324,
    province: 'ha-long-bay',
    isNew: false,
    type: 'tour',
  },
  {
    id: 'highlight-2',
    title: 'Hoi An Lantern Making Workshop',
    description: 'Create traditional Vietnamese lanterns with local artisans',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
    price: 35,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 156,
    province: 'hoi-an',
    isNew: true,
    type: 'activity',
  },
  {
    id: 'highlight-3',
    title: 'Mai Chau Valley Homestay',
    description: 'Immerse yourself in the peaceful Mai Chau valley with a local family',
    imageUrl: 'https://images.unsplash.com/photo-1588411393236-d2524cca1196',
    price: 65,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 92,
    province: 'mai-chau',
    isNew: false,
    type: 'lodging',
  },
  {
    id: 'highlight-4',
    title: 'Mekong Delta Floating Market Tour',
    description: 'Navigate the bustling floating markets of the Mekong Delta',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
    price: 45,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 218,
    province: 'mekong-delta',
    isNew: false,
    type: 'tour',
  },
  {
    id: 'highlight-5',
    title: 'Phu Quoc Snorkeling Adventure',
    description: 'Discover vibrant marine life in the crystal waters of Phu Quoc',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    price: 55,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 187,
    province: 'phu-quoc',
    isNew: true,
    type: 'activity',
  },
  {
    id: 'highlight-6',
    title: 'Hanoi Street Food Tour',
    description: 'Sample authentic street food with a knowledgeable local guide',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    price: 40,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 302,
    province: 'hanoi',
    isNew: false,
    type: 'food',
  },
];

/**
 * Fetches highlighted services
 * @returns {Promise<Object[]>} Array of highlighted services
 */
export async function getHighlights() {
  await delay(700);
  return highlights;
}