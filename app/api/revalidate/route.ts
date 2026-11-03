import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
export async function POST(request:Request){
 const expected=process.env.REVALIDATE_SECRET;if(!expected)return Response.json({error:'Revalidation is not configured.'},{status:503});
 const incoming=request.headers.get('authorization')??'';const target=`Bearer ${expected}`;
 if(Buffer.byteLength(incoming)!==Buffer.byteLength(target)||!timingSafeEqual(Buffer.from(incoming),Buffer.from(target)))return Response.json({error:'Unauthorized'},{status:401});
 for(const tag of ['content','settings','navigation','projects','now','experience','skills','posts','copy','world'])revalidateTag(tag,{expire:0});
 return Response.json({revalidated:true});
}
