
import Link from 'next/link';
import { getCategories, getPostsByCategory } from '../../utils/mdx-utils';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import ArrowIcon from '../../components/ArrowIcon';
import { getGlobalData } from '../../utils/global-data';
import SEO from '../../components/SEO';

export default function CategoryPage({ posts, category, globalData }) {
  const displayCategory = category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <Layout>
      <SEO 
        title={`${displayCategory} - ${globalData.name}`} 
        description={`Posts in the ${displayCategory} category`} 
      />
      <Header name={globalData.name} />
      <main className="w-full">
        <div className="mb-8">
          <Link 
            href="/categories"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← All Categories
          </Link>
        </div>
        <h1 className="mb-12 text-3xl text-center lg:text-5xl">
          {displayCategory}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
        </p>
        <ul className="w-full">
          {posts.map((post) => (
            <li
              key={post.filePath}
              className="transition border border-b-0 bg-white/10 border-gray-800/10 md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10 last:border-b"
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
                className="block px-6 py-6 lg:py-10 lg:px-16 focus:outline-hidden focus:ring-4 focus:ring-primary/50"
              >
                {post.data.date && (
                  <p className="mb-3 font-bold uppercase opacity-60">
                    {post.data.date}
                  </p>
                )}
                <h2 className="text-2xl md:text-3xl">
                  {post.data.title}
                </h2>
                {post.data.description && (
                  <p className="mt-3 text-lg opacity-60">
                    {post.data.description}
                  </p>
                )}
                {post.data.tags && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                      >
                        {tag}
                      </span>
                    ))}
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

export async function getStaticProps({ params }) {
  const category = params.category;
  const displayCategory = category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  const posts = getPostsByCategory(displayCategory);
  const globalData = getGlobalData();

  return {
    props: {
      posts,
      category,
      globalData,
    },
  };
}

export async function getStaticPaths() {
  const categories = getCategories();
  const paths = categories.map((category) => ({
    params: {
      category: category.toLowerCase().replace(/\s+/g, '-'),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
