'use client';
import { isNightWatch } from '@/utils/watch';
import { useEffect } from 'react';
import { useStudio, setStudio } from '@/store/studio';
import { decodeEdition, type StudioSettings } from '@/store/studio-schema';
export function StudioProvider({timezone}:{timezone:string}) {
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  function apply(s:StudioSettings){
   const root=document.documentElement;
   const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:timezone,hour:'numeric',hourCycle:'h23'}).format(new Date()));
   root.dataset.ink=s.ink;root.dataset.font=s.font;
   root.dataset.appearance=s.appearance==='time'?(isNightWatch(hour)?'night':'paper'):s.appearance;
   root.dataset.motion=s.motion==='off'||media.matches?'off':'gentle';
   root.dataset.droneTrail=s.droneTrail?'on':'off';
  }
  let active=true;
  const unsubscribe=useStudio.subscribe(apply);
  async function init(){
   try{await useStudio.persist.rehydrate();}catch{/* Storage can be unavailable in private browsing. */}
   if(!active)return;
   const edition=decodeEdition(new URLSearchParams(window.location.search).get('s'));
   if(edition)setStudio(edition);
   apply(useStudio.getState());
  }
  void init();
  const refresh=()=>apply(useStudio.getState());
  const timer=window.setInterval(refresh,60000);
  media.addEventListener('change',refresh);
  return ()=>{active=false;unsubscribe();clearInterval(timer);media.removeEventListener('change',refresh);};
 },[timezone]);
 return null;
}
