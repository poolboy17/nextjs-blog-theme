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



        <section 
          className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Latest cybersecurity articles"
        >
          {posts.map((post, index) => (
            <article
              key={post.filePath}
              className="group transition-all duration-300 border border-gray-200/20 bg-white/5 rounded-xl backdrop-blur-sm dark:bg-black/20 hover:bg-white/10 dark:hover:bg-black/40 dark:border-white/10 hover:shadow-lg hover:scale-[1.02] focus-within:ring-2 focus-within:ring-blue-500/50"
              data-sb-object-id={`posts/${post.filePath}`}
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
                className="block focus:outline-none h-full overflow-hidden rounded-xl"
                aria-label={`Read article: ${post.data.title}`}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={post.data.image || getPostImageUrl(post)}
                    alt={`${post.data.title} - Cybersecurity article image`}
                    fill
                    className="object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 3} // Prioritize first 3 images
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  {/* Gradient overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Date and category header */}
                  <header className="flex items-center justify-between text-sm">
                    {post.data.date && (
                      <time 
                        className="font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide"
                        dateTime={post.data.date}
                        data-sb-field-path="date"
                      >
                        {new Date(post.data.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                    )}
                    {post.data.categories && (
                      <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium">
                        {Array.isArray(post.data.categories) ? post.data.categories[0] : post.data.categories}
                      </span>
                    )}
                  </header>

                  {/* Title */}
                  <h2 
                    className="text-xl md:text-2xl font-bold leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" 
                    data-sb-field-path="title"
                  >
                    {post.data.title}
                  </h2>

                  {/* Description */}
                  {post.data.description && (
                    <p
                      className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3"
                      data-sb-field-path="description"
                    >
                      {post.data.description}
                    </p>
                  )}

                  {/* Tags (only show top 3) */}
                  {post.data.tags && (
                    <div className="flex flex-wrap gap-2">
                      {post.data.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.data.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-500">
                          +{post.data.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Read more indicator */}
                  <footer className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                      Read article
                    </span>
                    <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                  </footer>
                </div>
              </Link>
            </article>
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