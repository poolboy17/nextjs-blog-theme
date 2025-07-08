import Link from 'next/link';
import Image from 'next/image';
import { getPostsForListing, getCategories } from '../utils/mdx-utils';
import { getPostImageUrl } from '../utils/image-utils';

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
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4 leading-tight">
            {globalData.blogTitle}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Your trusted source for cybersecurity insights and scam prevention
          </p>
        </div>



        <ul className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <li
              key={post.filePath}
              className="transition border border-gray-800/10 bg-white/10 rounded-lg backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10"
              data-sb-object-id={`posts/${post.filePath}`}
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
                className="block focus:outline-hidden focus:ring-4 focus:ring-primary/50 h-full overflow-hidden"
              >
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={post.data.image || getPostImageUrl(post)}
                    alt={post.data.title}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="px-6 py-6">
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
                </div>
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

export async function getStaticProps() {
  const posts = getPostsForListing(12); // Only get 12 posts with minimal data
  const categories = getCategories();
  const globalData = getGlobalData();

  return { 
    props: { posts, categories, globalData },
    // Add revalidation for better performance
    revalidate: 3600 // Revalidate every hour
  };
}