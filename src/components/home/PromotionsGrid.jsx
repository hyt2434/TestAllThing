import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Chip } from '../ui/chip';
import { Modal } from '../ui/modal';
import { Skeleton } from '../ui/skeleton';
import { getActivePromotions } from '../../lib/api';

function PromotionsGrid() {
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setIsLoading(true);
        const filterParam = filter !== 'all' ? filter : null;
        const data = await getActivePromotions(filterParam);
        setPromotions(data);
      } catch (err) {
        setError('Failed to load promotions. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPromotions();
  }, [filter]);
  
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  
  const handleApply = (promo) => {
    setSelectedPromo(promo);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Active Promotions</h2>
            <p className="mt-2 text-muted-foreground">Limited-time offers for your next adventure</p>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Chip
              variant={filter === 'all' ? 'active' : 'default'}
              onClick={() => handleFilterChange('all')}
            >
              All
            </Chip>
            <Chip
              variant={filter === 'trending' ? 'active' : 'default'}
              onClick={() => handleFilterChange('trending')}
            >
              Trending
            </Chip>
            <Chip
              variant={filter === 'endingSoon' ? 'active' : 'default'}
              onClick={() => handleFilterChange('endingSoon')}
            >
              Ending Soon
            </Chip>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <CardContent className="pt-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {promotions.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p>No promotions found for the selected filter.</p>
              </div>
            ) : (
              promotions.map((promo) => (
                <PromotionCard
                  key={promo.id}
                  promo={promo}
                  onApply={handleApply}
                />
              ))
            )}
          </div>
        )}
      </div>
      
      {/* Promotion details modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedPromo?.title}
        description="Use this code to apply the promotion during checkout."
      >
        {selectedPromo && (
          <div className="space-y-4">
            <p>{selectedPromo.description}</p>
            
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">Conditions:</p>
              <p className="text-sm">{selectedPromo.conditions}</p>
            </div>
            
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <p className="text-sm mb-1">Promotion Code:</p>
              <p className="text-xl font-mono font-bold tracking-wider text-primary">
                {selectedPromo.code}
              </p>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Valid until: {new Date(selectedPromo.validUntil).toLocaleDateString()}
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
}

function PromotionCard({ promo, onApply }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col justify-between overflow-hidden">
        <div className="relative h-48 w-full">
          <img
            src={promo.imageUrl}
            alt={promo.title}
            className="w-full h-full object-cover"
          />
          {promo.endingSoon && (
            <span className="absolute top-2 right-2 text-xs bg-red-500/90 text-white px-2 py-1 rounded-full whitespace-nowrap">
              Ends Soon
            </span>
          )}
        </div>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{promo.title}</h3>
          </div>
          
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {promo.description}
          </p>
          
          <p className="text-xs text-muted-foreground mt-4">
            Valid until: {new Date(promo.validUntil).toLocaleDateString()}
          </p>
        </CardContent>
        
        <CardFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={() => onApply(promo)}
            className="w-full"
          >
            Apply
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export { PromotionsGrid };