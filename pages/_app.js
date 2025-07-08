import '../styles/globals.css';
import { reportWebVitals } from '../utils/performance-utils';

function MyApp({ Component, pageProps }) {
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