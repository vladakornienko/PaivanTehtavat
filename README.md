# Päivän tehtävät

## Sovelluksen kuvaus

Päivän tehtävät on yksinkertainen mobiilisovellus päivittäisten tehtävien hallintaan. Sovelluksen avulla käyttäjä voi lisätä ja hallita päivän tehtäviä helposti yhdessä paikassa.

Sovelluksen ominaisuudet:

- Uusien tehtävien lisääminen
- Tehtävien merkitseminen tehdyiksi
- Tehtävien poistaminen
- Nykyisen päivämäärän näyttäminen
- Keskeneräisten tehtävien lukeminen ääneen suomeksi
- Tehtävien tallentaminen laitteen muistiin

## Tietojen tallentaminen

Sovellus tallentaa tehtävät laitteen muistiin AsyncStorage-toiminnon avulla. Tallennetut tehtävät säilyvät, vaikka sovellus suljetaan. Kun sovellus avataan uutena päivänä, edellisen päivän tehtävät poistetaan listalta.

## Käytetyt teknologiat:

- JavaScript
- ReactNative
- Expo
- UseState
- UseEffect
- View
- Text
- TextInput
- Button
- Pressable
- FlatList
- StyleSheet
- AsyncStorage
- ExpoSpeech

## Sovelluksen käynnistäminen

1. Kloona Github-repositorio: 
git clone https://github.com/vladakornienko/PaivanTehtavat.git

2. Siirry projektikansioon:
cd PaivanTehtavat

3. Asenna tarvittavat paketit:
npm install

4. Käynnistä sovellus:
npx expo start

## Tkeijä:

Vladlena Kornienko


