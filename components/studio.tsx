'use client';
import { useEffect, useRef, useState } from 'react';
import { useStudio, setStudio, useStudioDialog, openStudio } from '@/store/studio';
import { DEFAULTS, EDITIONS, encodeEdition, INKS, FONTS, APPEARANCES, type StudioSettings } from '@/store/studio-schema';
export function Studio(){
 const settings=useStudio();const dialog=useRef<HTMLDialogElement>(null);const trigger=useRef<HTMLButtonElement>(null);const opener=useRef<HTMLElement|null>(null);
 const [status,setStatus]=useState('');const [shareUrl,setShareUrl]=useState('');
 const requested=useStudioDialog(s=>s.open);
 useEffect(()=>{const panel=dialog.current;if(!panel)return;const close=()=>{useStudioDialog.setState({open:false});if(opener.current?.isConnected)opener.current.focus();else trigger.current?.focus();setStatus('');setShareUrl('');};panel.addEventListener('close',close);return()=>panel.removeEventListener('close',close);},[]);
 useEffect(()=>{const panel=dialog.current;if(!panel)return;if(requested&&!panel.open){opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;panel.showModal();}else if(!requested&&panel.open)panel.close();},[requested]);

 function change(patch:Partial<StudioSettings>){setStudio(patch);const url=new URL(window.location.href);if(url.searchParams.has('s')){url.searchParams.delete('s');window.history.replaceState(null,'',url);}setStatus('Edition updated. Saved on this browser.');setShareUrl('');}
 async function share(){
  const url=new URL(window.location.href);url.searchParams.set('s',encodeEdition(useStudio.getState()));url.hash='';setShareUrl(url.toString());
  try{await navigator.clipboard.writeText(url.toString());setStatus('Edition link copied.');}catch{setStatus('Copy your edition link below.');}
 }
 function restore(){setStudio(DEFAULTS);const url=new URL(window.location.href);url.searchParams.delete('s');window.history.replaceState(null,'',url);setShareUrl('');setStatus('Original atlas restored.');}
 return <>
 <button type="button" className="studio-dock" ref={trigger} onClick={openStudio} aria-haspopup="dialog"><span className="chart-mark" aria-hidden="true">⌑</span><span>Your edition <span className="studio-dock-sub">Open the chart table</span></span><span aria-hidden="true">+</span></button>
 <dialog ref={dialog} className="studio-dialog" aria-labelledby="studio-title" onClick={e=>{if(e.target===dialog.current){const rect=dialog.current.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.current.close();}}}>
  <div className="studio-top"><span className="tiny accent">THE ATLAS / VISITOR EDITION</span><button type="button" className="studio-close" onClick={()=>dialog.current?.close()} aria-label="Close chart table">×</button></div>
  <h2 id="studio-title">Make yourself <em>at home.</em></h2><p className="studio-intro">Same atlas. Your ink, your light, your pace.</p>
  <fieldset className="studio-editions"><legend>Start with an edition</legend><div className="edition-grid">{EDITIONS.map(e=><button type="button" key={e.name} onClick={()=>change(e.settings)} aria-pressed={Object.entries(e.settings).every(([k,v])=>settings[k as keyof StudioSettings]===v)}><span>{e.name}</span><small>{e.description}</small></button>)}</div></fieldset>
  <div className="studio-fields">
   <fieldset><legend>Ink</legend><div className="studio-options">{INKS.map(ink=><button type="button" key={ink} aria-pressed={settings.ink===ink} onClick={()=>change({ink})}><i className={`ink-swatch ${ink}`} aria-hidden="true"/>{ink}</button>)}</div></fieldset>
   <fieldset><legend>Reading type</legend><div className="studio-options">{FONTS.map(font=><button type="button" key={font} aria-pressed={settings.font===font} onClick={()=>change({font})}>{font}</button>)}</div></fieldset>
   <fieldset><legend>Light</legend><div className="studio-options">{APPEARANCES.map(appearance=><button type="button" key={appearance} aria-pressed={settings.appearance===appearance} onClick={()=>change({appearance})}>{appearance==='time'?'Follow Han Lin’s time':appearance}</button>)}</div><p className="studio-hint">Night from 6 PM to 6 AM in Han Lin’s configured timezone.</p></fieldset>
   <fieldset><legend>Motion</legend><div className="studio-options">{(['gentle','off'] as const).map(motion=><button type="button" key={motion} aria-pressed={settings.motion===motion} onClick={()=>change({motion})}>{motion}</button>)}</div><p className="studio-hint">Your device’s reduced-motion preference always takes priority.</p></fieldset>
  </div>
  <label className="studio-toggle"><input type="checkbox" checked={settings.droneTrail} onChange={e=>change({droneTrail:e.target.checked})}/><span>Survey drone trail<small>A dotted route on the sketch, and in the future world.</small></span></label>
  <div className="studio-bottom"><button type="button" className="primary" onClick={share}>Share this edition ↗</button><button type="button" className="studio-reset" onClick={restore}>Restore original</button></div>
  <p role="status" className="studio-status">{status||'Preferences stay on this browser.'}</p>
  {shareUrl&&<label className="studio-share">Your edition link<input readOnly value={shareUrl} onFocus={e=>e.target.select()} aria-label="Your edition link"/></label>}
 </dialog>
 </>;
}
