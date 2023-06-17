# Starptautiska mobilā lietotne "NearbyFood" ērtai ēdināšanas iestāžu meklēšanai un novērtēšanai

## UZDEVUMA NOSTRĀDNE

Kopējais darba uzdevums: Izveidot aplikāciju "NearbyFood", kas būs ērta un internacionāla platforma, kas veicinās komunikāciju un ēdināšanas iestāžu atklāšanu starp uzņēmējiem un privātpersonām, piedāvājot informāciju par tuvākajām ēdināšanas vietām visā pasaulē.
Kvalifikācijas darba galvenie mērķi:

* Nodrošināt lietotājiem iespēju atrast un izpētīt tuvākās ēdināšanas iestādes visā pasaulē, ietverot dažādas kategorijas (restorāni, ātrās ēdināšanas vietas, kebabi utt.).
* Nodrošināt iespēju lietotājiem meklēt konkrētas iestādes un izmantot meklēšanas filtrus (piemēram, filtrēt tikai restorānus).
* Nodrošināt lietotājiem iespēju atstāt atsauksmes un komentārus par apmeklētajām iestādēm un novērtēt šo iestāžu kvalitāti.
* Nodrošināt drošu un ērtu autorizācijas un reģistrācijas sistēmu, ieskaitot SMS apstiprinājumu pa mobilo tālruni.
* Izveidot darba servera daļu, kas nodrošinās savienojumu ar aplikāciju un datu pārsūtīšanu.

## UZDEVUMA RISINĀŠANAS LĪDZEKĻU IZVĒLES PAMATOJUMS

1) TypeScript - valoda, kas ir ērta, jo, pateicoties rakstīšanai, jūs varat ierobežot sevi no turpmākām kļūdām. TypeScript nodrošina statisko tipizēšanu, kas ļauj atpazīt un novērst kļūdas kompilēšanas laikā. Tas uzlabo koda uzticamību un uzturējamību, atvieglo atkļūdošanu un samazina kļūdu iespējamību izpildes laikā.
2) Expo + React Native - valoda, kas ir ērta tiem, kam ir bijusi pieredze projektu rakstīšanā, izmantojot React ietvaru. Expo "out of the box" ietver pielāgotus izstrādes rīkus, kā arī ērtu dokumentāciju, lai sāktu izstrādāt aplikāciju.
3) MySQL - MySQL ir populāra datu bāzu pārvaldības sistēma, ko plaši izmanto tīmekļa lietojumprogrammām, datu noliktavām un citām datu vadītām lietojumprogrammām.
4) Apollo + GQL - GraphQL ļauj klientiem precīzi norādīt nepieciešamos datus, atvieglojot vajadzīgo datu iegūšanu vienā pieprasījumā. Tas var būt īpaši noderīgi, strādājot ar sarežģītām datu struktūrām vai veidojot lietojumprogrammas, kurām ir jāpatērē dati no vairākiem avotiem.
5) Prisma - Nākamās paaudzes objektu relāciju kartētājs (ORM), kas palīdz izstrādātājiem ātrāk veidot un pieļaut mazāk kļūdu.
6) Docker - Atvērtā pirmkoda platforma, kas ļauj izstrādātājiem izveidot, izvietot, palaist, atjaunināt un pārvaldīt konteinerus — standartizētus izpildāmos komponentus, kas apvieno lietojumprogrammas pirmkodu ar operētājsistēmas (OS) bibliotēkām un atkarībām, kas nepieciešamas šī koda palaišanai jebkurā vidē.
7) Figma - Figma ir ērti lietojams dizaina rīks, ko pat iesācēji dizaineri var izmantot, lai izveidotu profesionāla izskata dizainu. Lietotāja saskarne ir vienkārša un intuitīva, tāpēc jums nebūs jātērē laiks, mēģinot izdomāt, kā izmantot rīku.
8) Visual Studio Code ir zibenīgi ātrs pirmkoda redaktors, kas ir lieliski piemērots ikdienas lietošanai. Lai strādātu ar datu bāzēm, tika izmantots paplašinājums Database manager for MySQL/MariaDB (kura autors ir Weijan Chen), kurā tika ievadīti visi vaicājumi un viss darbs ar datu bāzi.


## INFORMĀCIJAS AVOTI

1) Database manager for MySQL/MariaDB extension for VS Code (Resurss apskatīts 02.12.2022): [saite](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2)
2) Dokumentācija par Docker (Resurss apskatīts 14.11.2022): [saite](https://docs.docker.com/desktop/)
3) Dokumentācija par Docker Compose (Resurss apskatīts 16.11.2022): [docs.docker.com/compose](https://docs.docker.com/compose/)
4) MySQL Docker Image (Resurss apskatīts 02.12.2022):
[hub.docker.com/_/mysql](https://hub.docker.com/_/mysql)
5) Dokumentācija par MySQL (Resurss apskatīts 02.12.2022):
[dev.mysql.com/doc/](https://dev.mysql.com/doc/)
6) Node.js Docker Image (Resurss apskatīts 10.12.2022):
[hub.docker.com/_/node](https://hub.docker.com\_\node)
7) Dokumentācija par Apollo + GQL (Resurss apskatīts 15.12.2022): [apollographql.com/docs](https://www.apollographql.com/docs/)
8) Dokumentācija par Prisma (Resurss apskatīts 25.12.2022): [prisma.io/docs](https://www.prisma.io/docs)
9) Dokumentācija par Expo (Resurss apskatīts 06.12.2022): [docs.expo.dev](https://docs.expo.dev/)
10) Npm bibliotēka saziņai ar Twilio API (Resurss apskatīts 19.12.2022): [twilio.com/docs/sms/](https://www.twilio.com/docs/sms/quickstart/node)
11) React-native-maps bibliotēkas repozitorijs un dokumentācija (Resurss apskatīts 16.12.2022): [github.com/react-native-maps](https://github.com/react-native-maps/react-native-maps)
12) Dokumentācija par TypeScript (Resurss apskatīts 20.08.2022): [typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
13) Saite uz nodemon bibliotēku (Resurss apskatīts 20.08.2022): [npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon)
14) Saite uz Node.js instalāciju (Resurss apskatīts 13.02.2022): [nodejs.org](https://nodejs.org/en)
15) Saite uz Expo lietotni operētājsistēmai iOS: [saite](https://apps.apple.com/us/app/expo-go/id982107779)
16) Saite uz Expo lietotni operētājsistēmai Android: [saite](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US)
17) Bibliotēka, ko izmanto Svg attēlu ģenerēšanai (react-native-svg) (Resurss apskatīts 12.05.2023): [npmjs.com/package/react-native-svg](https://www.npmjs.com/package/react-native-svg)
18) Mājaslapas, no kurām tika ņemti svg attēli: [svgrepo.com](https://www.svgrepo.com/) un [iconify.design](https://iconify.design/)
19) Mājaslapa, kurā, pamatojoties uz graphql shēmu, tika ģenerēti typescript tipi (Resurss apskatīts 12.01.2023):  [the-guild.dev/graphql/codegen](https://the-guild.dev/graphql/codegen)
20) Programmas GitHub repozitorijs: [github.com/zoomqg/nearbyfood](https://github.com/zoomqg/nearbyfood)

## Backend uzstādīšana

Lai sistēma veiksmīgi darbotos un tiktu uzturēta, ir nepieciešams serveris ar instalētu programmatūru. Lai to panāktu, ir jāveic šādi soļi, lai serverī instalētu programmatūru:
Docker un docker-compose instalēšana:
Docker (versija 4.19.0) ļauj strādāt ar konteineriem, kas nodrošina ērtu lietojumprogrammu izolāciju un mērogojamību. To izmanto, lai palaistu un pārvaldītu konteinerus, kuros darbojas visa sistēmas aizmugure. Docker-compose (versija v2.17.3) nodrošina rīkus vairāku konteineru lietojumprogrammu un to saišu pārvaldībai.

### Repozitorija klonēšana un vides mainīgo iestatīšana:

Kad repozitorijs ir klonēts, dodieties uz direktoriju <b>/server</b> un izveidojiet <b>.env</b> failu, kas definē sistēmā izmantotās konstantes, proti:

* DATABASE_URL,
* MYSQL_USER,
* MYSQL_PASSWORD,
* PORT,
* TWILIO_ACCOUNT_SID,
* TWILIO_AUTH_TOKEN,
* TWILIO_SERVICE_ID,
* GOOGLE_GEOCODING_API_KEY,
* SERVER_PORT 

### Servera un datubāzes palaišana Docker konteineros:

Pārvietojieties uz klonētās repozitorija saknes direktoriju un pēc tam uz <b>/server</b> direktoriju.

* Palaidiet komandu kas samontēs servera un datubāzes attēlus, pārnesīs nepieciešamos failus no repozitorija uz konteineru darba direktoriju un sasaistīs tos kopā.

    ```
    docker-compose up
    ```

Šī komanda iedarbinās divus konteinerus:

1) datubāzes konteiners:
    * Pirmo reizi, kad tiks palaists datubāzes konteiners, tiks inicializēts no Docker Hub iegūtais MySQL 5.7 versijas attēls. Ieteicams izmantot šo versiju, jo tā tika izmantota sistēmas izstrādes laikā. Vecākas versijas nav ieteicamas, jo to funkcionalitāte var atšķirties. Inicializācijas laikā konteiners izmantos iepriekš definētas konstantes, lai izveidotu MySQL lietotāju, datubāzes nosaukumu, paroli un portu, ko izmantos, lai izveidotu savienojumu ar datubāzi. Konteinera saknes mapē tiks pievienots arī .sql fails, kas satur datubāzes dump failu ar visām tabulām un datiem.

    * Pēc inicializēšanas datubāze būs gatava darbam, un konteiners atvērs portu ārējiem savienojumiem.

2) Servera konteiners:
Pirmo reizi palaižot servera konteineru, tiks inicializēts Node.js 14. versijas attēls. Kad Node.js ir instalēts, tiks instalētas package.json failā definētās atkarības.

3) Pēc visu atkarību instalēšanas konteiners palaidīs komandu <b>npx prisma generate</b>, lai ģenerētu Prisma ORM klientu, kas tiks izmantots saziņai starp Apollo serveri un datubāzi.
4) Pēc tam konteiners iedarbinās serveri, un servera un datubāzes kompozīts veiksmīgi darbosies.


## Fronend uzstādīšana

Lai tālrunī palaistu programmu, izpildiet tālāk norādītās darbības:
1) Pārliecinieties, ka serveris ir veiksmīgi iedarbināts, izpildot dokumentācijā sniegtos norādījumus.
2) Pārejiet uz <b>/client</b> direktoriju terminālī, izmantojot komandu 

    ```
    cd client
    ```

3) Atveriet <b>contants.ts</b>. Kā konstantes <b>GRAPHQL_ADRESS</b> vērtību ievadiet savu backend adresi. Piemēram: Aizstājiet šo adresi ar savu aizmugurējās saskarnes faktisko adresi.
4) Pārliecinieties, ka jūsu sistēmā jau ir instalēts <b>Node.js</b>. Ja tā nav, instalējiet Node.js, sekojot saitei sadaļā INFORMĀCIJAS AVOTI. Instalējiet nepieciešamās atkarības lietojumprogrammas klienta pusei, izpildot komandu.

    ```
    npm install
    ```

5) Instalējiet Expo CLI globāli, izmantojot tālāk norādīto komandu. Tas ļaus jums izmantot Expo komandas no jebkura termināļa direktorija.

    ```
    npm install -g expo-cli
    ```

6) Lejupielādējiet <b>Expo</b> lietojumprogrammu savā mobilajā ierīcē, sekojot saitei INFORMĀCIJAS AVOTI. Pārliecinieties, ka dators un mobilā ierīce atrodas vienā lokālajā tīklā.
7) Palaidiet Expo lietojumprogrammu, ievadot terminālī komandu 

    ```
    expo start
    ```

    vai

    ```
    npx expo start
    ```

    Atrodoties direktorijā /client. Pēc palaišanas terminālī parādīsies QR kods (sk. 6.0. attēlu).
8) Atveriet Expo lietotni savā mobilajā ierīcē un, izmantojot tās kameru, nolasiet terminālī redzamo QR kodu. Expo lietotne lejupielādēs jūsu lietotni, un jūs varēsiet sākt to izmantot.


Tagad jūsu lietotne darbojas jūsu mobilajā ierīcē, izmantojot Expo. Jūs varat ar to mijiedarboties un pārbaudīt tās funkcionalitāti.
