// Mock delay function to simulate API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Social posts data
const socialPosts = [
  {
    id: 'post-1',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
    caption: 'The magical lanterns of Hoi An ancient town ✨ #HoiAnMagic #VietnamTravel',
    username: 'traveler_emma',
    likes: 845,
    service: {
      id: 'tour-hoian-1',
      name: 'Hoi An Evening Walking Tour',
      type: 'tour',
    },
    location: 'Hoi An Ancient Town',
    province: 'hoi-an',
    postedAt: '2025-10-15T14:35:00Z',
    hashtags: ['HoiAnMagic', 'VietnamTravel', 'LanternFestival'],
  },
  {
    id: 'post-2',
    imageUrl: 'https://images.unsplash.com/photo-1528884539581-87d2f45d0427',
    caption: 'Sunrise trek at Mount Fansipan was worth every step 🏔️ #Fansipan #SapaHiking',
    username: 'hikinglife',
    likes: 1203,
    service: {
      id: 'tour-sapa-1',
      name: 'Fansipan Summit Trek',
      type: 'tour',
    },
    location: 'Mount Fansipan',
    province: 'sapa',
    postedAt: '2025-10-14T06:12:00Z',
    hashtags: ['Fansipan', 'SapaHiking', 'MountainViews', 'VietnamTravel'],
  },
  {
    id: 'post-3',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    caption: "Best street food tour in Hanoi! Can't get enough of these flavors 😍 #HanoiFoodie",
    username: 'foodie_sarah',
    likes: 782,
    service: {
      id: 'food-hanoi-1',
      name: 'Old Quarter Food Walking Tour',
      type: 'food',
    },
    location: 'Hanoi Old Quarter',
    province: 'hanoi',
    postedAt: '2025-10-13T19:45:00Z',
    hashtags: ['HanoiFoodie', 'StreetFood', 'FoodTour', 'VietnamCuisine'],
  },
  {
    id: 'post-4',
    imageUrl: 'https://images.unsplash.com/photo-1578653882317-c04cd7104d77',
    caption: 'Kayaking through the limestone karsts of Ha Long Bay 🚣‍♂️ #HaLongBay #VietnamAdventures',
    username: 'adventure_mike',
    likes: 1576,
    service: {
      id: 'cruise-halong-1',
      name: 'Premium Ha Long Bay Cruise',
      type: 'cruise',
    },
    location: 'Ha Long Bay',
    province: 'ha-long-bay',
    postedAt: '2025-10-12T11:23:00Z',
    hashtags: ['HaLongBay', 'VietnamAdventures', 'Kayaking', 'IslandLife'],
  },
  {
    id: 'post-5',
    imageUrl: 'https://images.unsplash.com/photo-1540361692939-989242037218',
    caption: 'Our gorgeous beachfront villa in Phu Quoc 🏝️ Perfect honeymoon spot! #PhuQuocIsland',
    username: 'travelcouple',
    likes: 2341,
    service: {
      id: 'resort-phuquoc-1',
      name: 'Seaside Luxury Resort & Spa',
      type: 'lodging',
    },
    location: 'Phu Quoc Island',
    province: 'phu-quoc',
    postedAt: '2025-10-10T15:17:00Z',
    hashtags: ['PhuQuocIsland', 'BeachVilla', 'HoneymoonGoals', 'IslandParadise'],
  },
  {
    id: 'post-6',
    imageUrl: 'https://images.unsplash.com/photo-1588411393236-d2524cca1196',
    caption: 'Homestay experience with the Hmong people in Mai Chau valley 🌿 #AuthenticTravel #MaiChau',
    username: 'culturetraveler',
    likes: 893,
    service: {
      id: 'homestay-maichau-1',
      name: 'Traditional Homestay Experience',
      type: 'lodging',
    },
    location: 'Mai Chau Valley',
    province: 'mai-chau',
    postedAt: '2025-10-09T08:56:00Z',
    hashtags: ['AuthenticTravel', 'MaiChau', 'HmongCulture', 'Homestay', 'VietnamCulture'],
  },
  {
    id: 'post-7',
    imageUrl: 'https://images.unsplash.com/photo-1537955564318-a6fa041c88fc',
    caption: 'The Imperial City of Hue is absolutely breathtaking in the morning light ☀️ #HueVietnam',
    username: 'historyseeker',
    likes: 674,
    service: {
      id: 'tour-hue-1',
      name: 'Imperial Hue Heritage Tour',
      type: 'tour',
    },
    location: 'Imperial City',
    province: 'hue',
    postedAt: '2025-10-08T07:45:00Z',
    hashtags: ['HueVietnam', 'ImperialCity', 'HistoricalSites', 'VietnamHeritage'],
  },
  {
    id: 'post-8',
    imageUrl: 'https://images.unsplash.com/photo-1555050551-82f8d3dbbeca',
    caption: 'Cruising through the floating markets of the Mekong Delta 🛶 #MekongDelta #FloatingMarket',
    username: 'river_explorer',
    likes: 1102,
    service: {
      id: 'tour-mekong-1',
      name: 'Mekong Delta Floating Markets Tour',
      type: 'tour',
    },
    location: 'Cai Rang Floating Market',
    province: 'mekong-delta',
    postedAt: '2025-10-07T10:33:00Z',
    hashtags: ['MekongDelta', 'FloatingMarket', 'RiverLife', 'LocalCulture'],
  },
];

/**
 * Fetches latest social posts
 * @param {number} [limit=8] - Maximum number of posts to return
 * @returns {Promise<Object[]>} Array of social posts
 */
export async function getLatestPosts(limit = 8) {
  await delay(800);
  return socialPosts.slice(0, limit);
}