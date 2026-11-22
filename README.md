# Bazzecole

Piccoli giochi e sciocchezze da fare in compagnia o da condividere. Sito statico, nessuna build: tutto ciò che va online sta nella cartella `public/`.

## Struttura

```
index.html          home con tutti i giochi
cinquina/           Cinquina, la parola del giorno (dizionario MIT an-array-of-italian-words)
gruppo/             Non ho mai, Chi è più probabile che, Obbligo o verità (con modalità piccante 18+ su consenso)
quiz/               Che … sei? (portico di Bologna, formato di pasta, coinquilino)
tavolo/             Kit da tavolo (dadi, gira la bottiglia, testa o croce, chi inizia)
politica/           Test politico neutrale su due assi (nessun partito, tutto sul dispositivo)
scuse/              Generatore di scuse
shared/altri.js     blocco "Altri giochi" in fondo a ogni pagina
piatti/             Chi lava i piatti? (ruota dei turni)
tombola/            Tombola (tabellone, cartelle con codice, montepremi)
parola/             Parola in fronte (telefono sulla fronte, inclinazione)
shared/mazzi.js     categorie personalizzate comuni ai giochi di parole
impostore/          L'Impostore (gioco della parola segreta, passa il telefono)
stanza/             Trova una stanza a Bologna (gioco satirico)
treni/              Quanto ti hanno rubato i treni (calcolatore)
caffe/              Quanti caffè hai bevuto (calcolatore)
404.html            pagina non trovata
og/                 immagini di anteprima per le condivisioni (1200x630)
sitemap.xml         mappa del sito per i motori di ricerca
robots.txt          indica ai motori di ricerca la mappa del sito
favicon.svg
fonts/              font ospitati sul sito (OFL), niente Google Fonts
privacy/            informativa privacy e note legali
```

Ogni gioco vive nella sua cartella con un `index.html` autonomo (HTML, CSS e JS nello stesso file).

## Provare in locale

```
cd public && python3 -m http.server 8000
```

poi apri http://localhost:8000

## Pubblicazione

Il sito è pubblicato su Cloudflare Workers (file statici della cartella `public/`, configurazione in `wrangler.jsonc`): ogni push su `main` va online da solo.
Indirizzo: https://bazzecole.davide200410.workers.dev

Per non sprecare pubblicazioni, meglio raccogliere le modifiche e fare un solo push alla volta.

## Linee guida grafiche

- Colori 60-30-10: un colore dominante, uno secondario, un solo accento per le azioni.
- Niente nero o bianco puri: inchiostri scuri caldi su carta leggermente avorio.
- Al massimo due famiglie di font per gioco (più il logo Bazzecole).
- Animazioni da 150 a 300 ms, ease-out, solo su transform e opacity; disattivate con "riduci movimento".
