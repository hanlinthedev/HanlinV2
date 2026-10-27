import type { getSettings, getWorld, getProjects, getNow, getExperience, getSkills, getPosts, getCopy } from '@/lib/content';
export type WorldData = {
 settings:Awaited<ReturnType<typeof getSettings>>;world:Awaited<ReturnType<typeof getWorld>>;
 projects:Awaited<ReturnType<typeof getProjects>>;now:Awaited<ReturnType<typeof getNow>>;
 history:Awaited<ReturnType<typeof getExperience>>;skills:Awaited<ReturnType<typeof getSkills>>;
 posts:Awaited<ReturnType<typeof getPosts>>;copy:Awaited<ReturnType<typeof getCopy>>;
};
export type Focus = 'projects'|'journey'|'about'|'skills'|'now'|'contact'|'character'|null;
