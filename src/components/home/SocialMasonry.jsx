import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { getLatestPosts } from '../../lib/api';

function SocialMasonry() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await getLatestPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to load social posts. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Social Snapshot</h2>
          <p className="mt-2 text-muted-foreground">
            See real experiences from fellow travelers across Vietnam
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className={`${index % 3 === 0 ? 'row-span-2' : ''}`}>
                <Skeleton className={`w-full ${index % 3 === 0 ? 'h-[400px]' : 'h-[200px]'}`} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post, index) => (
              <SocialCard 
                key={post.id} 
                post={post} 
                isLarge={index % 3 === 0}
              />
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg">
            View More
          </Button>
        </div>
      </div>
    </section>
  );
}

function SocialCard({ post, isLarge }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div 
      className={`relative overflow-hidden rounded-xl ${isLarge ? 'row-span-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {!imageError ? (
          <img 
            src={post.imageUrl} 
            alt={post.caption.substring(0, 30)} 
            className={`w-full object-cover ${isLarge ? 'h-[400px]' : 'h-[200px]'}`}
            onError={handleImageError}
          />
        ) : (
          <div className={`w-full flex items-center justify-center bg-muted ${isLarge ? 'h-[400px]' : 'h-[200px]'}`}>
            <p className="text-sm text-muted-foreground p-4 text-center">{post.location}</p>
          </div>
        )}
        
        {/* Hashtags overlay at the bottom */}
        <div className="absolute bottom-0 left-0 p-3 flex flex-wrap gap-1">
          {post.hashtags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-background/70 backdrop-blur-sm text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
        
        {/* Hover overlay with details */}
        <motion.div 
          className="absolute inset-0 bg-foreground/70 backdrop-blur-sm p-4 flex flex-col justify-center items-center text-center text-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <h4 className="font-semibold">{post.service.name}</h4>
          <p className="text-sm mt-1">{post.location}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3 text-background border-background hover:bg-background hover:text-foreground"
          >
            View Details
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export { SocialMasonry };