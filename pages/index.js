
import Link from 'next/link';
import Image from 'next/image';
import { getPostsForListing, getCategories } from '../utils/mdx-utils';
import { getPostImageUrl } from '../utils/image-utils';
import { optimizeArticleCards, calculateReadTime } from '../utils/performance-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

function ArticleCard({ post, priority = false }) {
  const readTime = calculateReadTime(post.data.description || '');
  
  return (
    <article
      className="group transition-all duration-300 border border-gray-800/10 bg-white/10 rounded-lg backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1"
      data-sb-object-id={`posts/${post.filePath}`}
    >
      <Link
        as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
        href={`/posts/[slug]`}
        className="block focus:outline-none focus:ring-4 focus:ring-blue-500/50 h-full overflow-hidden rounded-lg"
      >
        <div className="relative w-full h-48 mb-4 overflow-hidden">
          <Image
            src={post.data.image || getPostImageUrl(post)}
            alt={post.data.title}
            fill
            className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="px-6 py-6 space-y-3">
          <header className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              {post.data.date && (
                <time
                  className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide"
                  dateTime={post.data.date}
                  data-sb-field-path="date"
                >
                  {new Date(post.data.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
              )}
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                {readTime}
              </span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" data-sb-field-path="title">
              {post.data.title}
            </h2>
          </header>

          {post.data.description && (
            <p
              className="text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3"
              data-sb-field-path="description"
            >
              {post.data.description}
            </p>
          )}

          <footer className="space-y-3">
            {post.data.categories && (
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(post.data.categories) ? post.data.categories : [post.data.categories]).slice(0, 2).map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            {post.data.tags && post.data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.data.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
                {post.data.tags.length > 3 && (
                  <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400 italic">
                    +{post.data.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                Read more
              </span>
              <ArrowIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </footer>
        </div>
      </Link>
    </article>
  );
}

export default function Index({ posts, categories, globalData }) {
  const optimizedPosts = optimizeArticleCards(posts);
  
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      
      <main className="w-full">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4 leading-tight">
            {globalData.blogTitle}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Your trusted source for cybersecurity insights and scam prevention
          </p>
        </header>

        <section className="mb-8">
          <h2 className="sr-only">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {optimizedPosts.map((post, index) => (
              <ArticleCard 
                key={post.filePath} 
                post={post} 
                priority={index < 6} // Prioritize first 6 images
              />
            ))}
          </div>
        </section>

        {optimizedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No articles found. Check back soon for new content!
            </p>
          </div>
        )}
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
  const posts = getPostsForListing(12); // Limit to 12 posts for performance
  const categories = getCategories();
  const globalData = getGlobalData();

  return { 
    props: { posts, categories, globalData },
    revalidate: 3600 // Revalidate every hour
  };
}
