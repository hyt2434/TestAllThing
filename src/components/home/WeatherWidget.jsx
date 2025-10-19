import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { getWeatherSuggestions, getAvailableProvinces } from '../../lib/api';

// Weather icons
const WeatherIcon = ({ condition }) => {
  switch (condition) {
    case 'sunny':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      );
    case 'rainy':
    case 'light-rain':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 16.29a1 1 0 011.41 0l4 4a1 1 0 01-1.41 1.41l-4-4a1 1 0 010-1.41zM12 15a1 1 0 01.7.29l4 4a1 1 0 01-1.4 1.42l-4-4a1 1 0 01.7-1.71zM5 8a7 7 0 1114 0 7 7 0 01-14 0z" clipRule="evenodd" />
        </svg>
      );
    case 'partly-cloudy':
    case 'cloudy':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
        </svg>
      );
    case 'foggy':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 16.29a1 1 0 011.41 0l4 4a1 1 0 01-1.41 1.41l-4-4a1 1 0 010-1.41zM12 15a1 1 0 01.7.29l4 4a1 1 0 01-1.4 1.42l-4-4a1 1 0 01.7-1.71zM5 8a7 7 0 1114 0 7 7 0 01-14 0z" clipRule="evenodd" />
        </svg>
      );
  }
};

function WeatherWidget() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState('hanoi');
  const [isChangingProvince, setIsChangingProvince] = useState(false);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getAvailableProvinces();
        setProvinces(data);
        // Set isChangingProvince to true initially if we have multiple provinces
        if (data.length > 1) {
          setIsChangingProvince(true);
        }
      } catch (err) {
        console.error('Failed to load provinces:', err);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const data = await getWeatherSuggestions({ provinceId: selectedProvince });
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load weather data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [selectedProvince]);

  const handleProvinceChange = (provinceId) => {
    setSelectedProvince(provinceId);
    setIsChangingProvince(false);
  };

  // Format the updated time
  const formatUpdatedTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden border-accent/20">
          <CardHeader className="bg-accent/5">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Weather Suggestions</CardTitle>
              <Button
                variant="ghost"
                onClick={() => setIsChangingProvince(!isChangingProvince)}
                className="hover:bg-accent hover:text-accent-foreground"
              >
                Change destination
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-4 w-48" />
                <div className="space-y-3 mt-6">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-4">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-semibold">
                      {weatherData.city}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Updated at {formatUpdatedTime(weatherData.updatedAt)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <WeatherIcon condition={weatherData.condition} />
                    <span className="text-2xl font-medium">
                      {weatherData.currentTemp}°C
                    </span>
                  </div>
                </div>
                
                <AnimatePresence mode="wait">
                  {isChangingProvince ? (
                    <motion.div
                      key="province-selector"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 overflow-hidden"
                    >
                      <h4 className="font-medium mb-2">Select a destination:</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {provinces.map((province) => (
                          <button
                            key={province.id}
                            onClick={() => handleProvinceChange(province.id)}
                            className={`p-2 text-sm rounded-md transition-colors ${
                              selectedProvince === province.id
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                          >
                            {province.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="suggestions"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 space-y-4"
                    >
                      <h4 className="font-medium">Today's recommendations:</h4>
                      <div className="space-y-3">
                        {weatherData.suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-4 bg-muted/50 rounded-lg"
                          >
                            <div className="flex gap-2">
                              <div className="mt-1 text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <p className="flex-1 text-sm">
                                {suggestion.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export { WeatherWidget };