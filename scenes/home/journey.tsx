import { Section } from '@/components/section';
import { getExperience } from '@/lib/content';
import { monthLabel } from '@/utils/dates';
export async function Journey(){const {experience}=await getExperience();return <Section id="journey" title={<>Different waters.<br/><em>The same curiosity.</em></>}>{experience.map(e=><article className="journey-row" key={e.company}><div className="journey-date">{monthLabel(e.start)}<br/>↓<br/>{e.end?monthLabel(e.end):'Present'}</div><div><h3>{e.company}</h3><div className="role">{e.role}</div><p>{e.summary}</p>{e.details.length>0&&<details><summary>A few things I worked on +</summary><ul>{e.details.map(d=><li key={d}>{d}</li>)}</ul></details>}</div></article>)}</Section>;}
