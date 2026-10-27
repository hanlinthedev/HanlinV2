import { MobileNav } from './mobile-nav';
import Link from 'next/link';
import { getNavigation, getSettings } from '@/lib/content';
export async function Nav() {
 const [{sections, archivePublished}, settings] = await Promise.all([getNavigation(), getSettings()]);
 const links = <>{sections.map(section=><Link key={section.id} href={`/#${section.id}`}>{section.label}</Link>)}<Link href="/blog">Blog</Link>{archivePublished&&<Link href="/archive">Archive</Link>}<Link href="/world" className="world-link">Enter world <span aria-hidden="true">↗</span></Link></>;
 return <header className="nav"><Link href="/" className="brand" aria-label={`${settings.name}, home`}>{settings.name.toLowerCase()}<span>.</span></Link><nav className="navlinks" aria-label="Main navigation">{links}</nav><MobileNav>{links}</MobileNav></header>;
}
