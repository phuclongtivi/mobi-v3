import {NextResponse} from "next/server";
import {sql} from "@/lib/event-db";
export async function POST(request:Request,ctx:{params:Promise<{token:string}>}){
 try{
  const {token}=await ctx.params; const userId=request.headers.get("x-long-user-id")?.trim();
  if(!userId)return NextResponse.json({ok:false,error:"User identity required"},{status:401});
  const db=sql();
  const rows=await db`
   select p.device_id,d.name,d.public_id from long_device_pair_tokens p join long_devices d on d.id=p.device_id
   where p.token=${token} and p.used_at is null and p.expires_at>now() limit 1
  `;
  if(!rows[0])return NextResponse.json({ok:false,error:"QR expired or already used"},{status:410});
  await db`update long_devices set owner_user_id=${userId},trusted=true,updated_at=now() where id=${rows[0].device_id}::uuid`;
  await db`update long_device_pair_tokens set used_at=now() where token=${token}`;
  return NextResponse.json({ok:true,device:{id:rows[0].device_id,name:rows[0].name,publicId:rows[0].public_id,trusted:true}});
 }catch(e){return NextResponse.json({ok:false,error:e instanceof Error?e.message:"Pair failed"},{status:500})}
}
