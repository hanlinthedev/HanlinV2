export const SPOTS:Record<string,[number,number]>={home:[1,.3],projects:[2.4,1],journey:[-.6,1.3],about:[-2.5,1.2],skills:[-2.5,-1.1],contact:[2.7,-1.1]};
export const EDGES:Record<string,string[]>={home:['projects','journey','contact'],projects:['home','journey','contact'],journey:['home','projects','about'],about:['journey','skills'],skills:['about','contact'],contact:['home','projects','skills']};
export function findPath(from:string,to:string){
 if(!SPOTS[from]||!SPOTS[to]||from===to)return [];
 const previous:Record<string,string|null>={[from]:null};const queue=[from];
 for(let i=0;i<queue.length;i++){const node=queue[i];if(node===to)break;for(const next of EDGES[node]??[]){if(next in previous)continue;previous[next]=node;queue.push(next);}}
 if(!(to in previous))return [];
 const path:string[]=[];for(let node:string|null=to;node&&node!==from;node=previous[node])path.unshift(node);return path;
}
