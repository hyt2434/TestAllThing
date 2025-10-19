// Mock delay function to simulate API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Promotions data
const promotions = [
  {
    id: 'promo-1',
    title: 'Early Bird Summer Special',
    description: 'Book any summer tour 30 days in advance and get 15% off',
    conditions: 'Valid for tours between June 1 and August 31. Must book 30 days in advance.',
    validUntil: '2025-05-31',
    discountType: 'percentage',
    discountValue: 15,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    code: 'SUMMER15',
    trending: true,
    endingSoon: true,
  },
  {
    id: 'promo-2',
    title: 'Family Package Deal',
    description: 'Kids under 12 stay free when booking 3+ nights accommodation',
    conditions: 'Maximum 2 kids per booking. Valid for select properties only.',
    validUntil: '2025-12-31',
    discountType: 'special',
    discountValue: null,
    imageUrl: 'https://images.unsplash.com/photo-1622544446913-1e31d08623e4',
    code: 'FAMILY2025',
    trending: true,
    endingSoon: false,
  },
  {
    id: 'promo-3',
    title: 'Last Minute Getaway',
    description: '25% off selected tours and activities when booking within 72 hours',
    conditions: 'Subject to availability. Valid for select tours only.',
    validUntil: '2025-11-15',
    discountType: 'percentage',
    discountValue: 25,
    imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
    code: 'LASTMIN25',
    trending: false,
    endingSoon: true,
  },
  {
    id: 'promo-4',
    title: 'Midweek Spa Retreat',
    description: 'Book any spa treatment Monday-Thursday and get a complimentary wellness drink',
    conditions: 'Valid for treatments valued at $50+. Excluding holidays.',
    validUntil: '2025-12-31',
    discountType: 'freebie',
    discountValue: null,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
    code: 'MIDWEEKSPA',
    trending: false,
    endingSoon: false,
  },
];

/**
 * Fetches active promotions
 * @param {string} [filter] - Optional filter ("trending" or "endingSoon")
 * @returns {Promise<Object[]>} Array of active promotions
 */
export async function getActivePromotions(filter) {
  await delay(600);
  
  if (filter === 'trending') {
    return promotions.filter(promo => promo.trending);
  } else if (filter === 'endingSoon') {
    return promotions.filter(promo => promo.endingSoon);
  }
  
  return promotions;
}