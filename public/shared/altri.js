/* Bazzecole - blocco "Altri giochi" in fondo a ogni gioco.
   Collega le pagine tra loro: chi finisce un gioco ne trova un altro, e i motori di ricerca trovano tutte le pagine. */
(function(){
  var GAMES=[
    ['/cinquina/','Cinquina','La parola del giorno'],
    ['/tombola/','Tombola','Tabellone e cartelle sul telefono'],
    ['/impostore/','L\'Impostore','Chi sta bluffando?'],
    ['/parola/','Parola in fronte','Il telefono sulla fronte'],
    ['/scuse/','Generatore di scuse','Pronte da mandare'],
    ['/stanza/','Trova una stanza a Bologna','Sopravvivi agli affitti'],
    ['/piatti/','Chi lava i piatti?','La ruota dei turni'],
    ['/treni/','Quanto ti hanno rubato i treni','Il tempo perso in banchina'],
    ['/caffe/','Quanti caffè hai bevuto','Lo scontrino della vita']
  ];
  var here=location.pathname.replace(/index\.html$/,'');
  var list=GAMES.filter(function(g){return g[0]!==here});
  var footer=document.querySelector('footer');
  if(!footer||!list.length)return;
  var s=document.createElement('style');
  s.textContent='.bz-more{margin:34px 0 0;padding-top:20px;border-top:1px solid color-mix(in srgb,currentColor 18%,transparent)}'+
    '.bz-more h2{font:400 22px/1.2 "Alfa Slab One",serif;margin:0 0 12px}'+
    '.bz-more ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,210px),1fr));gap:8px}'+
    '.bz-more a{display:block;text-decoration:none;color:inherit;border:2px solid color-mix(in srgb,currentColor 22%,transparent);border-radius:14px;padding:10px 14px;min-height:44px;transition:transform .15s ease-out}'+
    '.bz-more a:hover{transform:translateY(-2px)}'+
    '.bz-more b{display:block;font-size:16px}.bz-more span{font-size:14px;opacity:.75}';
  document.head.appendChild(s);
  var nav=document.createElement('nav');nav.className='bz-more';nav.setAttribute('aria-label','Altri giochi');
  nav.innerHTML='<h2>Altri giochi</h2><ul>'+list.map(function(g){return '<li><a href="'+g[0]+'"><b>'+g[1]+'</b><span>'+g[2]+'</span></a></li>'}).join('')+'</ul>';
  footer.parentNode.insertBefore(nav,footer);
})();
