import { getPosts, getSettings } from '@/lib/content';
export default async function sitemap(){const [s,posts]=await Promise.all([getSettings(),getPosts()]);return [{url:s.url},{url:`${s.url}/blog`},{url:`${s.url}/world`},...posts.map(p=>({url:`${s.url}/blog/${p.slug}`,lastModified:p.date}))];}
