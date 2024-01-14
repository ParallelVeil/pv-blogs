import {getPostsMeta} from './posts'
import type { MetadataRoute } from 'next'
const generateSitemap= async () => {
  const topPageFields:MetadataRoute.Sitemap = [
    {
      url: '',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: '/about',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: '/posts',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ];

  topPageFields.forEach((post) => {
    const url = new URL(
      post.url,
      `https://blogs.parallelveil.com/`
    );
    post.url = url.toString().replace(/\/$/, '');
  });

  const posts = await getPostsMeta();
  if (!posts) return topPageFields;

  const postSitemaps:MetadataRoute.Sitemap = posts.map((post) => {
    const url = new URL(
      `/posts/${post.id}`,
      `https://blogs.parallelveil.com/`
    );
    return {
      url:url.toString().replace(/\/$/, ''),
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    };
  });



  const tags = new Set(posts.map(post => post.tags).flat())
  const tagsSitemaps:MetadataRoute.Sitemap = Array.from(tags).map(tag => {
    const url = new URL(
      `/tags/${tag}`,
      `https://blogs.parallelveil.com/`
    );

   return {
      url:url.toString().replace(/\/$/, ''),
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.7,
    }
  })

  return [...topPageFields, ...postSitemaps, ...tagsSitemaps];
};

export default generateSitemap;