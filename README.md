# Bazzecole

Piccoli giochi e sciocchezze da fare in compagnia o da condividere. Sito statico, nessuna build.

## Struttura

```
index.html          home con tutti i giochi
impostore/          L'Impostore (gioco della parola segreta, passa il telefono)
404.html            pagina non trovata
favicon.svg
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

## Prossimi giochi

- Trova una stanza a Bologna (simulatore satirico)
- Quanto ti hanno rubato i treni (calcolatore)
- Quanti caffè hai bevuto (calcolatore)
