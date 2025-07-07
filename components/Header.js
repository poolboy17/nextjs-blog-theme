import Link from 'next/link';

export default function Header({ name }) {
  return (
    <header className="pt-8 pb-6">
      <nav className="flex justify-center gap-3 md:gap-6 flex-wrap px-4">
        <Link 
          href="/"
          className="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Home
        </Link>
        <Link 
          href="/categories/ai-scams"
          className="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          AI Scams
        </Link>
        <Link 
          href="/categories/phishing"
          className="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Phishing
        </Link>
        <Link 
          href="/categories/scam-alerts-&-news"
          className="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Scam Alerts
        </Link>
        <Link 
          href="/categories/privacy-and-security"
          className="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Privacy & Security
        </Link>
        <Link 
          href="/categories/security-tools"
          className="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Security Tools
        </Link>
        <Link 
          href="/categories"
          className="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          All Categories
        </Link>
      </nav>
    </header>
  );
}