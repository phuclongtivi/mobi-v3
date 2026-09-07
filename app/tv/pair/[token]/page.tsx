"use client";
import {useParams,useRouter} from "next/navigation";
import {useState} from "react";
export default function PairTV(){
 const {token}=useParams<{token:string}>();const r=useRouter();const[msg,setMsg]=useState("Sẵn sàng kết nối Long TV");
 function uid(){let u=localStorage.getItem("long-user-id");if(!u){u=crypto.randomUUID();localStorage.setItem("long-user-id",u)}return u}
 async function pair(){setMsg("Đang kết nối…");const d=await fetch(`/api/device/pair/${token}`,{method:"POST",headers:{"x-long-user-id":uid()}}).then(x=>x.json());if(d.ok){localStorage.setItem("long-last-tv",JSON.stringify(d.device));setMsg(`Đã kết nối ${d.device.name}`);setTimeout(()=>r.push("/studio"),700)}else setMsg(d.error||"Không kết nối được")}
 return <main className="page"><section className="hero"><h1>Kết nối Long TV</h1><p>QR động • Trusted Device • một chạm cho lần sau</p></section><section className="panel" style={{marginTop:12}}><div className="notice">{msg}</div><button className="action" onClick={pair}>Kết nối TV</button></section></main>
}