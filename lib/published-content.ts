import 'server-only';
import { cacheTag,cacheLife } from 'next/cache';
import type { PortfolioContent } from './content-types';
export async function getPublishedContent():Promise<PortfolioContent|null>{
 'use cache';cacheTag('content');cacheLife({stale:30,revalidate:60,expire:300});
 const endpoint=process.env.PORTFOLIO_CONTENT_API_URL;if(!endpoint)return null;
 const response=await fetch(endpoint,{signal:AbortSignal.timeout(10000),cache:'no-store'});
 if(!response.ok)throw Error('The published content service is unavailable.');
 const content=await response.json();if(!content?.settings||!Array.isArray(content.posts)||!content.navigation)throw Error('The content service returned an invalid document.');return content as PortfolioContent;
}
