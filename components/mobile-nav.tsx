'use client';
import { useRef } from 'react';
export function MobileNav({children}:{children:React.ReactNode}) {
 const menu=useRef<HTMLDetailsElement>(null);
 return <details className="mobile-menu" ref={menu} onKeyDown={e=>{if(e.key==='Escape'&&menu.current){menu.current.open=false;menu.current.querySelector('summary')?.focus();}}}><summary>Explore +</summary><nav aria-label="Mobile navigation" onClick={e=>{if((e.target as HTMLElement).closest('a')&&menu.current)menu.current.open=false;}}>{children}</nav></details>;
}
