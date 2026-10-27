export { default } from '@/scenes/home';
import { getSettings } from '@/lib/content';
export async function generateMetadata(){const s=await getSettings();return {alternates:{canonical:s.url}};}
