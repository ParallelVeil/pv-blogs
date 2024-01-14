import generateSitemap from '@/lib/generateSitemap'
import type { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return await generateSitemap();
}