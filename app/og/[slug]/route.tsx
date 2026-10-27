import { getPost, getSettings } from '@/lib/content';
import { ogCard } from '@/components/og-card';
export async function GET(_request:Request,{params}:{params:Promise<{slug:string}>}){const [post,s]=await Promise.all([getPost((await params).slug),getSettings()]);if(!post)return new Response('Not found',{status:404});return ogCard(s.fullName,post.title,'Field notes on software, systems, and the questions along the way.');}
