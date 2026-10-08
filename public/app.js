let members=[];
const MIN_WEEK=1000;
const fmt=n=>Number(n||0).toLocaleString("pt-BR");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
function role(r){return ({president:"Presidente",vicePresident:"Vice-presidente",senior:"Veterano",member:"Membro"})[r]||r||"Membro"}
function render(){
 const q=document.querySelector("#q").value.toLowerCase();
 const list=[...members].sort((a,b)=>b.trophies-a.trophies).filter(x=>x.name.toLowerCase().includes(q));
 document.querySelector("#rows").innerHTML=list.map((m,i)=>`<tr><td>#${i+1}</td><td>${esc(m.name)}</td><td>${role(m.role)}</td><td>${fmt(m.trophies)} 🏆</td><td class="up">—</td><td><span class="status">Dados atuais</span></td></tr>`).join("");
}
async function load(){
 try{
  const [c,m]=await Promise.all([fetch("/api/club"),fetch("/api/club/members")]);
  if(!c.ok||!m.ok) throw new Error("Servidor/API não respondeu. Confira a chave da API.");
  const club=await c.json(), data=await m.json();
  members=data.items||data;
  document.querySelector("#name").textContent=club.name;
  document.querySelector("#desc").textContent=club.description||"Clube Brawl Stars";
  document.querySelector("#clubTrophies").textContent=fmt(club.trophies);
  document.querySelector("#count").textContent=members.length;
  const total=members.reduce((s,m)=>s+m.trophies,0);
  document.querySelector("#avg").textContent=fmt(members.length?Math.round(total/members.length):0);
  document.querySelector("#max").textContent=fmt(Math.max(...members.map(m=>m.trophies),0));
  document.querySelector("#danger").textContent="Histórico pendente";
  document.querySelector("#updated").textContent="Atualizado agora";
  render();
 }catch(e){alert(e.message)}
}
load();