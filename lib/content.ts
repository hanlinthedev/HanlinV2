import 'server-only';
import { WORLD } from '@/data/world';
import { cacheTag } from 'next/cache';
import { SETTINGS, SECTIONS, ARCHIVE_PUBLISHED } from '@/data/settings';
import { PROJECTS, NOW } from '@/data/projects';
import { EXPERIENCE, EDUCATION, CERTIFICATES } from '@/data/experience';
import { SKILLS } from '@/data/skills';
import { COPY } from '@/data/copy';
import { POSTS } from '@/data/posts';
export async function getSettings() { 'use cache'; cacheTag('settings'); return SETTINGS; }
export async function getNavigation() { 'use cache'; cacheTag('navigation'); return { sections: SECTIONS, archivePublished: ARCHIVE_PUBLISHED }; }
export async function getProjects() { 'use cache'; cacheTag('projects'); return PROJECTS.filter(p=>p.published).toSorted((a,b)=>a.order-b.order); }
export async function getNow() { 'use cache'; cacheTag('now'); return NOW; }
export async function getExperience() { 'use cache'; cacheTag('experience'); return { experience:EXPERIENCE, education:EDUCATION, certificates:CERTIFICATES }; }
export async function getSkills() { 'use cache'; cacheTag('skills'); return SKILLS; }
export async function getPosts() { 'use cache'; cacheTag('posts'); return POSTS.toSorted((a,b)=>b.date.localeCompare(a.date)); }
export async function getPost(slug: string) { 'use cache'; cacheTag('posts'); return POSTS.find(post=>post.slug===slug); }

export async function getCopy() { 'use cache'; cacheTag('copy'); return COPY; }

export async function getWorld() { 'use cache'; cacheTag('world'); return WORLD; }
