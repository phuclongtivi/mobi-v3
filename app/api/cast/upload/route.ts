import {put} from "@vercel/blob";
import {NextResponse} from "next/server";
import {sql} from "@/lib/event-db";
const MAX=1024*1024*1024; // 1GB RC safety cap; production policy can tune this.
export async function POST(request:Request){
 try{
  const userId=request.headers.get("x-long-user-id")?.trim();
  if(!userId)return NextResponse.json({ok:false,error:"User identity required"},{status:401});
  const form=await request.formData(); const file=form.get("file");
  if(!(file instanceof File))return NextResponse.json({ok:false,error:"Video required"},{status:400});
  if(!file.type.startsWith("video/"))return NextResponse.json({ok:false,error:"Video files only"},{status:415});
  if(file.size>MAX)return NextResponse.json({ok:false,error:"Video exceeds temporary cast limit"},{status:413});
  const safe=file.name.replace(/[^A-Za-z0-9._-]/g,"_").slice(-140);
  const blob=await put(`cast/${userId}/${crypto.randomUUID()}-${safe}`,file,{access:"public",addRandomSuffix:false});
  const id=crypto.randomUUID(),db=sql();
  await db`insert into long_cast_assets(id,owner_user_id,blob_url,filename,content_type,size_bytes,expires_at)
           values(${id}::uuid,${userId},${blob.url},${file.name},${file.type},${file.size},now()+interval '6 hours')`;
  return NextResponse.json({ok:true,id,url:blob.url,expiresIn:21600});
 }catch(e){return NextResponse.json({ok:false,error:e instanceof Error?e.message:"Cast upload failed"},{status:500})}
}
