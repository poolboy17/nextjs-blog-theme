
import { useState, useEffect, useRef } from 'react';

const LazyLoader = ({ 
  children, 
  threshold = 0.1, 
  rootMargin = '50px',
  fallback = null,
  onVisible = () => {},
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible();
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, onVisible]);

  useEffect(() => {
    if (isVisible) {
      // Simulate loading delay for smooth UX
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? (
        <div className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {children}
        </div>
      ) : (
        fallback || <div className="h-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
      )}
    </div>
  );
};

export default LazyLoader;
