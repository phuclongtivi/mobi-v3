import {NextResponse} from "next/server";
import {sql} from "@/lib/event-db";
import {randomToken,sha256} from "@/lib/device-security";
export async function POST(request:Request){
 try{
  const body=await request.json(); const publicId=String(body.publicId||""); const secret=String(body.deviceSecret||"");
  if(!publicId||!secret)return NextResponse.json({ok:false,error:"Device credentials required"},{status:400});
  const db=sql(); const hash=await sha256(secret);
  const rows=await db`select id,name from long_devices where public_id=${publicId} and device_secret_hash=${hash} limit 1`;
  if(!rows[0])return NextResponse.json({ok:false,error:"Device authentication failed"},{status:401});
  const token=randomToken().slice(0,48);
  await db`insert into long_device_pair_tokens(token,device_id,expires_at) values(${token},${rows[0].id}::uuid,now()+interval '5 minutes')`;
  await db`update long_devices set last_seen_at=now() where id=${rows[0].id}::uuid`;
  return NextResponse.json({ok:true,token,pairUrl:`/tv/pair/${token}`,expiresIn:300,deviceName:rows[0].name});
 }catch(e){return NextResponse.json({ok:false,error:e instanceof Error?e.message:"Pair token failed"},{status:500})}
}
