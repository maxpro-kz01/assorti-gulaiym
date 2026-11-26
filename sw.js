const C='assorti-v2';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./icon-192.png'])).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
function net(r,ms){return new Promise((ok,no)=>{const t=setTimeout(()=>no(new Error('timeout')),ms);fetch(r).then(res=>{clearTimeout(t);ok(res)},err=>{clearTimeout(t);no(err)})})}
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  const nav=r.mode==='navigate';
  e.respondWith(net(r,nav?6000:15000).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{})}return res}).catch(()=>caches.match(r).then(m=>m||(nav?caches.match('./'):null)).then(m=>m||fetch(r))));
});
