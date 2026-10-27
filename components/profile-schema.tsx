import { getSettings, getSkills } from '@/lib/content';
import { jsonLd } from '@/lib/seo';
export async function ProfileSchema(){const [s,skills]=await Promise.all([getSettings(),getSkills()]);return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({'@context':'https://schema.org','@graph':[
 {'@type':'WebSite','@id':`${s.url}/#website`,url:s.url,name:s.fullName,alternateName:[s.name,'Han Lin / Systems Atelier'],inLanguage:'en',publisher:{'@id':`${s.url}/#person`}},
 {'@type':'Person','@id':`${s.url}/#person`,name:s.fullName,alternateName:[s.name,'hanlinthedev'],url:s.url,jobTitle:s.title,description:`${s.fullName} (${s.name}) is a ${s.title} based in ${s.location}.`,sameAs:[s.linkedin,s.github],knowsAbout:skills.flatMap(group=>group.tools),alumniOf:{'@type':'CollegeOrUniversity',name:'Myanmar Maritime University'}},
 {'@type':'ProfilePage','@id':`${s.url}/#profile`,url:s.url,name:`${s.fullName} | ${s.title}`,isPartOf:{'@id':`${s.url}/#website`},mainEntity:{'@id':`${s.url}/#person`}},
 ]})}}/>;}
