export { default } from '@/scenes/blog';
import { pageMetadata } from '@/lib/seo';
export async function generateMetadata(){return pageMetadata('/blog','Field notes','Technical writing by Han Lin Aung on software engineering, web development, and the systems behind them.');}
