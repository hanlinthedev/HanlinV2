import { notFound } from 'next/navigation';
import Link from 'next/link';
import { pageMetadata, jsonLd } from '@/lib/seo';
import { getPost, getPosts, getSettings } from '@/lib/content';
export async function generateStaticParams(){return (await getPosts()).map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const post=await getPost((await params).slug);if(!post)notFound();return pageMetadata(`/blog/${post.slug}`,post.title,post.excerpt,{date:post.date});}

export default async function PostPage({params}:{params:Promise<{slug:string}>}){const post=await getPost((await params).slug);if(!post)notFound();const s=await getSettings();return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({'@context':'https://schema.org','@type':'BlogPosting',headline:post.title,description:post.excerpt,datePublished:post.date,mainEntityOfPage:`${s.url}/blog/${post.slug}`,author:{'@type':'Person',name:s.fullName,url:s.url},image:`${s.url}/og/${post.slug}`,inLanguage:'en'})}}/><header className="page-header"><Link className="eyebrow" href="/blog">← ALL FIELD NOTES</Link><h1 style={{fontSize:'clamp(36px,5vw,58px)',marginTop:25}}>{post.title}</h1><div className="tiny muted">{new Intl.DateTimeFormat('en',{dateStyle:'medium',timeZone:'UTC'}).format(new Date(post.date))} · {post.readTime} MIN READ · {s.fullName}</div></header><article className="article" dangerouslySetInnerHTML={{__html:post.html}}/></>;}
