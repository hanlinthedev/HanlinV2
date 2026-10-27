'use client';
import { useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { BackSide, DataTexture, NearestFilter, RedFormat, type Group } from 'three';
const ramp=new DataTexture(new Uint8Array([90,175,255]),3,1,RedFormat);
ramp.minFilter=NearestFilter;ramp.magFilter=NearestFilter;ramp.needsUpdate=true;
export function Block({at,size,color,rotation=[0,0,0],glow}:{at:[number,number,number];size:[number,number,number];color:string;rotation?:[number,number,number];glow?:string}){return <mesh position={at} rotation={rotation} castShadow receiveShadow><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={.85} flatShading emissive={glow??'#000000'} emissiveIntensity={glow?.5:0}/></mesh>;}
export function Part({size,color,at=[0,0,0]}:{size:[number,number,number];color:string;at?:[number,number,number]}){return <group position={at}><mesh castShadow><boxGeometry args={size}/><meshToonMaterial color={color} gradientMap={ramp}/></mesh><mesh scale={[1.025,1.025,1.025]}><boxGeometry args={size}/><meshBasicMaterial color="#22302f" side={BackSide}/></mesh></group>;}
export function Hotspot({label,at,select,hover,children}:{label:string;at:[number,number,number];select:()=>void;hover:(label:string|null)=>void;children:React.ReactNode}){
 const ref=useRef<Group>(null);const [active,setActive]=useState(false);
 useFrame((_,dt)=>{if(ref.current)ref.current.position.y+=(at[1]+(active&&document.documentElement.dataset.motion!=='off'?.12:0)-ref.current.position.y)*Math.min(1,dt*10);});
 function over(e:ThreeEvent<PointerEvent>){e.stopPropagation();setActive(true);hover(label);}
 return <group ref={ref} position={at} onPointerOver={over} onPointerOut={()=>{setActive(false);hover(null);}} onClick={e=>{e.stopPropagation();select();}}>{children}</group>;
}
