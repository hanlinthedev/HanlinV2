import { getSettings } from '@/lib/content';
import { ogCard } from '@/components/og-card';
export const alt='Han Lin Aung | Software Engineer | hanlinaung.dev';
export const size={width:1200,height:630};
export const contentType='image/png';
export default async function Image(){const s=await getSettings();return ogCard(s.fullName,s.fullName,`${s.title} · ${s.location}`);}
