import Link from 'next/link';
import { getPosts, getCategories } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, categories, globalData }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
        <h1 className="mb-12 text-3xl text-center lg:text-5xl">
          {globalData.blogTitle}
        </h1>
        
        {/* Categories Navigation */}
        <div className="mb-8 text-center">
          <Link 
            href="/categories"
            className="inline-block px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Categories ({categories.length})
          </Link>
        </div>
        
        <ul className="w-full">
          {posts.map((post) => (
            <li
              key={post.filePath}
              className="transition border border-b-0 bg-white/10 border-gray-800/10 md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10 last:border-b"
              data-sb-object-id={`posts/${post.filePath}`}
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
                className="block px-6 py-6 lg:py-10 lg:px-16 focus:outline-hidden focus:ring-4 focus:ring-primary/50"
              >
                {post.data.date && (
                  <p
                    className="mb-3 font-bold uppercase opacity-60"
                    data-sb-field-path="date"
                  >
                    {post.data.date}
                  </p>
                )}
                <h2 className="text-2xl md:text-3xl" data-sb-field-path="title">
                  {post.data.title}
                </h2>
                {post.data.description && (
                  <p
                    className="mt-3 text-lg opacity-60"
                    data-sb-field-path="description"
                  >
                    {post.data.description}
                  </p>
                )}
                {post.data.categories && (
                  <div className="mt-3">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      Category: {Array.isArray(post.data.categories) ? post.data.categories.join(', ') : post.data.categories}
                    </span>
                  </div>
                )}
                {post.data.tags && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.data.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.data.tags.length > 5 && (
                      <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                        +{post.data.tags.length - 5} more
                      </span>
                    )}
                  </div>
                )}
                <ArrowIcon className="mt-4" />
              </Link>
            </li>
          ))}
        </ul>
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

  return { props: { posts, categories, globalData } };
}
