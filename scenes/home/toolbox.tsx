import { Section } from '@/components/section';
import { getSkills } from '@/lib/content';
export async function Toolbox(){const skills=await getSkills();return <Section id="toolbox" title={<>Tools of <em>the trade.</em></>}><div className="skills">{skills.map(s=><div className="skill" key={s.category}><h3>{s.category.toUpperCase()}</h3><p>{s.tools.join(' · ')}</p></div>)}</div></Section>;}
