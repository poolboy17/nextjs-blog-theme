
import Link from 'next/link';
import { getGlobalData } from '../utils/global-data';
import { getPosts, getCategories } from '../utils/mdx-utils';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import SEO from '../components/SEO';

export default function Sitemap({ globalData, posts, categories }) {
  return (
    <Layout>
      <SEO title={`Sitemap - ${globalData.name}`} description="Complete sitemap of all pages and posts on Scambytes360" />
      <Header name={globalData.name} />
      <main className="w-full max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Sitemap</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Pages */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Main Pages</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link 
                    href={`/categories/${category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Recent Posts</h2>
            <ul className="space-y-2">
              {posts.slice(0, 10).map((post) => (
                <li key={post.filePath}>
                  <Link 
                    href={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    {post.data.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Showing 10 of {posts.length} total posts
              </p>
            </div>
          </div>
        </div>

        {/* All Posts Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-orange-600 dark:text-orange-400">All Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post.filePath} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Link 
                  href={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                  className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <h3 className="font-medium mb-2 text-sm">{post.data.title}</h3>
                  {post.data.date && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {post.data.date}
                    </p>
                  )}
                  {post.data.categories && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {Array.isArray(post.data.categories) ? post.data.categories.join(', ') : post.data.categories}
                    </p>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const categories = getCategories();
  const globalData = getGlobalData();

  return { 
    props: { 
      posts, 
      categories, 
      globalData 
    } 
  };
}
