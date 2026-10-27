import { Studio } from '@/components/studio';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
export default function SiteLayout({children}:{children:React.ReactNode}) {return <div className="shell"><Nav/><main id="main">{children}</main><Footer/><Studio/></div>;}
