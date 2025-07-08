import Link from 'next/link';
import { getCategories, getPostsByCategory } from '../utils/mdx-utils';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Categories({ categories, categoryCounts, globalData }) {
  return (
    <Layout>
      <SEO title={`Categories - ${globalData.name}`} description="Browse posts by category" />
      <Header name={globalData.name} />
      <main className="w-full">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 dark:from-green-400 dark:via-teal-400 dark:to-blue-400 bg-clip-text text-transparent mb-4 leading-tight">
            Categories
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`}
              className="block p-6 transition border border-gray-800/10 bg-white/10 rounded-lg backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10"
            >
              <h2 className="text-xl font-bold mb-2">{category}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {categoryCounts[category]} {categoryCounts[category] === 1 ? 'post' : 'posts'}
              </p>
            </Link>
          ))}
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

export async function getStaticProps() {
  const categories = getCategories();
  const globalData = getGlobalData();
  const allPosts = await getPosts();

  const categoryCounts = {};
  categories.forEach(category => {
    categoryCounts[category] = allPosts.filter(post => {
      if (!post.data.categories) return false;
      if (Array.isArray(post.data.categories)) {
        return post.data.categories.includes(category);
      }
      return post.data.categories === category;
    }).length;
  });

  return { 
    props: { 
      categories, 
      categoryCounts,
      globalData 
    } 
  };
}