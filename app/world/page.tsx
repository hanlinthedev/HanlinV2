import World from '@/scenes/world';
import { getSettings,getWorld,getProjects,getNow,getExperience,getSkills,getPosts,getCopy } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
export async function generateMetadata(){return pageMetadata('/world','The Wandering Shipwright','Explore Han Lin Aung’s interactive engineering atlas: projects, experience, tools, and field notes aboard a travelling ship.');}
export default async function WorldPage(){const [settings,world,projects,now,history,skills,posts,copy]=await Promise.all([getSettings(),getWorld(),getProjects(),getNow(),getExperience(),getSkills(),getPosts(),getCopy()]);return <World data={{settings,world,projects,now,history,skills,posts,copy}}/>;}
