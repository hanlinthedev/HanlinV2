// Infer public content types locally so this website can deploy independently.
import type { SETTINGS, SECTIONS } from '@/data/settings';
import type { PROJECTS, NOW } from '@/data/projects';
import type { EXPERIENCE, EDUCATION, CERTIFICATES } from '@/data/experience';
import type { SKILLS } from '@/data/skills';
import type { COPY } from '@/data/copy';
import type { WORLD } from '@/data/world';
import type { Post } from '@/data/posts';

export type PortfolioContent = {
 settings: Omit<typeof SETTINGS, 'cvUrl'> & { cvUrl?: string };
 projects: typeof PROJECTS;
 now: typeof NOW;
 experience: typeof EXPERIENCE;
 education: typeof EDUCATION;
 certificates: typeof CERTIFICATES;
 skills: typeof SKILLS;
 posts: (Post & { published?: boolean })[];
 copy: typeof COPY;
 world: typeof WORLD;
 navigation: { sections: typeof SECTIONS; archivePublished: boolean };
};
