import type { Metadata } from 'next';
import { getSettings } from './content';
export async function pageMetadata(path:string,title:string,description:string,article?:{date:string}):Promise<Metadata>{
 const s=await getSettings();const url=new URL(path,s.url).href;const image=article?`/og/${path.split('/').at(-1)}`:'/opengraph-image';
 return {title,description,alternates:{canonical:url},openGraph:{type:article?'article':'website',url,siteName:s.fullName,title:`${title} | ${s.fullName}`,description,locale:'en_US',images:[{url:image,width:1200,height:630,alt:`${s.fullName} | ${title}`}],...(article?{publishedTime:article.date,authors:[s.url]}:{})},twitter:{card:'summary_large_image',title:`${title} | ${s.fullName}`,description,images:[image]}};
}
export function jsonLd(value:unknown){return JSON.stringify(value).replaceAll('<','\\u003c');}
