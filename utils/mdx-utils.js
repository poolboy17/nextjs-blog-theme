import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from '@mapbox/rehype-prism';
import remarkGfm from 'remark-gfm';
import rehypeUnwrapImages from 'rehype-unwrap-images';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts');

// getPostFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const getPostFilePaths = () => {
  return (
    fs
      .readdirSync(POSTS_PATH)
      // Only include md(x) files
      .filter((path) => /\.mdx?$/.test(path))
  );
};

export const sortPostsByDate = (posts) => {
  return posts.sort((a, b) => {
    const aDate = new Date(a.data.date);
    const bDate = new Date(b.data.date);
    return bDate - aDate;
  }).map(post => ({
    ...post,
    data: {
      ...post.data,
      date: post.data.date instanceof Date ? post.data.date.toISOString() : post.data.date
    }
  }));
};

export const getPosts = () => {
  let posts = getPostFilePaths()
    .filter((filePath) => {
      // Only include files that actually exist
      return fs.existsSync(path.join(POSTS_PATH, filePath));
    })
    .map((filePath) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
      const { content, data } = matter(source);

      return {
        content,
        data,
        filePath,
      };
    });

  posts = sortPostsByDate(posts);

  return posts;
};

export const getCategories = () => {
  const posts = getPosts();
  const categories = new Set();
  
  posts.forEach(post => {
    if (post.data.categories) {
      if (Array.isArray(post.data.categories)) {
        post.data.categories.forEach(category => categories.add(category));
      } else {
        categories.add(post.data.categories);
      }
    }
  });
  
  return Array.from(categories).sort();
};

export const getPostsByCategory = (category) => {
  const posts = getPosts();
  return posts.filter(post => {
    if (!post.data.categories) return false;
    if (Array.isArray(post.data.categories)) {
      return post.data.categories.includes(category);
    }
    return post.data.categories === category;
  });
};

export const getPostBySlug = async (slug) => {
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  
  // Check if file exists
  if (!fs.existsSync(postFilePath)) {
    throw new Error(`Post file not found: ${postFilePath}`);
  }
  
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism, rehypeUnwrapImages],
    },
    scope: data,
  });

  return { mdxSource, data, postFilePath };
};

export const getNextPostBySlug = (slug) => {
  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex - 1];
  // no prev post found
  if (!post) return null;

  const nextPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: nextPostSlug,
  };
};

export const getPreviousPostBySlug = (slug) => {
  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex + 1];
  // no prev post found
  if (!post) return null;

  const previousPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: previousPostSlug,
  };
};
