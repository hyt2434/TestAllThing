import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { Carousel } from '../ui/carousel';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { getHighlights } from '../../lib/api';

function HighlightsCarousel() {
  const [highlights, setHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        setIsLoading(true);
        const data = await getHighlights();
        setHighlights(data);
      } catch (err) {
        setError('Failed to load highlights. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHighlights();
  }, []);
  
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Highlights</h2>
            <p className="mt-2 text-muted-foreground">Discover our most popular experiences across Vietnam</p>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardContent className="pt-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-8 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Carousel showArrows showDots className="py-4">
            {highlights.map((highlight) => (
              <HighlightCard key={highlight.id} highlight={highlight} />
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
}

function HighlightCard({ highlight }) {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="px-3 py-4"
    >
      <Card className="overflow-hidden h-full cursor-pointer">
        <div className="relative h-48 w-full">
          {!imageError ? (
            <img
              src={highlight.imageUrl}
              alt={highlight.title}
              className="h-full w-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="h-full w-full bg-muted flex items-center justify-center">
              <p className="text-sm text-muted-foreground">{highlight.title}</p>
            </div>
          )}
          
          {highlight.isNew && (
            <div className="absolute top-4 right-4">
              <Badge variant="new">New</Badge>
            </div>
          )}
        </div>
        
        <CardContent className="pt-6">
          <h3 className="font-semibold text-lg line-clamp-1">{highlight.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{highlight.description}</p>
          
          <div className="flex items-center gap-1 mt-2">
            <StarIcon className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">{highlight.rating}</span>
            <span className="text-sm text-muted-foreground">({highlight.reviewCount} reviews)</span>
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-4">
          <div className="flex justify-between items-center w-full">
            <div>
              <span className="text-sm text-muted-foreground">From</span>
              <span className="font-semibold text-lg ml-1">
                {highlight.price} {highlight.currency}
              </span>
            </div>
            
            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
              {highlight.province.replace(/-/g, ' ')}
            </span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export { HighlightsCarousel };