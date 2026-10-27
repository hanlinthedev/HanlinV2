'use client';
import { openStudio } from '@/store/studio';
export function StudioTrigger({children}:{children:React.ReactNode}) {
 return <div className="ship-studio-trigger">{children}<button type="button" className="ship-studio-button" aria-label="Open the chart table from the ship illustration" aria-haspopup="dialog" onClick={openStudio}><span className="ship-studio-hint">Open the chart table ↗</span></button></div>;
}
