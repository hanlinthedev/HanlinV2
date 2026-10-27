'use client';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { type Group, Vector3 } from 'three';
import { Part } from './primitives';
import { findPath, SPOTS } from './navigation';
import type { Focus } from './types';
export function Character({target,chat,motion,onHead}:{target:Focus;chat:boolean;motion:boolean;onHead:(x:number,y:number)=>void}){
 const root=useRef<Group>(null),arm=useRef<Group>(null),leftLeg=useRef<Group>(null),rightLeg=useRef<Group>(null),cover=useRef<Group>(null);
 const brain=useRef({node:'home',route:[] as string[],x:1,z:.3,phase:0,greeting:0});const point=useRef(new Vector3());
 useEffect(()=>{const b=brain.current;const dest=target==='character'||target==='now'||!target?'home':target;b.route=findPath(b.node,dest);if(chat)b.greeting=0;},[target,chat]);
 useFrame(({camera,size},dt)=>{
  if(!root.current)return;const b=brain.current;dt=Math.min(dt,.05);b.phase+=dt;b.greeting+=dt;let walking=false;
  if(b.route.length){const [tx,tz]=SPOTS[b.route[0]];const dx=tx-b.x,dz=tz-b.z,d=Math.hypot(dx,dz);if(!motion||d<.06){b.x=tx;b.z=tz;b.node=b.route.shift()!;}else{walking=true;const step=Math.min(d,dt*2);b.x+=dx/d*step;b.z+=dz/d*step;const desired=Math.atan2(dx,dz);const difference=Math.atan2(Math.sin(desired-root.current.rotation.y),Math.cos(desired-root.current.rotation.y));root.current.rotation.y+=difference*(1-Math.exp(-dt*10));}}
  else if(chat)root.current.rotation.y+=((.65)-root.current.rotation.y)*Math.min(1,dt*8);
  root.current.position.set(b.x,.76+(walking?Math.abs(Math.sin(b.phase*11))*.035:0),b.z);
  if(leftLeg.current)leftLeg.current.rotation.x=walking?Math.sin(b.phase*11)*.45:0;
  if(rightLeg.current)rightLeg.current.rotation.x=walking?-Math.sin(b.phase*11)*.45:0;
  if(arm.current){const angle=chat&&b.greeting<3?(-2.3+(motion?Math.sin(b.phase*10)*.15:0)):-.15;arm.current.rotation.z+=(angle-arm.current.rotation.z)*Math.min(1,dt*6);}
  if(cover.current)cover.current.rotation.y+=((chat?0:-1.1)-cover.current.rotation.y)*Math.min(1,dt*6);
  root.current.getWorldPosition(point.current);point.current.y+=2.65;point.current.project(camera);onHead((point.current.x*.5+.5)*size.width,(-point.current.y*.5+.5)*size.height);
 });
 return <group ref={root}>
  <Part size={[.72,.82,.43]} color="#344d85" at={[0,1.02,0]}/><Part size={[.52,.57,.48]} color="#c29570" at={[0,1.77,0]}/><Part size={[.56,.2,.52]} color="#293635" at={[0,2.08,-.02]}/><Part size={[.2,.24,.49]} color="#293635" at={[-.2,1.96,-.04]}/>
  <Part size={[.07,.06,.02]} color="#202d33" at={[-.14,1.8,.25]}/><Part size={[.07,.06,.02]} color="#202d33" at={[.14,1.8,.25]}/>
  <Part size={[.065,.75,.03]} color="#aa8156" at={[.1,1.05,.23]}/><Part size={[.17,.18,.04]} color="#253c6e" at={[-.18,1.18,.25]}/><Part size={[.025,.15,.03]} color="#e6c08a" at={[-.18,1.25,.28]}/>
  <group ref={arm} position={[.48,1.35,0]}><Part size={[.23,.49,.3]} color="#344d85" at={[0,-.2,0]}/><Part size={[.2,.29,.25]} color="#c29570" at={[0,-.53,0]}/></group>
  <group position={[-.48,1.35,0]} rotation={[-.7,0,.15]}><Part size={[.23,.45,.3]} color="#344d85" at={[0,-.2,0]}/><Part size={[.2,.3,.25]} color="#c29570" at={[0,-.5,0]}/><group position={[0,-.55,.2]}><Part size={[.4,.06,.4]} color="#d9c8a1"/><group ref={cover}><Part size={[.41,.035,.41]} color="#334c68" at={[.17,.035,0]}/></group></group></group>
  <group ref={leftLeg} position={[-.21,.62,0]}><Part size={[.28,.48,.31]} color="#3e4748" at={[0,-.2,0]}/><Part size={[.32,.21,.48]} color="#363630" at={[0,-.49,.07]}/></group><group ref={rightLeg} position={[.21,.62,0]}><Part size={[.28,.48,.31]} color="#3e4748" at={[0,-.2,0]}/><Part size={[.32,.21,.48]} color="#363630" at={[0,-.49,.07]}/></group>
 </group>;
}
