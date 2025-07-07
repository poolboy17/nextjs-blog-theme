import Link from 'next/link';

export default function Header({ name }) {
  return (
    <header className="pt-8 pb-6">
      <nav className="flex justify-center gap-2 md:gap-4 lg:gap-6 px-4 overflow-x-auto">
        <Link 
          href="/categories/ai-scams"
          className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap"
        >
          AI Scams
        </Link>
        <Link 
          href="/categories/phishing"
          className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap"
        >
          Phishing
        </Link>
        <Link 
          href="/categories/scam-alerts-&-news"
          className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap"
        >
          Scam Alerts
        </Link>
        <Link 
          href="/categories/privacy-and-security"
          className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap"
        >
          Privacy & Security
        </Link>
        <Link 
          href="/categories/security-tools"
          className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap"
        >
          Security Tools
        </Link>
      </nav>
    </header>
  );
}