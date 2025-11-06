<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Tealbase

[Tealbase](https://tealbase.com) je odprtokodna alternativa Firebase. Funkcije Firebase gradimo z odprtokodnimi orodji za podjetja.

- [x] Gostovana podatkovna baza Postgres. [Dokumenti](https://tealbase.com/docs/guides/database)
- [x] Avtentikacija in avtorizacija. [Dokumenti](https://tealbase.com/docs/guides/auth)
- [x] Samodejno generirani API-ji.
  - [x] REST. [Dokumenti](https://tealbase.com/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Dokumenti](https://tealbase.com/docs/guides/api#graphql-api-overview)
  - [x] Naročnine v realnem času. [Dokumenti](https://tealbase.com/docs/guides/api#realtime-api-overview)
- [x] Funkcije.
  - [x] Funkcije podatkovne zbirke. [Dokumenti](https://tealbase.com/docs/guides/database/functions)
  - [x] Funkcije robov [Dokumenti](https://tealbase.com/docs/guides/functions)
- [x] Shranjevanje datotek. [Dokumenti](https://tealbase.com/docs/guides/storage)
- [x] Nadzorna plošča

![Tealbase Dashboard](https://raw.githubusercontent.com/tealbase/tealbase/master/apps/www/public/images/github/tealbase-dashboard.png)

## Dokumentacija

Za celotno dokumentacijo obiščite [tealbase.com/docs](https://tealbase.com/docs)

Če si želite ogledati, kako prispevati, obiščite [Getting Started](../DEVELOPERS.md)

## Skupnost in podpora

- [Forum skupnosti](https://github.com/tealbase/tealbase/discussions). Najprimernejši za: pomoč pri gradnji, razpravo o najboljših praksah zbirke podatkov.
- [GitHub Issues](https://github.com/tealbase/tealbase/issues). Najprimernejši za: hrošče in napake, na katere naletite pri uporabi zbirke Tealbase.
- [E-poštna podpora](https://tealbase.com/docs/support#business-support). Najboljše za: težave s podatkovno zbirko ali infrastrukturo.
- [Discord](https://discord.tealbase.com). Najboljši za: izmenjavo aplikacij in druženje s skupnostjo.

## Status

- [x] Alfa: Testiramo bazo Tealbase z zaprtim naborom strank
- [x] Javna alfa: [tealbase.com/dashboard](https://tealbase.com/dashboard). Vendar nas ne obremenjujte, saj je še nekaj pomanjkljivosti
- [x] Javna beta različica: Dovolj stabilna za večino primerov uporabe, ki niso povezani s podjetji
- [ ] Javna: Splošna razpoložljivost [[status](https://tealbase.com/docs/guides/getting-started/features#feature-status)]

Trenutno smo v javni beta različici. Spremljajte "releases" tega repozitorija, da boste obveščeni o večjih posodobitvah.

<kbd><img src="https://raw.githubusercontent.com/tealbase/tealbase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Kako deluje

Supabaza je kombinacija odprtokodnih orodij. Funkcije Firebase gradimo z odprtokodnimi izdelki za podjetja. Če obstajajo orodja in skupnosti z odprto licenco MIT, Apache 2 ali enakovredno odprto licenco, bomo to orodje uporabljali in podpirali. Če orodje ne obstaja, ga bomo izdelali in odprli sami. Podatkovna baza Tealbase ni preslikava Firebase v razmerju 1:1. Naš cilj je razvijalcem z odprtokodnimi orodji omogočiti izkušnjo, podobno izkušnji razvijalca v Firebase.

**Arhitektura**

Tealbase je [gostovana platforma](https://tealbase.com/dashboard). Prijavite se lahko in začnete uporabljati bazo Tealbase, ne da bi kar koli namestili.
Lahko tudi [gostujete sami](https://tealbase.com/docs/guides/hosting/overview) in [razvijate lokalno](https://tealbase.com/docs/guides/local-development).

![Arhitektura](https://github.com/tealbase/tealbase/blob/master/apps/docs/public/img/tealbase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) je objektno-relacijski sistem podatkovne zbirke z več kot 30-letnim aktivnim razvojem, ki si je pridobil velik ugled zaradi zanesljivosti, robustnosti funkcij in zmogljivosti.
- [Realtime](https://github.com/tealbase/realtime) je strežnik Elixir, ki omogoča poslušanje vstavljanja, posodabljanja in brisanja podatkov PostgreSQL z uporabo spletnih vtičnic. Realtime poizveduje o spremembah v podatkovni zbirki Postgres, pretvori spremembe v JSON in jih nato prek spletnih vtičnikov posreduje pooblaščenim odjemalcem.
- [PostgREST](http://postgrest.org/) je spletni strežnik, ki vašo podatkovno zbirko PostgreSQL spremeni neposredno v API REST
- [pg_graphql](http://github.com/tealbase/pg_graphql/) je razširitev PostgreSQL, ki izpostavlja API GraphQL
- [Storage](https://github.com/tealbase/storage-api) zagotavlja vmesnik RESTful za upravljanje datotek, shranjenih v S3, z uporabo Postgresa za upravljanje dovoljenj.
- [postgres-meta](https://github.com/tealbase/postgres-meta) je vmesnik RESTful API za upravljanje vašega Postgresa, ki omogoča pridobivanje tabel, dodajanje vlog, izvajanje poizvedb itd.
- [GoTrue](https://github.com/netlify/gotrue) je API, ki temelji na SWT, za upravljanje uporabnikov in izdajanje žetonov SWT.
- [Kong](https://github.com/Kong/kong) je prehod API v oblaku.

#### Odjemalske knjižnice

Naš pristop k odjemalskim knjižnicam je modularen. Vsaka pod-knjižnica je samostojna implementacija za en sam zunanji sistem. To je eden od načinov, kako podpiramo obstoječa orodja.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Jezik</th>
    <th>Odjemalec</th>
    <th colspan="5">Odjemalci funkcij (v paketu z odjemalcem Tealbase)</th>
  </tr>
  
  <tr>
    <th></th>
    <th>Tealbase</th>
    <th><a href="https://github.com/postgrest/postgrest" target="_blank" rel="noopener noreferrer">PostgREST</a></th>
    <th><a href="https://github.com/tealbase/gotrue" target="_blank" rel="noopener noreferrer">GoTrue</a></th>
    <th><a href="https://github.com/tealbase/realtime" target="_blank" rel="noopener noreferrer">Realtime</a></th>
    <th><a href="https://github.com/tealbase/storage-api" target="_blank" rel="noopener noreferrer">Storage</a></th>
    <th>Functions</th>
  </tr>
  <!-- TEMPLATE FOR NEW ROW -->
  <!-- START ROW
  <tr>
    <td>lang</td>
    <td><a href="https://github.com/tealbase-community/tealbase-lang" target="_blank" rel="noopener noreferrer">tealbase-lang</a></td>
    <td><a href="https://github.com/tealbase-community/postgrest-lang" target="_blank" rel="noopener noreferrer">postgrest-lang</a></td>
    <td><a href="https://github.com/tealbase-community/gotrue-lang" target="_blank" rel="noopener noreferrer">gotrue-lang</a></td>
    <td><a href="https://github.com/tealbase-community/realtime-lang" target="_blank" rel="noopener noreferrer">realtime-lang</a></td>
    <td><a href="https://github.com/tealbase-community/storage-lang" target="_blank" rel="noopener noreferrer">storage-lang</a></td>
  </tr>
  END ROW -->
  
  <th colspan="7">⚡️ Uradni ⚡️</th>
  
  <tr>
    <td>JavaScript (TypeScript)</td>
    <td><a href="https://github.com/tealbase/tealbase-js" target="_blank" rel="noopener noreferrer">tealbase-js</a></td>
    <td><a href="https://github.com/tealbase/postgrest-js" target="_blank" rel="noopener noreferrer">postgrest-js</a></td>
    <td><a href="https://github.com/tealbase/gotrue-js" target="_blank" rel="noopener noreferrer">gotrue-js</a></td>
    <td><a href="https://github.com/tealbase/realtime-js" target="_blank" rel="noopener noreferrer">realtime-js</a></td>
    <td><a href="https://github.com/tealbase/storage-js" target="_blank" rel="noopener noreferrer">storage-js</a></td>
    <td><a href="https://github.com/tealbase/functions-js" target="_blank" rel="noopener noreferrer">functions-js</a></td>
  </tr>
    <tr>
    <td>Flutter</td>
    <td><a href="https://github.com/tealbase/tealbase-flutter" target="_blank" rel="noopener noreferrer">tealbase-flutter</a></td>
    <td><a href="https://github.com/tealbase/postgrest-dart" target="_blank" rel="noopener noreferrer">postgrest-dart</a></td>
    <td><a href="https://github.com/tealbase/gotrue-dart" target="_blank" rel="noopener noreferrer">gotrue-dart</a></td>
    <td><a href="https://github.com/tealbase/realtime-dart" target="_blank" rel="noopener noreferrer">realtime-dart</a></td>
    <td><a href="https://github.com/tealbase/storage-dart" target="_blank" rel="noopener noreferrer">storage-dart</a></td>
    <td><a href="https://github.com/tealbase/functions-dart" target="_blank" rel="noopener noreferrer">functions-dart</a></td>
  </tr>
  
  <th colspan="7">💚 Skupnost 💚</th>
  
  <tr>
    <td>C#</td>
    <td><a href="https://github.com/tealbase-community/tealbase-csharp" target="_blank" rel="noopener noreferrer">tealbase-csharp</a></td>
    <td><a href="https://github.com/tealbase-community/postgrest-csharp" target="_blank" rel="noopener noreferrer">postgrest-csharp</a></td>
    <td><a href="https://github.com/tealbase-community/gotrue-csharp" target="_blank" rel="noopener noreferrer">gotrue-csharp</a></td>
    <td><a href="https://github.com/tealbase-community/realtime-csharp" target="_blank" rel="noopener noreferrer">realtime-csharp</a></td>
    <td><a href="https://github.com/tealbase-community/storage-csharp" target="_blank" rel="noopener noreferrer">storage-csharp</a></td>
    <td><a href="https://github.com/tealbase-community/functions-csharp" target="_blank" rel="noopener noreferrer">functions-csharp</a></td>
  </tr>
  <tr>
    <td>Go</td>
    <td>-</td>
    <td><a href="https://github.com/tealbase-community/postgrest-go" target="_blank" rel="noopener noreferrer">postgrest-go</a></td>
    <td><a href="https://github.com/tealbase-community/gotrue-go" target="_blank" rel="noopener noreferrer">gotrue-go</a></td>
    <td>-</td>
    <td><a href="https://github.com/tealbase-community/storage-go" target="_blank" rel="noopener noreferrer">storage-go</a></td>
    <td><a href="https://github.com/tealbase-community/functions-go" target="_blank" rel="noopener noreferrer">functions-go</a></td>
  </tr>
  <tr>
    <td>Java</td>
    <td>-</td>
    <td>-</td>
    <td><a href="https://github.com/tealbase-community/gotrue-java" target="_blank" rel="noopener noreferrer">gotrue-java</a></td>
    <td>-</td>
    <td><a href="https://github.com/tealbase-community/storage-java" target="_blank" rel="noopener noreferrer">storage-java</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>Kotlin</td>
    <td><a href="https://github.com/tealbase-community/tealbase-kt" target="_blank" rel="noopener noreferrer">tealbase-kt</a></td>
    <td><a href="https://github.com/tealbase-community/tealbase-kt/tree/master/Postgrest" target="_blank" rel="noopener noreferrer">postgrest-kt</a></td>
    <td><a href="https://github.com/tealbase-community/tealbase-kt/tree/master/GoTrue" target="_blank" rel="noopener noreferrer">gotrue-kt</a></td>
    <td><a href="https://github.com/tealbase-community/tealbase-kt/tree/master/Realtime" target="_blank" rel="noopener noreferrer">realtime-kt</a></td>
    <td><a href="https://github.com/tealbase-community/tealbase-kt/tree/master/Storage" target="_blank" rel="noopener noreferrer">storage-kt</a></td>
    <td><a href="https://github.com/tealbase-community/tealbase-kt/tree/master/Functions" target="_blank" rel="noopener noreferrer">functions-kt</a></td>
  </tr>
  <tr>
    <td>Python</td>
    <td><a href="https://github.com/tealbase-community/tealbase-py" target="_blank" rel="noopener noreferrer">tealbase-py</a></td>
    <td><a href="https://github.com/tealbase-community/postgrest-py" target="_blank" rel="noopener noreferrer">postgrest-py</a></td>
    <td><a href="https://github.com/tealbase-community/gotrue-py" target="_blank" rel="noopener noreferrer">gotrue-py</a></td>
    <td><a href="https://github.com/tealbase-community/realtime-py" target="_blank" rel="noopener noreferrer">realtime-py</a></td>
    <td><a href="https://github.com/tealbase-community/storage-py" target="_blank" rel="noopener noreferrer">storage-py</a></td>
    <td><a href="https://github.com/tealbase-community/functions-py" target="_blank" rel="noopener noreferrer">functions-py</a></td>
  </tr>
  <tr>
    <td>Ruby</td>
    <td><a href="https://github.com/tealbase-community/tealbase-rb" target="_blank" rel="noopener noreferrer">tealbase-rb</a></td>
    <td><a href="https://github.com/tealbase-community/postgrest-rb" target="_blank" rel="noopener noreferrer">postgrest-rb</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Rust</td>
    <td>-</td>
    <td><a href="https://github.com/tealbase-community/postgrest-rs" target="_blank" rel="noopener noreferrer">postgrest-rs</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Swift</td>
    <td><a href="https://github.com/tealbase-community/tealbase-swift" target="_blank" rel="noopener noreferrer">tealbase-swift</a></td>
    <td><a href="https://github.com/tealbase-community/postgrest-swift" target="_blank" rel="noopener noreferrer">postgrest-swift</a></td>
    <td><a href="https://github.com/tealbase-community/gotrue-swift" target="_blank" rel="noopener noreferrer">gotrue-swift</a></td>
    <td><a href="https://github.com/tealbase-community/realtime-swift" target="_blank" rel="noopener noreferrer">realtime-swift</a></td>
    <td><a href="https://github.com/tealbase-community/storage-swift" target="_blank" rel="noopener noreferrer">storage-swift</a></td>
    <td><a href="https://github.com/tealbase-community/functions-swift" target="_blank" rel="noopener noreferrer">functions-swift</a></td>
  </tr>
  <tr>
    <td>Godot Engine (GDScript)</td>
    <td><a href="https://github.com/tealbase-community/godot-engine.tealbase" target="_blank" rel="noopener noreferrer">tealbase-gdscript</a></td>
    <td><a href="https://github.com/tealbase-community/postgrest-gdscript" target="_blank" rel="noopener noreferrer">postgrest-gdscript</a></td>
    <td><a href="https://github.com/tealbase-community/gotrue-gdscript" target="_blank" rel="noopener noreferrer">gotrue-gdscript</a></td>
    <td><a href="https://github.com/tealbase-community/realtime-gdscript" target="_blank" rel="noopener noreferrer">realtime-gdscript</a></td>
    <td><a href="https://github.com/tealbase-community/storage-gdscript" target="_blank" rel="noopener noreferrer">storage-gdscript</a></td>
    <td><a href="https://github.com/tealbase-community/functions-gdscript" target="_blank" rel="noopener noreferrer">functions-gdscript</a></td>
  </tr>
  
</table>

<!--- Remove this list if you're translating to another language, it's hard to keep updated across multiple files-->
<!--- Keep only the link to the list of translation files-->

## Prevodi

- [Arabščina | العربية](/i18n/README.ar.md)
- [albanski / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [Bolgarski / Български](/i18n/README.bg.md)
- [Katalonščina / Català](/i18n/README.ca.md)
- [danščina](/i18n/README.da.md)
- [nizozemščina / Nederlands](/i18n/README.nl.md)
- [angleščina](https://github.com/tealbase/tealbase)
- [Finski / Suomalainen](/i18n/README.fi.md)
- [Francoski](/i18n/README.fr.md)
- [Nemščina / Deutsch](/i18n/README.de.md)
- [Grščina / Ελληνικά](/i18n/README.gr.md)
- [Hebrejščina / עברית](/i18n/README.he.md)
- [hindujščina / हिंदी](/i18n/README.hi.md)
- [madžarski jezik](/i18n/README.hu.md)
- [nepalščina / नेपाली](/i18n/README.ne.md)
- [Indonezijščina / Bahasa Indonesia](/i18n/README.id.md)
- [Italijanščina / Italiano](/i18n/README.it.md)
- [japonščina / 日本語](/i18n/README.jp.md)
- [korejščina / 한국어](/i18n/README.ko.md)
- [Malajščina / Bahasa Malaysia](/i18n/README.ms.md)
- [norveščina (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [perzijski jezik / فارسی](/i18n/README.fa.md)
- [poljščina / Polski](/i18n/README.pl.md)
- [portugalski / Português](/i18n/README.pt.md)
- [portugalščina (brazilščina) / Português Brasileiro](/i18n/README.pt-br.md)
- [Romunščina / Română](/i18n/README.ro.md)
- [Ruski / Pусский](/i18n/README.ru.md)
- [srbski / Srpski](/i18n/README.sr.md)
- [Sinhala / සිංහල](/i18n/README.si.md)
- [Španščina / Español](/i18n/README.es.md)
- [Poenostavljena kitajščina / 简体中文](/i18n/README.zh-cn.md)
- [švedščina / Svenska](/i18n/README.sv.md)
- [Thai / ไทย](/i18n/README.th.md)
- [tradicionalna kitajščina / 繁體中文](/i18n/README.zh-tw.md)
- [Turščina / Türkçe](/i18n/README.tr.md)
- [ukrajinski / Українська](/i18n/README.uk.md)
- [Vietnamščina / Tiếng Việt](/i18n/README.vi-vn.md)
- [Seznam prevodov](/i18n/languages.md) <!--- Keep only this -->

---

## Sponzorji

[![Novi sponzor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/tealbase)
