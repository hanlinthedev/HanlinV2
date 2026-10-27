import { studioBootstrap } from '@/lib/studio-bootstrap';
import { StudioProvider } from '@/components/studio-provider';
import type { Metadata } from 'next';
import { getSettings } from '@/lib/content';
import '@/styles/globals.css';
export async function generateMetadata(): Promise<Metadata> {
 const s=await getSettings();const title=`${s.fullName} | ${s.title}`;const description=`${s.fullName} (${s.name}), ${s.title} in ${s.location}. Explore software projects, platform engineering, experience, and technical writing.`;
 return {metadataBase:new URL(s.url),title:{default:title,template:`%s | ${s.fullName}`},description,applicationName:s.fullName,authors:[{name:s.fullName,url:s.url}],creator:s.fullName,openGraph:{title,description,type:'website',url:s.url,siteName:s.fullName,locale:'en_US',images:[{url:'/opengraph-image',width:1200,height:630,alt:title}]},twitter:{card:'summary_large_image',title,description,images:['/opengraph-image']},robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}},verification:{google:process.env.GOOGLE_SITE_VERIFICATION}};
}

export default async function RootLayout({children}:{children:React.ReactNode}) {const settings=await getSettings();return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning><body id="top"><script dangerouslySetInnerHTML={{__html:studioBootstrap(settings.timezone)}}/><a href="#main" className="skip">Skip to content</a>{children}<StudioProvider timezone={settings.timezone}/></body></html>;}
