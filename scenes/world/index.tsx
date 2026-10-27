'use client';
import { isNightWatch } from '@/utils/watch';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useStudio } from '@/store/studio';
import { Studio } from '@/components/studio';
import { Panel } from './panels';
import type { Focus, WorldData } from './types';
const Room=dynamic(()=>import('./room'),{ssr:false,loading:()=>null});
const subscribeMotion=(cb:()=>void)=>{const m=matchMedia('(prefers-reduced-motion: reduce)');m.addEventListener('change',cb);return()=>m.removeEventListener('change',cb);};
class CanvasBoundary extends Component<{children:React.ReactNode;onFailure:()=>void},{failed:boolean}>{
 state={failed:false};componentDidCatch(){this.props.onFailure();}static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?<div className="world-loading"><h2>The vessel needs a different window.</h2><p>3D rendering is unavailable here. Use the instrument buttons to explore, or return to the atlas.</p><Link href="/">Return to the atlas ↗</Link></div>:this.props.children;}
}
export default function World({data}:{data:WorldData}){
 const [focus,setFocus]=useState<Focus>(null),[hover,setHover]=useState<string|null>(null),[lights,setLights]=useState(false),[ready,setReady]=useState(false);
 const [hour,setHour]=useState(12);const bubble=useRef<HTMLDivElement>(null),pointer=useRef<HTMLDivElement>(null);const lastTrigger=useRef<HTMLElement|null>(null);
 const studio=useStudio();const reduce=useSyncExternalStore(subscribeMotion,()=>matchMedia('(prefers-reduced-motion: reduce)').matches,()=>true);const motion=studio.motion!=='off'&&!reduce;
 useEffect(()=>{let previousNight:boolean|null=null;const refresh=()=>{const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:data.settings.timezone,hour:'numeric',hourCycle:'h23'}).format(new Date()));setHour(hour);const nextNight=isNightWatch(hour);if(nextNight!==previousNight){setLights(nextNight);previousNight=nextNight;}};refresh();const timer=setInterval(refresh,60000);return()=>clearInterval(timer);},[data.settings.timezone]);
 const night=isNightWatch(hour);

 const select=useCallback((next:Focus)=>{lastTrigger.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setFocus(next);setHover(null);},[]);
 const close=useCallback(()=>{setFocus(null);if(lastTrigger.current?.isConnected)lastTrigger.current.focus();else document.querySelector<HTMLButtonElement>('.world-instruments button')?.focus();},[]);
 useEffect(()=>{const handler=(e:KeyboardEvent)=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]'))close();};window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler);},[close]);
 const onHead=useCallback((x:number,y:number)=>{if(bubble.current)bubble.current.style.transform=`translate(${x}px,${y}px) translate(-50%,-100%)`;},[]);
 const onReady=useCallback(()=>setReady(true),[]);
 return <main id="main" className={`world-page ${night?'world-is-night':''}`}>
  <header className="world-header"><Link href="/" className="world-return">← Return to the atlas</Link><div className="world-heading"><h1>{data.world.title}</h1><span>{data.settings.location} · {night?'Night watch':'Day watch'}</span></div><button type="button" className="world-lamp" aria-pressed={lights} onClick={()=>setLights(v=>!v)}>Deck lights {lights?'on':'off'}</button></header>
  <div className={`world-stage ${focus?'has-panel':''}`} onPointerMove={e=>{if(pointer.current)pointer.current.style.transform=`translate(${e.clientX+18}px,${e.clientY-28}px)`;}}>
   <CanvasBoundary onFailure={onReady}><Room focus={focus} motion={motion} night={night} lights={lights} trail={studio.droneTrail} select={select} hover={setHover} onHead={onHead} ready={onReady} toggleLights={()=>setLights(v=>!v)}/></CanvasBoundary>
   {!ready&&<div className="world-loading world-loading-status" role="status">Setting course. Preparing the vessel…</div>}
   <div ref={bubble} className="world-speech" hidden={focus!=='character'} aria-hidden="true">Welcome aboard.</div>
  </div>
  <div className="world-tooltip" ref={pointer} hidden={!hover} aria-hidden="true">{hover}</div>
  {focus&&<Panel key={focus} focus={focus} data={data} close={close} motion={motion}/>}
  <nav className="world-instruments" aria-label="Ship instruments"><span className="tiny">EXPLORE THE DECK</span><div>{data.world.objects.map(o=><button type="button" key={o.id} aria-pressed={focus===o.id} onClick={()=>select(o.id as Focus)}>{o.label}</button>)}<button type="button" aria-pressed={focus==='character'} onClick={()=>select('character')}>Meet Han Lin</button>{focus&&<button type="button" onClick={close}>Home view ↺</button>}</div></nav>
  <div className="world-caption">{data.world.subtitle} <span>Click an instrument. Follow your curiosity.</span></div><Studio/>
  <nav className="sr-only" aria-label="Accessible atlas links">{data.world.objects.map(o=><Link key={o.id} href={o.href}>{o.description}</Link>)}<Link href="/blog">Blog</Link></nav>
 </main>;
}
