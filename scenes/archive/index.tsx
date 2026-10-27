import { notFound } from 'next/navigation';
import { getNavigation } from '@/lib/content';
export default async function Archive(){const {archivePublished}=await getNavigation();if(!archivePublished)notFound();return <header className="page-header"><h1>The archive.</h1></header>;}
