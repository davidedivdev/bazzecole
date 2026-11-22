# Bazzecole

Piccoli giochi e sciocchezze da fare in compagnia o da condividere. Sito statico, nessuna build.

## Struttura

```
index.html          home con tutti i giochi
tombola/            Tombola (tabellone, cartelle con codice, montepremi)
parola/             Parola in fronte (telefono sulla fronte, inclinazione)
shared/mazzi.js     categorie personalizzate comuni ai giochi di parole
impostore/          L'Impostore (gioco della parola segreta, passa il telefono)
stanza/             Trova una stanza a Bologna (gioco satirico)
treni/              Quanto ti hanno rubato i treni (calcolatore)
caffe/              Quanti caffè hai bevuto (calcolatore)
404.html            pagina non trovata
favicon.svg
fonts/              font ospitati sul sito (OFL), niente Google Fonts
privacy/            informativa privacy e note legali
netlify.toml        configurazione Netlify (publish = ".")
```

Ogni gioco vive nella sua cartella con un `index.html` autonomo (HTML, CSS e JS nello stesso file).

## Provare in locale

```
python3 -m http.server 8000
```

poi apri http://localhost:8000

## Pubblicazione

Il repository è collegato a Netlify: ogni push su `main` va online da solo.

## Linee guida grafiche

- Colori 60-30-10: un colore dominante, uno secondario, un solo accento per le azioni.
- Niente nero o bianco puri: inchiostri scuri caldi su carta leggermente avorio.
- Al massimo due famiglie di font per gioco (più il logo Bazzecole).
- Animazioni da 150 a 300 ms, ease-out, solo su transform e opacity; disattivate con "riduci movimento".
