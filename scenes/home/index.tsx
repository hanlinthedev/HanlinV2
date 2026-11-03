import { getNavigation } from '@/lib/content';
import { ProfileSchema } from '@/components/profile-schema';
import { Hero } from './hero';
import { About } from './about';
import { Work } from './work';
import { Now } from './now';
import { Journey } from './journey';
import { Toolbox } from './toolbox';
import { Contact } from './contact';
const parts={about:About,work:Work,now:Now,journey:Journey,toolbox:Toolbox,contact:Contact};
export default async function Home(){const {sections}=await getNavigation();return <><ProfileSchema/><Hero/>{sections.map(section=>{const Part=parts[section.id as keyof typeof parts];return Part?<Part key={section.id}/>:null;})}</>;}
