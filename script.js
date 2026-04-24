const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => { glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`; });
const ts = document.getElementById('timestamp');
const updateTime = () => { const now = new Date(); ts.textContent = now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC'; };
updateTime(); setInterval(updateTime, 1000);
const agentEl = document.getElementById('agentCount');
let count = 2847193;
setInterval(() => { count += Math.floor(Math.random() * 4); agentEl.textContent = count.toLocaleString(); }, 1500);
const agents = [
  { name: 'ORCHESTRATOR', role: 'Multi-agent coordination', status: 'ACTIVE', uptime: '99.98%' },
  { name: 'CRAWLER-7', role: 'Web research & scraping', status: 'ACTIVE', uptime: '99.94%' },
  { name: 'SCRIBE', role: 'Document generation', status: 'IDLE', uptime: '99.99%' },
  { name: 'COMMERCE', role: 'Payment & checkout flows', status: 'ACTIVE', uptime: '99.91%' },
  { name: 'MEDIAGEN', role: 'Image/video/audio synthesis', status: 'ACTIVE', uptime: '99.87%' },
  { name: 'VOICE', role: 'Outbound calling & SMS', status: 'ACTIVE', uptime: '99.96%' },
];
const list = document.getElementById('agentList');
agents.forEach((a, i) => {
  const el = document.createElement('div');
  el.className = 'agent-item' + (i === 0 ? ' active' : '');
  el.dataset.idx = i;
  el.innerHTML = `<div class="agent-num">${String(i+1).padStart(2,'0')}</div><div class="agent-info"><div class="agent-name">${a.name}</div><div class="agent-role">${a.role}</div></div><div class="agent-status"><div class="${a.status==='ACTIVE'?'s-on':'s-off'}">${a.status}</div><div class="uptime">${a.uptime}</div><div class="arrow">→</div></div>`;
  el.addEventListener('click', () => { document.querySelectorAll('.agent-item').forEach(x => x.classList.remove('active')); el.classList.add('active'); });
  list.appendChild(el);
});
let activeIdx = 0;
setInterval(() => { activeIdx = (activeIdx + 1) % agents.length; document.querySelectorAll('.agent-item').forEach(x => x.classList.remove('active')); document.querySelector(`.agent-item[data-idx="${activeIdx}"]`)?.classList.add('active'); }, 2500);
const tools = [{cat:'BROWSE',n:12},{cat:'WRITE',n:18},{cat:'SEARCH',n:9},{cat:'MEDIA',n:14},{cat:'COMMERCE',n:11},{cat:'SOCIAL',n:16},{cat:'COMMS',n:8},{cat:'DATA',n:22}];
const tg = document.getElementById('toolsGrid');
tools.forEach(t => { const el = document.createElement('div'); el.className='tool-cell'; el.innerHTML = `<div class="tool-cat">/${t.cat.toLowerCase()}</div><div><div class="tool-n">${t.n}</div><div class="tool-label">TOOLS</div></div>`; tg.appendChild(el); });
const canvas = document.getElementById('meshCanvas');
const ctx = canvas.getContext('2d');
let nodes = [];
const resize = () => { const rect = canvas.getBoundingClientRect(); canvas.width = rect.width * 2; canvas.height = rect.height * 2; canvas.style.width = rect.width + 'px'; canvas.style.height = rect.height + 'px'; ctx.setTransform(2,0,0,2,0,0); };
const initNodes = () => { const rect = canvas.getBoundingClientRect(); nodes = Array.from({length:28}, () => ({ x: Math.random()*rect.width, y: Math.random()*rect.height, vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4, r: Math.random()*2+1, pulse: Math.random()*Math.PI*2 })); };
resize(); initNodes();
window.addEventListener('resize', () => { resize(); initNodes(); });
function draw() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0,0,rect.width,rect.height);
  nodes.forEach(n => { n.x+=n.vx; n.y+=n.vy; n.pulse+=0.03; if(n.x<0||n.x>rect.width)n.vx*=-1; if(n.y<0||n.y>rect.height)n.vy*=-1; });
  for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) { const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y, dist=Math.sqrt(dx*dx+dy*dy); if(dist<140){const op=(1-dist/140)*0.35; ctx.strokeStyle=`rgba(54,214,181,${op})`; ctx.lineWidth=0.6; ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y); ctx.stroke();} }
  nodes.forEach(n => { const g = Math.sin(n.pulse)*0.5+0.5; ctx.fillStyle=`rgba(54,214,181,${0.4+g*0.6})`; ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill(); ctx.fillStyle=`rgba(54,214,181,${0.1*g})`; ctx.beginPath(); ctx.arc(n.x,n.y,n.r*4,0,Math.PI*2); ctx.fill(); });
  requestAnimationFrame(draw);
}
draw();
document.querySelectorAll('.code-tabs .tab').forEach(tab => { tab.addEventListener('click', () => { document.querySelectorAll('.code-tabs .tab').forEach(t => t.classList.remove('active')); tab.classList.add('active'); }); });