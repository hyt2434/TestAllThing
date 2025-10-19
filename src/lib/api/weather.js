// Mock delay function to simulate API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Weather data by province
const weatherData = {
  'hanoi': {
    city: 'Hanoi',
    currentTemp: 28,
    condition: 'sunny',
    humidity: 75,
    updatedAt: new Date().toISOString(),
    suggestions: [
      { 
        text: 'Visit the Old Quarter early morning or evening to avoid the midday heat',
        type: 'activity'
      },
      {
        text: 'Try a refreshing coconut coffee at a rooftop café',
        type: 'food'
      },
      {
        text: 'Explore the shaded Temple of Literature',
        type: 'attraction'
      }
    ]
  },
  'ho-chi-minh-city': {
    city: 'Ho Chi Minh City',
    currentTemp: 32,
    condition: 'partly-cloudy',
    humidity: 80,
    updatedAt: new Date().toISOString(),
    suggestions: [
      { 
        text: 'Cool off at the Water Puppet Theater with indoor air conditioning',
        type: 'activity'
      },
      {
        text: 'Enjoy an iced Vietnamese coffee at a local café',
        type: 'food'
      },
      {
        text: 'Visit the War Remnants Museum during the cooler afternoon hours',
        type: 'attraction'
      }
    ]
  },
  'da-nang': {
    city: 'Da Nang',
    currentTemp: 30,
    condition: 'rainy',
    humidity: 85,
    updatedAt: new Date().toISOString(),
    suggestions: [
      { 
        text: 'Explore the Marble Mountains caves (natural shelter from rain)',
        type: 'activity'
      },
      {
        text: 'Visit the Museum of Cham Sculpture (indoor activity)',
        type: 'attraction'
      },
      {
        text: 'Enjoy a hot bowl of Mì Quảng at a local restaurant',
        type: 'food'
      }
    ]
  },
  'hoi-an': {
    city: 'Hoi An',
    currentTemp: 29,
    condition: 'clear',
    humidity: 70,
    updatedAt: new Date().toISOString(),
    suggestions: [
      { 
        text: 'Take a sunrise photo tour of the Ancient Town',
        type: 'activity'
      },
      {
        text: 'Book a cooking class in the morning hours',
        type: 'food'
      },
      {
        text: 'Bicycle tour through the countryside in the late afternoon',
        type: 'activity'
      }
    ]
  },
  'ha-long-bay': {
    city: 'Ha Long Bay',
    currentTemp: 26,
    condition: 'foggy',
    humidity: 90,
    updatedAt: new Date().toISOString(),
    suggestions: [
      { 
        text: 'The fog creates a mystical atmosphere for photography on the bay',
        type: 'activity'
      },
      {
        text: 'Visit Sung Sot Cave where weather won\'t affect your experience',
        type: 'attraction'
      },
      {
        text: 'Try hot seafood hotpot at a local restaurant',
        type: 'food'
      }
    ]
  },
  'sapa': {
    city: 'Sapa',
    currentTemp: 18,
    condition: 'clear',
    humidity: 65,
    updatedAt: new Date().toISOString(),
    suggestions: [
      { 
        text: 'Perfect weather for a full-day trek to Cat Cat village',
        type: 'activity'
      },
      {
        text: 'Visit the Sapa market for local specialties',
        type: 'attraction'
      },
      {
        text: 'Try thang co (traditional horse meat soup) to warm up',
        type: 'food'
      }
    ]
  },
  'hue': {
    city: 'Hue',
    currentTemp: 27,
    condition: 'light-rain',
    humidity: 80,
    updatedAt: new Date().toISOString(),
    suggestions: [
      { 
        text: 'Visit the Imperial City with an umbrella (fewer crowds in light rain)',
        type: 'attraction'
      },
      {
        text: 'Take a covered boat tour on the Perfume River',
        type: 'activity'
      },
      {
        text: 'Warm up with a bowl of Bun Bo Hue at a local restaurant',
        type: 'food'
      }
    ]
  },
  'phu-quoc': {
    city: 'Phu Quoc',
    currentTemp: 31,
    condition: 'sunny',
    humidity: 75,
    updatedAt: new Date().toISOString(),
    suggestions: [
      { 
        text: 'Snorkeling tour in the morning before peak heat',
        type: 'activity'
      },
      {
        text: 'Visit the Phu Quoc Night Market in the evening',
        type: 'attraction'
      },
      {
        text: 'Try fresh seafood at Ham Ninh fishing village',
        type: 'food'
      }
    ]
  },
};

// Rule-based suggestion generator
function generateRuleBasedSuggestions(data) {
  const { condition, currentTemp } = data;
  const suggestions = [...data.suggestions]; // Start with default suggestions
  
  // Add weather-specific suggestions
  if (condition === 'rainy' || condition === 'light-rain') {
    suggestions.unshift({
      text: 'Consider indoor activities today due to rain',
      type: 'weather'
    });
  } else if (condition === 'sunny' && currentTemp > 30) {
    suggestions.unshift({
      text: 'High temperatures today - stay hydrated and seek shade when possible',
      type: 'weather'
    });
  } else if (condition === 'foggy') {
    suggestions.unshift({
      text: 'Limited visibility may affect some outdoor activities',
      type: 'weather'
    });
  } else if (currentTemp < 20) {
    suggestions.unshift({
      text: 'Cooler temperatures today - bring a light jacket',
      type: 'weather'
    });
  }
  
  return suggestions.slice(0, 4); // Limit to 4 suggestions
}

/**
 * Fetches weather and suggestions for a province
 * @param {Object} params - Parameters
 * @param {string} params.provinceId - Province ID
 * @returns {Promise<Object>} Weather and suggestions data
 */
export async function getWeatherSuggestions({ provinceId = 'hanoi' }) {
  await delay(500);
  
  // Default to Hanoi if province not found
  const data = weatherData[provinceId] || weatherData['hanoi'];
  
  // Generate dynamic suggestions based on weather
  const suggestions = generateRuleBasedSuggestions(data);
  
  return {
    ...data,
    suggestions,
    updatedAt: new Date().toISOString(), // Refresh timestamp
  };
}

/**
 * Gets all available provinces for the weather widget
 * @returns {Promise<Object[]>} Array of province objects
 */
export async function getAvailableProvinces() {
  await delay(300);
  
  return Object.keys(weatherData).map(key => ({
    id: key,
    name: weatherData[key].city
  }));
}