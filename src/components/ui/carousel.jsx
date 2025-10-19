import { useState, useRef, forwardRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Carousel = forwardRef(({ 
  className,
  children,
  showArrows = true,
  showDots = true,
  ...props 
}, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [constraintWidth, setConstraintWidth] = useState(0);
  const carouselRef = useRef(null);
  const childrenCount = Array.isArray(children) ? children.length : 1;

  useEffect(() => {
    if (carouselRef.current) {
      const { width } = carouselRef.current.getBoundingClientRect();
      setConstraintWidth(width * childrenCount);
    }
  }, [childrenCount]);

  const handleNext = () => {
    setCurrentIndex(prev => 
      prev === childrenCount - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex(prev => 
      prev === 0 ? childrenCount - 1 : prev - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollToIndex = () => {
      const childWidth = container.offsetWidth;
      container.scrollTo({
        left: currentIndex * childWidth,
        behavior: 'smooth'
      });
    };

    scrollToIndex();

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, childrenCount]);

  return (
    <div className={cn("relative w-full", className)} ref={ref} {...props}>
      <div 
        className="overflow-hidden"
        ref={carouselRef} 
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Image carousel"
      >
        <motion.div 
          className="flex snap-x snap-mandatory w-full h-full"
          drag="x"
          dragConstraints={{ left: -constraintWidth + 100, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = offset.x < -100 || (offset.x < 0 && velocity.x < -300);
            if (swipe) handleNext();
            else if (offset.x > 100 || (offset.x > 0 && velocity.x > 300)) handlePrev();
          }}
        >
          {Array.isArray(children) ? children.map((child, index) => (
            <div 
              key={index} 
              className={cn(
                "min-w-full flex-shrink-0 snap-center",
                index === currentIndex ? "opacity-100" : "opacity-70"
              )}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${childrenCount}`}
            >
              {child}
            </div>
          )) : (
            <div className="min-w-full flex-shrink-0 snap-center">
              {children}
            </div>
          )}
        </motion.div>
      </div>

      {showArrows && childrenCount > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 flex items-center justify-center shadow-md hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 flex items-center justify-center shadow-md hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </>
      )}

      {showDots && childrenCount > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {Array(childrenCount).fill(0).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary",
                index === currentIndex ? "bg-primary" : "bg-muted"
              )}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );
});

Carousel.displayName = "Carousel";

export { Carousel };