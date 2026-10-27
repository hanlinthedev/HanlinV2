import { getSettings } from '@/lib/content';
export default async function robots(){const s=await getSettings();return {rules:{userAgent:'*',allow:'/'},sitemap:`${s.url}/sitemap.xml`};}
