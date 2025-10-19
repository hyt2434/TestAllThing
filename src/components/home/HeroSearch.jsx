import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectItem } from '../ui/select';
import { DatePicker } from '../ui/date-picker';
import { Chip } from '../ui/chip';
import { useSearchParams } from 'react-router-dom';
import { getPopularKeywords } from '../../lib/api';

function HeroSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [province, setProvince] = useState('');
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState('');
  const [popularKeywords, setPopularKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load popular keywords
  useState(() => {
    const loadKeywords = async () => {
      try {
        const keywords = await getPopularKeywords();
        setPopularKeywords(keywords.slice(0, 6));
      } catch (error) {
        console.error('Failed to load keywords:', error);
      }
    };
    loadKeywords();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create search params
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (province) params.set('province', province);
    if (date) params.set('date', date.toISOString().split('T')[0]);
    if (category) params.set('category', category);

    // Redirect to search page
    setSearchParams(params);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = `/search?${params.toString()}`;
    }, 500);
  };

  const handleKeywordClick = (keyword) => {
    setQuery(keyword);
  };

  const provinces = [
    { id: '', name: 'All Provinces' },
    { id: 'hanoi', name: 'Hanoi' },
    { id: 'ho-chi-minh-city', name: 'Ho Chi Minh City' },
    { id: 'da-nang', name: 'Da Nang' },
    { id: 'hoi-an', name: 'Hoi An' },
    { id: 'hue', name: 'Hue' },
    { id: 'ha-long-bay', name: 'Ha Long Bay' },
    { id: 'sapa', name: 'Sapa' },
    { id: 'phu-quoc', name: 'Phu Quoc' },
  ];

  const categories = [
    { id: '', name: 'All Categories' },
    { id: 'tour', name: 'Tours' },
    { id: 'restaurant', name: 'Restaurants' },
    { id: 'lodging', name: 'Lodging' },
    { id: 'transport', name: 'Transportation' },
  ];

  return (
    <section className="relative overflow-hidden pb-16 pt-24 md:pt-32 lg:pt-40">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-1/3 top-1/4 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[100px]"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute right-1/4 top-1/3 h-[250px] w-[250px] rounded-full bg-accent/20 blur-[100px]"
          animate={{
            x: [0, -20, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover the Magic of <span className="text-primary">Vietnam</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-muted-foreground"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore authentic experiences, from stunning landscapes to vibrant culture and cuisine.
          </motion.p>
        </div>

        <motion.div
          className="mx-auto mt-10 max-w-4xl"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <form onSubmit={handleSearch} className="glass rounded-2xl p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-12">
              <div className="relative md:col-span-5">
                <Input
                  type="text"
                  placeholder="Search tours, destinations..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 h-12"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              </div>
              
              <div className="md:col-span-3">
                <Select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="h-12"
                >
                  {provinces.map((province) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  placeholderText="Date"
                  dateFormat="MMM d, yyyy"
                  className="h-12"
                />
              </div>
              
              <div className="md:col-span-2">
                <Button 
                  type="submit" 
                  className="w-full h-12"
                  isLoading={isLoading}
                >
                  Search
                </Button>
              </div>
            </div>
            
            <div className="mt-4 md:mt-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <span className="text-sm font-medium whitespace-nowrap">Popular:</span>
                {popularKeywords.map((keyword, index) => (
                  <Chip
                    key={index}
                    variant={query === keyword ? 'active' : 'default'}
                    size="sm"
                    onClick={() => handleKeywordClick(keyword)}
                    className="whitespace-nowrap"
                  >
                    {keyword}
                  </Chip>
                ))}
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export { HeroSearch };