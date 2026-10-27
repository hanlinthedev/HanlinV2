import { ImageResponse } from 'next/og';
export function ogCard(name:string,title:string,subtitle:string){return new ImageResponse(
 <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#f1ecdf',color:'#293630',padding:'60px 70px',fontFamily:'sans-serif',border:'16px solid #e5dece'}}>
  <div style={{display:'flex',justifyContent:'space-between',fontSize:24,color:'#385c91'}}><span>{name}</span><span>SYSTEMS ATELIER / PERSONAL ATLAS</span></div>
  <div style={{display:'flex',flexDirection:'column'}}><div style={{display:'flex',fontSize:title.length>65?48:68,lineHeight:1.12,letterSpacing:'-2px',maxWidth:1030}}>{title}</div><div style={{display:'flex',fontSize:27,lineHeight:1.5,color:'#51594f',marginTop:25,maxWidth:970}}>{subtitle}</div></div>
  <div style={{display:'flex',justifyContent:'space-between',borderTop:'2px solid #d0c9b8',paddingTop:22,fontSize:22}}><span>hanlinaung.dev</span><span style={{color:'#385c91'}}>ENGINEERING, AS A CRAFT.</span></div>
 </div>,{width:1200,height:630});}
