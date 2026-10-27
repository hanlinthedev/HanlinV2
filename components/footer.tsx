import { getSettings } from '@/lib/content';
export async function Footer() { 'use cache'; const s=await getSettings();return <footer className="footer"><span>© {new Date().getFullYear()} {s.fullName} · An ongoing work.</span><span>Thoughtfully built. Still becoming.</span><a href="#top">Back to the surface ↑</a></footer>; }
