export const INKS = ['indigo', 'rust', 'forest'] as const;
export const FONTS = ['bookish', 'technical', 'plain'] as const;
export const APPEARANCES = ['paper', 'night', 'time'] as const;
export type StudioSettings = {
  ink: typeof INKS[number]; font: typeof FONTS[number];
  appearance: typeof APPEARANCES[number]; motion: 'gentle' | 'off'; droneTrail: boolean;
};
export const DEFAULTS: StudioSettings = { ink:'indigo', font:'bookish', appearance:'time', motion:'gentle', droneTrail:true };
export const EDITIONS: {name:string;description:string;settings:StudioSettings}[] = [
 {name:'Original atlas',description:'Indigo ink, bookish type, light follows local time.',settings:DEFAULTS},
 {name:'Field notes',description:'Forest ink and practical, technical type.',settings:{...DEFAULTS,ink:'forest',font:'technical'}},
 {name:'After hours',description:'Copper ink, night paper, plain type.',settings:{...DEFAULTS,ink:'rust',font:'plain',appearance:'night'}},
];
export function cleanStudio(value: unknown): StudioSettings {
 const s=value && typeof value==='object'?value as Record<string,unknown>:{};
 return {
  ink:INKS.includes(s.ink as StudioSettings['ink'])?s.ink as StudioSettings['ink']:DEFAULTS.ink,
  font:FONTS.includes(s.font as StudioSettings['font'])?s.font as StudioSettings['font']:DEFAULTS.font,
  appearance:APPEARANCES.includes(s.appearance as StudioSettings['appearance'])?s.appearance as StudioSettings['appearance']:DEFAULTS.appearance,
  motion:s.motion==='off'?'off':'gentle', droneTrail:typeof s.droneTrail==='boolean'?s.droneTrail:DEFAULTS.droneTrail,
 };
}
export function encodeEdition(settings:StudioSettings) {return btoa(JSON.stringify({v:1,...cleanStudio(settings)}));}
export function decodeEdition(value:string|null):StudioSettings|null {
 if(!value||value.length>1024)return null;
 try { const data=JSON.parse(atob(value));
  if(!data||data.v!==1||!INKS.includes(data.ink)||!FONTS.includes(data.font)||!APPEARANCES.includes(data.appearance)||!['gentle','off'].includes(data.motion)||typeof data.droneTrail!=='boolean')return null;
  return cleanStudio(data);
 }catch{return null;}
}
