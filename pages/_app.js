import '../styles/globals.css';
import { reportWebVitals } from '../utils/performance-utils';
import React, { useEffect } from 'react'; // Import React and useEffect

function MyApp({ Component, pageProps }) {
  // Log errors in development
  useEffect(() => {
    const handleError = (error) => {
      console.error('App Error:', error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <>
      <span className="theme-bejamas" />
      <Component {...pageProps} />
    </>
  );
}

// Export reportWebVitals for performance monitoring
export { reportWebVitals };

export default MyApp;