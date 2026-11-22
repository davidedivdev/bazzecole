/* Bazzecole - categorie personalizzate condivise tra i giochi di parole.
   Le categorie restano nel browser (localStorage, chiave "bz-mazzi").
   Il link di condivisione porta le parole nel frammento dell'indirizzo (#mazzo=...),
   che il browser non invia al server. */
(function(){
  var KEY='bz-mazzi';
  function load(){
    try{var v=JSON.parse(localStorage.getItem(KEY)||'[]');
      return Array.isArray(v)?v.filter(function(d){return d&&d.id&&d.name&&Array.isArray(d.words)&&d.words.length}):[]}
    catch(e){return[]}
  }
  function save(list){try{localStorage.setItem(KEY,JSON.stringify(list))}catch(e){}}
  function parse(text){
    var seen={},out=[];
    String(text).split(/[\n,;]+/).forEach(function(w){
      w=w.replace(/\s+/g,' ').trim().slice(0,40);
      var k=w.toLowerCase();
      if(w&&!seen[k]&&out.length<300){seen[k]=1;out.push(w)}
    });
    return out;
  }
  function enc(o){return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
  function dec(s){s=s.replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';return JSON.parse(decodeURIComponent(escape(atob(s))))}
  function uid(){return 'm'+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
  function get(id){return load().filter(function(d){return d.id===id})[0]||null}
  function upsert(deck){var list=load(),i=-1;list.forEach(function(d,k){if(d.id===deck.id)i=k});if(i>=0)list[i]=deck;else list.push(deck);save(list);return deck}
  function remove(id){save(load().filter(function(d){return d.id!==id}))}
  function importHash(){
    var m=location.hash.match(/^#mazzo=([A-Za-z0-9_-]+)$/);
    if(!m)return null;
    try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}
    try{
      var o=dec(m[1]),name=String(o.n||'').replace(/\s+/g,' ').trim().slice(0,40),words=parse((o.w||[]).join('\n'));
      if(!name||!words.length)return null;
      var same=load().filter(function(d){return d.name===name&&d.words.join('|')===words.join('|')})[0];
      return same||upsert({id:uid(),name:name,words:words});
    }catch(e){return null}
  }
  function shareURL(deck){return location.origin+location.pathname+'#mazzo='+enc({n:deck.name,w:deck.words})}

  var styled=false;
  function css(){
    if(styled)return;styled=true;
    var s=document.createElement('style');
    s.textContent=
'.mz-back{position:fixed;inset:0;z-index:50;background:rgba(15,10,10,.55);display:grid;place-items:center;padding:16px;opacity:0;transition:opacity .2s ease-out}'+
'.mz-back.on{opacity:1}'+
'.mz-box{width:min(100%,520px);max-height:92vh;overflow:auto;background:var(--mz-bg,#FFFDF8);color:var(--mz-ink,#222);border-radius:22px;padding:22px;display:grid;gap:14px;box-shadow:0 24px 60px rgba(0,0,0,.4);transform:translateY(16px);transition:transform .25s ease-out;font:17px/1.5 Figtree,system-ui,sans-serif}'+
'.mz-back.on .mz-box{transform:none}'+
'.mz-box h2{margin:0;font:400 26px/1.15 "Alfa Slab One",serif}'+
'.mz-box label{display:grid;gap:6px;font-weight:700}'+
'.mz-box label small{font-weight:400;color:var(--mz-soft,#666);font-size:15px}'+
'.mz-box input,.mz-box textarea{font:17px/1.45 Figtree,system-ui,sans-serif;padding:12px 14px;border-radius:12px;border:2px solid var(--mz-line,#ddd);background:#fff;color:#222;width:100%}'+
'.mz-box textarea{min-height:190px;resize:vertical}'+
'.mz-box input:focus,.mz-box textarea:focus{outline:none;border-color:var(--mz-acc,#c33)}'+
'.mz-count{margin:0;font-weight:700;color:var(--mz-soft,#666)}'+
'.mz-err{margin:0;min-height:1.4em;color:var(--mz-acc,#c33);font-weight:700}'+
'.mz-row{display:flex;flex-wrap:wrap;gap:10px}'+
'.mz-btn{flex:1 1 140px;border:0;border-radius:14px;background:var(--mz-acc,#c33);color:var(--mz-acc-ink,#fff);font:800 17px Figtree,system-ui,sans-serif;padding:14px;min-height:52px;cursor:pointer;transition:transform .15s ease-out}'+
'.mz-btn:active{transform:scale(.98)}'+
'.mz-alt{background:transparent;color:var(--mz-ink,#222);box-shadow:inset 0 0 0 2px var(--mz-line,#ccc)}'+
'.mz-ideas{display:flex;flex-wrap:wrap;gap:6px}'+
'.mz-ideas button{border:1px solid var(--mz-line,#ccc);background:transparent;color:var(--mz-ink,#222);border-radius:999px;padding:6px 12px;font:600 14px Figtree,sans-serif;cursor:pointer;min-height:36px}'+
'.mz-note{margin:0;font-size:14px;color:var(--mz-soft,#666)}'+
'.mz-box button:focus-visible,.mz-box input:focus-visible,.mz-box textarea:focus-visible{outline:3px solid var(--mz-acc,#c33);outline-offset:2px}'+
'@media (prefers-reduced-motion:reduce){.mz-back,.mz-box{transition:none}}';
    document.head.appendChild(s);
  }
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  /* opts: {deck (per modificare), min (parole minime), onChange(deckOppureNull)} */
  function editor(opts){
    opts=opts||{};css();
    var deck=opts.deck||null,min=opts.min||3,last=document.activeElement;
    var back=document.createElement('div');back.className='mz-back';
    back.innerHTML='<form class="mz-box" role="dialog" aria-modal="true" aria-labelledby="mz-t" novalidate>'+
      '<h2 id="mz-t">'+(deck?'Modifica categoria':'Crea la tua categoria')+'</h2>'+
      '<label>Nome<input name="n" maxlength="40" autocomplete="off" placeholder="Es. I parenti, Il nostro gruppo, Prof di Ingegneria" value="'+(deck?esc(deck.name):'')+'"></label>'+
      (deck?'':'<div class="mz-ideas" aria-label="Idee"><button type="button" data-i="I parenti">I parenti</button><button type="button" data-i="Il nostro gruppo">Il nostro gruppo</button><button type="button" data-i="Battute di casa">Battute di casa</button><button type="button" data-i="Prof e esami">Prof e esami</button></div>')+
      '<label>Parole <small>Una per riga, oppure separate da una virgola. Almeno '+min+'.</small><textarea name="w" spellcheck="false" placeholder="Zia Carla\nIl cugino che vive a Londra\nLa lasagna della nonna\nIl cane che abbaia ai piccioni">'+(deck?esc(deck.words.join('\n')):'')+'</textarea></label>'+
      '<p class="mz-count" aria-live="polite"></p><p class="mz-err" role="alert"></p>'+
      '<div class="mz-row"><button type="submit" class="mz-btn">Salva</button><button type="button" class="mz-btn mz-alt" data-x="close">Annulla</button></div>'+
      (deck?'<div class="mz-row"><button type="button" class="mz-btn mz-alt" data-x="share">Copia il link per condividerla</button><button type="button" class="mz-btn mz-alt" data-x="del">Elimina</button></div>':'')+
      '<p class="mz-note">Le categorie restano solo su questo telefono. Se condividi il link, le parole viaggiano dentro il link stesso: chi lo apre se le ritrova nel gioco.</p>'+
      '</form>';
    document.body.appendChild(back);
    requestAnimationFrame(function(){back.classList.add('on')});
    var f=back.querySelector('form'),n=f.elements.n,w=f.elements.w,cnt=f.querySelector('.mz-count'),err=f.querySelector('.mz-err'),delArmed=false;
    function count(){var k=parse(w.value).length;cnt.textContent=k===1?'1 parola':k+' parole'}
    count();w.addEventListener('input',count);
    setTimeout(function(){(deck?w:n).focus()},50);
    function close(){back.classList.remove('on');document.removeEventListener('keydown',key);setTimeout(function(){back.remove();if(last&&last.focus)last.focus()},200)}
    function key(e){if(e.key==='Escape')close()}
    document.addEventListener('keydown',key);
    back.addEventListener('mousedown',function(e){if(e.target===back)close()});
    f.addEventListener('click',function(e){
      var b=e.target.closest('button');if(!b)return;
      if(b.dataset.i){n.value=b.dataset.i;w.focus();return}
      if(b.dataset.x==='close')close();
      if(b.dataset.x==='share'){
        var url=shareURL(deck);
        (navigator.clipboard?navigator.clipboard.writeText(url):Promise.reject()).then(function(){err.textContent='Link copiato. Mandalo a chi deve giocare con queste parole.'},function(){err.textContent=url});
      }
      if(b.dataset.x==='del'){
        if(!delArmed){delArmed=true;b.textContent='Sicuro? Tocca ancora per eliminare';return}
        remove(deck.id);close();opts.onChange&&opts.onChange(null);
      }
    });
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var name=n.value.replace(/\s+/g,' ').trim(),words=parse(w.value);
      if(!name){err.textContent='Dai un nome alla categoria.';n.focus();return}
      if(words.length<min){err.textContent='Servono almeno '+min+' parole, ne hai scritte '+words.length+'.';w.focus();return}
      var d=upsert({id:deck?deck.id:uid(),name:name,words:words});
      close();opts.onChange&&opts.onChange(d);
    });
  }
  window.BzMazzi={load:load,get:get,parse:parse,upsert:upsert,remove:remove,importHash:importHash,shareURL:shareURL,editor:editor};
})();
