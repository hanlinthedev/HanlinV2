'use client';
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera, Line } from '@react-three/drei';
import { Shape, type Group, Vector3, BufferGeometry, Float32BufferAttribute, OrthographicCamera as ThreeOrtho, CanvasTexture, SRGBColorSpace, type MeshBasicMaterial, type MeshStandardMaterial, type PointLight, PCFShadowMap } from 'three';
import { Block, Hotspot } from './primitives';
import { Character } from './character';
import type { Focus } from './types';
const WOOD='#ad8054',DARKWOOD='#654e39',PAPER='#e4d7b4',INK='#405b7c',BRASS='#c4a16a';
const OBJECTS:Record<string,[number,number,number]>={projects:[2.6,.82,1.5],journey:[-.6,.82,1.8],about:[-3,.82,1.6],skills:[-3,.82,-1.5],contact:[3,.82,-1.4]};
function MastBeacon({night,motion}:{night:boolean;motion:boolean}){
 const bulb=useRef<MeshStandardMaterial>(null);const light=useRef<PointLight>(null);
 useFrame(({clock})=>{const bright=night&&(!motion||clock.elapsedTime%2<.45);if(bulb.current)bulb.current.emissiveIntensity=bright?4:0;if(light.current)light.current.intensity=bright?4:0;});
 return <group position={[0,6.55,0]}><mesh><cylinderGeometry args={[.1,.15,.12,8]}/><meshStandardMaterial color={DARKWOOD}/></mesh><mesh position={[0,.15,0]}><sphereGeometry args={[.12,12,8]}/><meshStandardMaterial ref={bulb} color="#a92320" emissive="#ff2118" emissiveIntensity={0} toneMapped={false}/></mesh><pointLight ref={light} position={[0,.22,0]} color="#ff3020" intensity={0} distance={5}/></group>;
}
function RadioScreen({motion}:{motion:boolean}){
 const material=useRef<MeshBasicMaterial>(null);const last=useRef(-1);const resources=useRef<{map:CanvasTexture|null}>({map:null});
 useEffect(()=>{const resource=resources.current;return()=>resource.map?.dispose();},[]);
 useFrame(({clock})=>{
  const screen=material.current;if(!screen)return;
  if(!screen.map){const canvas=document.createElement('canvas');canvas.width=256;canvas.height=128;const map=new CanvasTexture(canvas);map.colorSpace=SRGBColorSpace;resources.current.map=map;screen.map=map;screen.needsUpdate=true;}
  const tick=motion?Math.floor(clock.elapsedTime*5):0;if(last.current===tick)return;last.current=tick;
  const ctx=(screen.map.image as HTMLCanvasElement).getContext('2d');if(!ctx)return;
  ctx.fillStyle='#223d3b';ctx.fillRect(0,0,256,128);ctx.fillStyle='#c9dfb5';ctx.font='22px monospace';ctx.fillText('SIGNAL / HL',16,30);ctx.beginPath();
  for(let x=0;x<224;x++){const y=78+Math.sin(x*.075+tick*.4)*15*Math.sin(x*.02);if(x===0)ctx.moveTo(x+16,y);else ctx.lineTo(x+16,y);}
  ctx.strokeStyle='#c9dfb5';ctx.lineWidth=3;ctx.stroke();screen.map.needsUpdate=true;
 });
 return <mesh position={[-.2,.38,.324]}><planeGeometry args={[.35,.28]}/><meshBasicMaterial ref={material} toneMapped={false}/></mesh>;
}
function Sail({side,motion}:{side:number;motion:boolean}){
 const ref=useRef<Group>(null);const geom=useMemo(()=>{const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute([.12,5.8,0,side*3.1,2.7,0,.12,2.4,0],3));g.computeVertexNormals();return g;},[side]);
 useFrame(({clock})=>{if(ref.current)ref.current.rotation.y=motion?Math.sin(clock.elapsedTime*.9+side)*.06:0;});
 return <group ref={ref}><mesh geometry={geom} castShadow><meshStandardMaterial color={side>0?'#e5d7b2':'#c7b998'} side={2} roughness={1}/></mesh><Line points={[[.12,5.8,.02],[side*3.1,2.7,.02],[.12,2.4,.02],[.12,5.8,.02]]} color={DARKWOOD} lineWidth={1}/></group>;
}
function CameraRig({focus,motion}:{focus:Focus;motion:boolean}){
 const look=useRef(new Vector3(0,1,0));const goal=useRef(new Vector3());const target=useRef(new Vector3());
 useFrame(({camera,pointer,size},dt)=>{dt=Math.min(dt,.05);const point=focus&&OBJECTS[focus];const mobile=size.width<700;target.current.set(...(point??(focus==='character'?[1,1.6,.3]:[0,1,0])) as [number,number,number]);const distance=focus? (mobile?14:11): (mobile?25:20);goal.current.set(distance*.8+(motion?pointer.x*.35:0),distance*.72,distance).add(target.current);const t=motion?1-Math.exp(-dt*3):1;camera.position.lerp(goal.current,t);look.current.lerp(target.current,t);camera.lookAt(look.current);const ortho=camera as ThreeOrtho;const zoom=Math.min(size.width/(focus?(mobile?15:13):19),size.height/(mobile?15:12));ortho.zoom+=(zoom-ortho.zoom)*t;ortho.updateProjectionMatrix();});return null;
}
function Drone({motion,trail}:{motion:boolean;trail:boolean}){
 const ref=useRef<Group>(null);useFrame(({clock})=>{if(!ref.current)return;const t=motion?Math.sin(clock.elapsedTime*.15)*Math.PI:.6;ref.current.position.set(Math.cos(t)*4.8,3.3+(motion?Math.sin(clock.elapsedTime*1.5)*.12:0),Math.sin(t)*3.3);ref.current.rotation.y=-t;});
 return <>{trail&&<Line points={Array.from({length:65},(_,i)=>[Math.cos(i/64*Math.PI*2)*4.8,3.3,Math.sin(i/64*Math.PI*2)*3.3] as [number,number,number])} color="#9aab9d" transparent opacity={.35} dashed dashSize={.12} gapSize={.17}/>}<group ref={ref}><Block at={[0,0,0]} size={[.62,.23,.4]} color={PAPER}/><Block at={[0,-.13,.23]} size={[.18,.13,.08]} color={INK}/>{[-1,1].map(x=><group key={x}><Block at={[x*.42,.05,0]} size={[.4,.06,.08]} color={BRASS}/><mesh position={[x*.6,.12,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.18,.23,16]}/><meshStandardMaterial color={DARKWOOD} side={2}/></mesh></group>)}</group></>;
}
function Ocean({motion,night}:{motion:boolean;night:boolean}){
 const currents=useRef<(Group|null)[]>([]),wake=useRef<(Group|null)[]>([]);
 useFrame(({clock})=>{
  const t=motion?clock.elapsedTime:0;
  currents.current.forEach((group,i)=>{if(group){group.position.x=22-((t*2.4+i*3.17)%48);group.position.y=motion?Math.sin(t*1.4+i)*.025:0;}});
  wake.current.forEach((group,i)=>{if(group){const progress=(t*.22+i/7)%1;group.position.x=-4.8-progress*12;group.scale.set(1,1,1+progress*1.8);const line=group.children[0] as unknown as {material:{opacity:number}};line.material.opacity=Math.sin(progress*Math.PI)*.42;}});
 });
 const foam=night?'#8db5bd':'#e0ece0';
 return <>
 <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.84,0]} receiveShadow><planeGeometry args={[200,200]}/><meshStandardMaterial color={night?'#203c43':'#89a9a4'} roughness={.62}/></mesh>
 {Array.from({length:54},(_,i)=><group key={i} ref={node=>{currents.current[i]=node;}} position={[0,0,(i*7.13)%36-18]}><Line points={[[0,-.8,0],[.8,-.8,.06],[1.8,-.8,-.03],[2.7+(i%3)*.5,-.8,.02]]} color={foam} transparent opacity={.25+(i%3)*.1} lineWidth={1.2}/></group>)}
 {Array.from({length:7},(_,i)=><group key={i} ref={node=>{wake.current[i]=node;}}><Line points={[[0,-.79,-1.9],[.5,-.79,-1],[.7,-.79,0],[.5,-.79,1],[0,-.79,1.9]]} color={foam} transparent opacity={.42} lineWidth={1.5}/></group>)}
 {[-1,1].map(side=><Line key={side} points={[[5.3,-.77,0],[4.8,-.77,side*1.3],[3.5,-.77,side*2.5],[.5,-.77,side*2.65],[-4,-.77,side*2.7],[-9,-.77,side*4.1]]} color={foam} transparent opacity={.65} lineWidth={1.8}/>)}
 </>;
}
function Vessel({focus,motion,night,lights,trail,select,hover,onHead,toggleLights}:{focus:Focus;motion:boolean;night:boolean;lights:boolean;trail:boolean;select:(f:Focus)=>void;hover:(s:string|null)=>void;onHead:(x:number,y:number)=>void;toggleLights:()=>void}){
 const ship=useRef<Group>(null);const hull=useMemo(()=>{const s=new Shape();s.moveTo(-5,-2.4);s.lineTo(3.7,-2.4);s.quadraticCurveTo(6,0,3.7,2.4);s.lineTo(-5,2.4);s.quadraticCurveTo(-5.6,0,-5,-2.4);return s;},[]);
 useFrame(({clock})=>{if(ship.current){ship.current.rotation.z=motion?Math.sin(clock.elapsedTime*.95)*.022:0;ship.current.rotation.x=motion?Math.sin(clock.elapsedTime*.75)*.018:0;ship.current.position.y=motion?Math.sin(clock.elapsedTime*1.1)*.13:0;}});
 return <group ref={ship}>
 <mesh rotation={[Math.PI/2,0,0]} position={[0,.5,0]} castShadow receiveShadow><extrudeGeometry args={[hull,{depth:1.2,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.15,bevelThickness:.15}]}/><meshStandardMaterial color={DARKWOOD} roughness={.9}/></mesh>
 <mesh rotation={[Math.PI/2,0,0]} position={[0,.7,0]} receiveShadow><extrudeGeometry args={[hull,{depth:.16,bevelEnabled:false}]}/><meshStandardMaterial color={WOOD} roughness={1}/></mesh>
 {Array.from({length:11},(_,i)=><Line key={i} points={[[-4.8,.715,(i-5)*.4],[3.8,.715,(i-5)*.4]]} color={DARKWOOD} transparent opacity={.35}/>)}
 {[-1,1].map(side=><group key={side}><Block at={[-.5,1.34,side*2.3]} size={[9,.1,.1]} color={BRASS}/>{[-4.5,-2.5,0,2.5,3.7].map(x=><Block key={x} at={[x,1.02,side*2.3]} size={[.09,.65,.09]} color={DARKWOOD}/>)}</group>)}
 <mesh position={[0,3.5,0]} castShadow><cylinderGeometry args={[.09,.14,5.7,8]}/><meshStandardMaterial color={DARKWOOD}/></mesh><MastBeacon night={night} motion={motion}/><Sail side={1} motion={motion}/><Sail side={-1} motion={motion}/>
 <Line points={[[-4.5,.8,0],[0,6.3,0],[4.8,.8,0]]} color={DARKWOOD} lineWidth={1}/><Block at={[.37,6.25,0]} size={[.75,.3,.035]} color={INK}/>
 <Hotspot label="Workbench · projects" at={OBJECTS.projects} select={()=>select('projects')} hover={hover}><Block at={[0,.35,0]} size={[1.65,.12,.8]} color={DARKWOOD}/>{[-.6,.6].map(x=><Block key={x} at={[x,.12,0]} size={[.1,.45,.55]} color={DARKWOOD}/>)}<Block at={[-.25,.49,0]} size={[.6,.2,.37]} color={INK}/><Block at={[.4,.46,0]} size={[.35,.12,.45]} color={PAPER}/><Block at={[.4,.57,0]} size={[.28,.05,.04]} color={BRASS}/></Hotspot>
 <Hotspot label="Navigation chart · journey" at={OBJECTS.journey} select={()=>select('journey')} hover={hover}><Block at={[0,.12,0]} size={[1.4,.16,.8]} color={DARKWOOD}/><Block at={[0,.22,0]} size={[1.28,.04,.7]} color={PAPER}/><Line points={[[-.5,.25,-.2],[-.2,.25,.12],[.1,.25,-.13],[.5,.25,.15]]} color={INK} lineWidth={2}/><Block at={[0,-.08,0]} size={[.5,.4,.4]} color={DARKWOOD}/></Hotspot>
 <Hotspot label="Field journal · about & writing" at={OBJECTS.about} select={()=>select('about')} hover={hover}><Block at={[0,.25,0]} size={[1.1,.5,.7]} color={DARKWOOD}/><Block at={[0,.54,0]} size={[.58,.08,.45]} color={INK}/><Block at={[0,.59,.01]} size={[.5,.035,.4]} color={PAPER}/></Hotspot>
 <Hotspot label="Instrument cabinet · skills" at={OBJECTS.skills} select={()=>select('skills')} hover={hover}><Block at={[0,.55,0]} size={[1.3,1.1,.65]} color={DARKWOOD}/>{[.22,.58,.94].map(y=><group key={y}><Block at={[0,y,.35]} size={[1.13,.27,.04]} color={WOOD}/><Block at={[0,y,.4]} size={[.24,.04,.05]} color={BRASS}/></group>)}</Hotspot>
 <Hotspot label="Signal radio · contact" at={OBJECTS.contact} select={()=>select('contact')} hover={hover}><Block at={[0,.35,0]} size={[1,.65,.6]} color={INK}/><RadioScreen motion={motion}/><mesh position={[.25,.38,.34]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.11,.11,.06,12]}/><meshStandardMaterial color={BRASS}/></mesh><Block at={[.3,1,0]} size={[.035,.7,.035]} color={BRASS}/></Hotspot>
 <Hotspot label="Survey drone · now" at={[0,0,0]} select={()=>select('now')} hover={hover}><Drone motion={motion} trail={trail}/></Hotspot>
 <Hotspot label="Han Lin · say hello" at={[0,0,0]} select={()=>select('character')} hover={hover}><Character target={focus} chat={focus==='character'} motion={motion} onHead={onHead}/></Hotspot>
 <Hotspot label={lights?'Deck lamp · turn off':'Deck lamp · turn on'} at={[-4,1.1,0]} select={toggleLights} hover={hover}><Block at={[0,.2,0]} size={[.24,.5,.24]} color={BRASS} glow={lights?'#ffd18a':undefined}/></Hotspot>
 {lights&&<><pointLight position={[-3,2.8,0]} color="#ffcc88" intensity={night?20:5} distance={10}/><pointLight position={[3,2.5,0]} color="#ffdd9c" intensity={night?14:4} distance={8}/></>}
 </group>;
}
export default function Room(props:{focus:Focus;motion:boolean;night:boolean;lights:boolean;trail:boolean;select:(f:Focus)=>void;hover:(s:string|null)=>void;onHead:(x:number,y:number)=>void;ready:()=>void;toggleLights:()=>void}){
 return <Canvas shadows={{type:PCFShadowMap}} dpr={[1,1.6]} gl={{antialias:true,alpha:false}} onCreated={()=>props.ready()}><color attach="background" args={[props.night?'#17282e':'#c7d4c8']}/><fog attach="fog" args={[props.night?'#17282e':'#c7d4c8',32,90]}/><OrthographicCamera makeDefault position={[16,15,20]} zoom={42} near={.1} far={150}/><ambientLight intensity={props.night?.65:1.4}/><directionalLight position={[8,15,6]} intensity={props.night?.7:2.5} color={props.night?'#b5cdf3':'#fff0d1'} castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-14} shadow-camera-right={14} shadow-camera-top={14} shadow-camera-bottom={-14}/><Ocean motion={props.motion} night={props.night}/><Vessel {...props}/><CameraRig focus={props.focus} motion={props.motion}/></Canvas>;
}
