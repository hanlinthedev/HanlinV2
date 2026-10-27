'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Focus, WorldData } from './types';
import { monthLabel } from '@/utils/dates';
export function Panel({focus,data,close,motion}:{focus:Exclude<Focus,null>;data:WorldData;close:()=>void;motion:boolean}){
 const ref=useRef<HTMLElement>(null);const [count,setCount]=useState(0);const messages=[data.world.greeting,...data.world.messages];
 useEffect(()=>{ref.current?.focus();},[]);
 useEffect(()=>{if(focus!=='character'||!motion)return;let n=0;const total=[data.world.greeting,...data.world.messages].join('').length;const timer=setInterval(()=>{n+=2;setCount(n);if(n>=total)clearInterval(timer);},28);return()=>clearInterval(timer);},[focus,motion,data.world.greeting,data.world.messages]);

 const object=data.world.objects.find(o=>o.id===focus);const heading=focus==='character'?'A word with Han Lin':object?.label;
 return <aside ref={ref} tabIndex={-1} className="world-panel" aria-labelledby="world-panel-title"><div className="world-panel-bar"><span className="tiny accent">SHIP’S LOG / {focus==='character'?'HELLO':focus.toUpperCase()}</span><button type="button" onClick={close} aria-label="Close instrument panel">×</button></div><h2 id="world-panel-title">{heading}</h2>
 {focus==='projects'&&data.projects.map(p=><article key={p.id}><span className="tiny muted">PRIVATE PROJECT / {p.id}</span><h3>{p.title}</h3><p>{p.description}</p></article>)}
 {focus==='journey'&&data.history.experience.map(e=><article key={e.company}><span className="tiny accent">{monthLabel(e.start)} → {e.end?monthLabel(e.end):'Present'}</span><h3>{e.company}</h3><span className="world-role">{e.role}</span><p>{e.summary}</p></article>)}
 {focus==='about'&&<><p>I’m {data.settings.name}, a software engineer in {data.settings.location}.</p>{data.copy.about.paragraphs.map(p=><p key={p}>{p}</p>)}<h3>Field notes</h3>{data.posts.map(p=><Link className="world-note-link" key={p.slug} href={`/blog/${p.slug}`}>{p.title} ↗</Link>)}</>}
 {focus==='skills'&&data.skills.map(s=><article key={s.category}><h3>{s.category}</h3><p>{s.tools.join(' · ')}</p></article>)}
 {focus==='now'&&<><span className="tiny accent">CURRENT EXPEDITION / PRIVATE PROJECT</span><h3>{data.now.title}</h3><p>{data.now.description}</p><h3>Learning, on purpose</h3><p>{data.now.learning}</p></>}
 {focus==='character'&&<div className="world-chat" aria-label="Conversation with Han Lin">{messages.map((m,i)=>{const before=messages.slice(0,i).join('').length;const text=motion?m.slice(0,Math.max(0,count-before)):m;return text?<p className="world-message" key={m}>{i===0?<em>{text}</em>:text}</p>:null;})}</div>}
 {(focus==='contact'||focus==='character')&&<><p>A role, a project, or a good engineering conversation.</p><div className="world-contact"><a href={`mailto:${data.settings.email}`}>Email ↗</a><a href={`tel:${data.settings.phone.replaceAll(' ','')}`}>Phone ↗</a><a href={data.settings.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={data.settings.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div></>}
 {object&&<Link className="world-full-link" href={object.href}>Continue in the atlas ↗</Link>}
 </aside>;
}
