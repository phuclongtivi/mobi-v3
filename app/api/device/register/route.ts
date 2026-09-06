import {NextResponse} from "next/server";
import {sql} from "@/lib/event-db";
import {randomToken,sha256} from "@/lib/device-security";
export async function POST(request:Request){
 try{
  const body=await request.json(); const publicId=String(body.publicId||crypto.randomUUID()); const secret=String(body.deviceSecret||randomToken());
  const hash=await sha256(secret); const id=crypto.randomUUID(); const db=sql();
  const rows=await db`
   insert into long_devices(id,device_type,name,public_id,device_secret_hash,capabilities,last_seen_at)
   values(${id}::uuid,'tv',${String(body.name||"Long TV")},${publicId},${hash},${JSON.stringify(body.capabilities||{})}::jsonb,now())
   on conflict(public_id) do update set capabilities=excluded.capabilities,last_seen_at=now(),updated_at=now()
   returning id,public_id,name,trusted
  `;
  return NextResponse.json({ok:true,device:rows[0],deviceSecret:secret});
 }catch(e){return NextResponse.json({ok:false,error:e instanceof Error?e.message:"Register failed"},{status:500})}
}
