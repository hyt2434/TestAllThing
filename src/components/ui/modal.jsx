import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Button } from './button';

function Modal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children, 
  className,
  ...props 
}) {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef(null);
  
  // Handle mounting on client side
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore body scroll
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  // Close when clicking overlay
  const handleOverlayClick = (e) => {
    if (overlayRef.current === e.target) onClose();
  };
  
  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } },
  };
  
  if (!mounted) return null;
  
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          onClick={handleOverlayClick}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            aria-describedby={description ? "modal-description" : undefined}
            className={cn(
              "relative max-h-[90vh] overflow-auto w-full max-w-md rounded-2xl bg-card p-6 shadow-lg",
              className
            )}
            variants={modalVariants}
            {...props}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-foreground/60 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {title && (
              <h2 id="modal-title" className="text-xl font-semibold mb-2">
                {title}
              </h2>
            )}
            
            {description && (
              <p id="modal-description" className="text-muted-foreground mb-4">
                {description}
              </p>
            )}
            
            <div className="mt-2">{children}</div>
            
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export { Modal };