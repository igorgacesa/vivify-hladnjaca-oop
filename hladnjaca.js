"use strict";
class Hladnjaca {
    constructor() {
        if (Hladnjaca.instance) {
            return Hladnjaca.instance;
        }
        Hladnjaca.instance = this;
        this.otkupKlasa1 = this.otkupVoca;
        this.otkupKlasa2 = this.otkupVoca;
        this.otkupKlasa3 = this.otkupVoca;
        this.saldo = this.podaciOtkupa;
        this.jedinstveniBroj = this.podaciOtkupa;
        Logger.unosOtkupaVoca.bind(this);
        Logger.pregledOtkupa.bind(this);
        Logger.saldoOtkupnogMesta.bind(this);
    }
    podaciOtkupa(otkupljivac) {
        this.jedinstveniBroj = Math.floor(Math.random() * 10000 + 1);
        console.log(`Sa otkupnog mesta - ${otkupljivac.otkupnoMesto} -  predato je 800 kg voca svih klasa. 
      Proizvodjac ${otkupljivac.ime} ${otkupljivac.prezime} zaduzio je ${otkupljivac.uzetaAmbalaza} gajbi i vratio ${otkupljivac.vracenaAmbalaza} gajbi. 
      Transakcija je obavljena pod brojem dokumenta: ${this.jedinstveniBroj}.`);
    }
    otkupVoca(otkupnoMesto) {
        this.otkupKlasa1 = otkupnoMesto.cenaKlasa1 * 100;
        this.otkupKlasa2 = otkupnoMesto.cenaKlasa2 * 200;
        this.otkupKlasa3 = otkupnoMesto.cenaKlasa3 * 500;
        this.saldo = this.otkupKlasa1 + this.otkupKlasa2 + this.otkupKlasa3;
    }
}
class OtkupnoMesto {
    constructor(ime, otkupljivac) {
        this.ime = ime;
        this.otkupljivac = otkupljivac;
        this.cenaKlasa1 = this.ponuda;
        this.cenaKlasa2 = this.ponuda;
        this.cenaKlasa3 = this.ponuda;
        Logger.unosOtkupnogMesta.bind(this);
    }
    ponuda(voce) {
        console.log(`Cene voca: ${voce.ime} prva klasa - ${voce.klasa1}, druga klasa - ${voce.klasa2} treca klasa -  ${voce.klasa3}.`);
        this.cenaKlasa1 = voce.klasa1;
        this.cenaKlasa2 = voce.klasa2;
        this.cenaKlasa3 = voce.klasa3;
    }
}
class Otkupljivac {
    constructor(ime, prezime, jmbg, telefon, poreskaIzjava, ugovor, povrsinaParcele, tekuciRacun, otkupnoMesto) {
        this.ime = ime;
        this.prezime = prezime;
        this.jmbg = jmbg;
        this.telefon = telefon;
        this.poreskaIzjava = poreskaIzjava;
        this.ugovor = ugovor;
        this.povrsinaParcele = povrsinaParcele;
        this.tekuciRacun = tekuciRacun;
        this.otkupnoMesto = otkupnoMesto;
        this.uzetaAmbalaza = this.uzmiAmbalazu;
        this.vracenaAmbalaza = this.vratiAmbalazu;
        Logger.unosProizvodjaca.bind(this);
        Logger.unosZaduzenjaAmbalaze.bind(this);
    }
    uzmiAmbalazu(uzetaAmbalaza) {
        this.uzetaAmbalaza = uzetaAmbalaza;
    }
    vratiAmbalazu(vracenaAmbalaza) {
        this.vracenaAmbalaza = vracenaAmbalaza;
    }
}
class Voce {
    constructor(ime) {
        this.ime = ime;
        this.klasa1 = this.cenaKlasa1();
        this.klasa2 = this.cenaKlasa2();
        this.klasa3 = this.cenaKlasa3();
        Logger.unosVoca.bind(this);
    }
    cenaKlasa1(min = 200, max = 400) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    cenaKlasa2(min = 100, max = 200) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    cenaKlasa3(min = 50, max = 100) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
// -----------------------------------------------------------------------------------------------------------------------
class Logger {
    static unosOtkupnogMesta(otkupnoMesto) {
        console.log(`${new Date().toLocaleString()} / Unos otkupnog mesta / Otkupno mesto je pijaca: ${otkupnoMesto.ime}.`);
    }
    static unosProizvodjaca(otkupljivac) {
        console.log(`${new Date().toLocaleString()} / Unos proizvodjaca / Proizvodjac je: ${otkupljivac.ime} ${otkupljivac.prezime}.`);
    }
    static unosVoca(voce) {
        console.log(`${new Date().toLocaleString()} / Unos voca / Voce je: ${voce.ime}.`);
    }
    static unosZaduzenjaAmbalaze(otkupljivac) {
        console.log(`${new Date().toLocaleString()} / Unos zaduzenja ambalaze / Proizvodjac ${otkupljivac.ime} ${otkupljivac.prezime} uzeo je ${otkupljivac.uzetaAmbalaza} gajbi i vratio je ${otkupljivac.vracenaAmbalaza} gajbi.`);
    }
    static unosOtkupaVoca(otkupnoMesto) {
        console.log(`${new Date().toLocaleString()} / Unos otkupa voca / Hladnjaca je otkupila voce prve, druge i trece klase sa otkupnog mesta ${otkupnoMesto.ime}`);
    }
    static pregledOtkupa(otkupnoMesto) {
        console.log(`${new Date().toLocaleString()} / Pregled otkupa / Hladnjaca je otkupila 100 kg voca klase 1, po ceni od ${otkupnoMesto.cenaKlasa1}, 200 kg voca klase 2, po ceni od ${otkupnoMesto.cenaKlasa2}, 500 kg voca klase 3, po ceni od ${otkupnoMesto.cenaKlasa3}.`);
    }
    static saldoOtkupnogMesta(hladnjaca) {
        console.log(`${new Date().toLocaleString()} / Hladnjaca je otkupila voce prve, druge i trece klase u vrednosti ${hladnjaca.saldo}.`);
    }
}
// -----------------------------------------------------------------------------------------------------------------------
const hladnjaca = new Hladnjaca();
const Zivorad = new Otkupljivac("Zivorad", "Zivanovic", "1507969344566", "011/123456", "izjava", "ugovor", "30hA", "12131415161718", "Bajloni");
const Milojko = new Otkupljivac("Milojko", "Milojkovic", "3001955167716", "011/123123", "izjava", "ugovor", "50hA", "12131415161718", "Kalenic");
const Radisav = new Otkupljivac("Radisav", "Radenkovic", "0112948357753", "011/167716", "izjava", "ugovor", "100hA", "12131415161718", "Kvantas");
Zivorad.uzmiAmbalazu(50);
Zivorad.vratiAmbalazu(50);
const Bajloni = new OtkupnoMesto("Bajloni", Zivorad);
const Kalenic = new OtkupnoMesto("Kalenic", Milojko);
const Kvantas = new OtkupnoMesto("kvantas", Radisav);
const JabukeBajloni = new Voce("jabuke");
const JabukeKalenic = new Voce("jabuke");
const JabukeKvantas = new Voce("jabuke");
Bajloni.ponuda(JabukeBajloni);
Kalenic.ponuda(JabukeKalenic);
// Kvantas.ponuda(JabukeKvantas);
hladnjaca.podaciOtkupa(Zivorad);
hladnjaca.otkupVoca(Bajloni);
console.log(hladnjaca.otkupKlasa1);
console.log(hladnjaca.otkupKlasa2);
console.log(hladnjaca.otkupKlasa3);
hladnjaca.otkupVoca(Bajloni);
// hladnjaca.otkupVoca(Kalenic);
// hladnjaca.otkupVoca(Kvantas);
// -----------------------------------------------------------------------------------------------------------------------
Logger.unosOtkupnogMesta(Bajloni);
Logger.unosProizvodjaca(Zivorad);
Logger.unosVoca(JabukeBajloni);
Logger.unosZaduzenjaAmbalaze(Zivorad);
Logger.unosOtkupaVoca(Bajloni);
Logger.pregledOtkupa(Bajloni);
Logger.saldoOtkupnogMesta(hladnjaca);
