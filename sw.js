// GPL Máquinas — guarda a página do tratorista no celular para abrir sem internet
var C='gpl-trat-v1';
self.addEventListener('install',function(e){ e.waitUntil(caches.open(C).then(function(c){ return c.addAll(['tratorista.html']); })); self.skipWaiting(); });
self.addEventListener('activate',function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch',function(e){
  var u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin||u.pathname.indexOf('tratorista.html')<0) return;
  e.respondWith(fetch(e.request).then(function(r){ var cp=r.clone(); caches.open(C).then(function(c){ c.put('tratorista.html',cp); }); return r; })
    .catch(function(){ return caches.match('tratorista.html'); }));
});
