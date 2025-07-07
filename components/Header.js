import Link from 'next/link';

export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12">
      <p className="mb-8 text-2xl text-center dark:text-white">
        <Link href="/">
          {name}
        </Link>
      </p>
      <nav className="flex justify-center gap-6">
        <Link 
          href="/"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Home
        </Link>
        <Link 
          href="/categories"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Categories
        </Link>
      </nav>
    </header>
  );
}