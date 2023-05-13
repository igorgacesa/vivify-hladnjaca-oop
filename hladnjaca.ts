class Hladnjaca {
  static instance: Hladnjaca;
  otkupKlasa1: any;
  otkupKlasa2: any;
  otkupKlasa3: any;
  jedinstveniBroj: any;
  saldo: any;

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

  podaciOtkupa(otkupljivac: Otkupljivac) {
    this.jedinstveniBroj = Math.floor(Math.random() * 10000 + 1);
    console.log(
      `Sa otkupnog mesta - ${otkupljivac.otkupnoMesto} -  predato je 800 kg voca svih klasa. 
      Proizvodjac ${otkupljivac.ime} ${otkupljivac.prezime} zaduzio je ${otkupljivac.uzetaAmbalaza} gajbi i vratio ${otkupljivac.vracenaAmbalaza} gajbi. 
      Transakcija je obavljena pod brojem dokumenta: ${this.jedinstveniBroj}.`
    );
  }

  otkupVoca(otkupnoMesto: OtkupnoMesto): void {
    this.otkupKlasa1 = otkupnoMesto.cenaKlasa1 * 100;
    this.otkupKlasa2 = otkupnoMesto.cenaKlasa2 * 200;
    this.otkupKlasa3 = otkupnoMesto.cenaKlasa3 * 500;
    this.saldo = this.otkupKlasa1 + this.otkupKlasa2 + this.otkupKlasa3;
  }
}

class OtkupnoMesto {
  ime: string;
  otkupljivac: Otkupljivac;
  cenaKlasa1: any;
  cenaKlasa2: any;
  cenaKlasa3: any;

  constructor(ime: string, otkupljivac: Otkupljivac) {
    this.ime = ime;
    this.otkupljivac = otkupljivac;
    this.cenaKlasa1 = this.ponuda;
    this.cenaKlasa2 = this.ponuda;
    this.cenaKlasa3 = this.ponuda;
    Logger.unosOtkupnogMesta.bind(this);
  }

  ponuda(voce: Voce): void {
    console.log(
      `Cene voca: ${voce.ime} prva klasa - ${voce.klasa1}, druga klasa - ${voce.klasa2} treca klasa - ${voce.klasa3}.`
    );

    this.cenaKlasa1 = voce.klasa1;
    this.cenaKlasa2 = voce.klasa2;
    this.cenaKlasa3 = voce.klasa3;
  }
}

class Otkupljivac {
  ime: string;
  prezime: string;
  jmbg: string;
  telefon: string;
  poreskaIzjava: string;
  ugovor: string;
  povrsinaParcele: string;
  tekuciRacun: string;
  otkupnoMesto: any;
  uzetaAmbalaza: any;
  vracenaAmbalaza: any;

  constructor(
    ime: string,
    prezime: string,
    jmbg: string,
    telefon: string,
    poreskaIzjava: string,
    ugovor: string,
    povrsinaParcele: string,
    tekuciRacun: string,
    otkupnoMesto: string
  ) {
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

  uzmiAmbalazu(uzetaAmbalaza: number) {
    this.uzetaAmbalaza = uzetaAmbalaza;
  }

  vratiAmbalazu(vracenaAmbalaza: number) {
    this.vracenaAmbalaza = vracenaAmbalaza;
  }
}

class Voce {
  ime: string;
  klasa1: number;
  klasa2: number;
  klasa3: number;

  constructor(ime: string) {
    this.ime = ime;
    this.klasa1 = this.cenaKlasa1();
    this.klasa2 = this.cenaKlasa2();
    this.klasa3 = this.cenaKlasa3();
    Logger.unosVoca.bind(this);
  }

  cenaKlasa1(min: number = 200, max: number = 400) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  cenaKlasa2(min: number = 100, max: number = 200) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  cenaKlasa3(min: number = 50, max: number = 100) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

// -----------------------------------------------------------------------------------------------------------------------

class Logger {
  public static unosOtkupnogMesta(otkupnoMesto: OtkupnoMesto) {
    console.log(
      `${new Date().toLocaleString()} / Unos otkupnog mesta / Otkupno mesto je pijaca: ${
        otkupnoMesto.ime
      }.`
    );
  }
  public static unosProizvodjaca(otkupljivac: Otkupljivac) {
    console.log(
      `${new Date().toLocaleString()} / Unos proizvodjaca / Proizvodjac je: ${
        otkupljivac.ime
      } ${otkupljivac.prezime}.`
    );
  }
  public static unosVoca(voce: Voce) {
    console.log(
      `${new Date().toLocaleString()} / Unos voca / Voce je: ${voce.ime}.`
    );
  }
  public static unosZaduzenjaAmbalaze(otkupljivac: Otkupljivac) {
    console.log(
      `${new Date().toLocaleString()} / Unos zaduzenja ambalaze / Proizvodjac ${
        otkupljivac.ime
      } ${otkupljivac.prezime} uzeo je ${
        otkupljivac.uzetaAmbalaza
      } gajbi i vratio je ${otkupljivac.vracenaAmbalaza} gajbi.`
    );
  }
  public static unosOtkupaVoca(otkupnoMesto: OtkupnoMesto) {
    console.log(
      `${new Date().toLocaleString()} / Unos otkupa voca / Hladnjaca je otkupila voce prve, druge i trece klase sa otkupnog mesta ${
        otkupnoMesto.ime
      }`
    );
  }
  public static pregledOtkupa(otkupnoMesto: OtkupnoMesto) {
    console.log(
      `${new Date().toLocaleString()} / Pregled otkupa / Hladnjaca je otkupila 100 kg voca klase 1, po ceni od ${
        otkupnoMesto.cenaKlasa1
      }, 200 kg voca klase 2, po ceni od ${
        otkupnoMesto.cenaKlasa2
      }, 500 kg voca klase 3, po ceni od ${otkupnoMesto.cenaKlasa3}.`
    );
  }
  public static saldoOtkupnogMesta(hladnjaca: Hladnjaca) {
    console.log(
      `${new Date().toLocaleString()} / Hladnjaca je otkupila voce prve, druge i trece klase u vrednosti ${
        hladnjaca.saldo
      }.`
    );
  }
}

// -----------------------------------------------------------------------------------------------------------------------
const hladnjaca = new Hladnjaca();

const Zivorad = new Otkupljivac(
  "Zivorad",
  "Zivanovic",
  "1507969344566",
  "011/123456",
  "izjava",
  "ugovor",
  "30hA",
  "12131415161718",
  "Bajloni"
);
const Milojko = new Otkupljivac(
  "Milojko",
  "Milojkovic",
  "3001955167716",
  "011/123123",
  "izjava",
  "ugovor",
  "50hA",
  "12131415161718",
  "Kalenic"
);
const Radisav = new Otkupljivac(
  "Radisav",
  "Radenkovic",
  "0112948357753",
  "011/167716",
  "izjava",
  "ugovor",
  "100hA",
  "12131415161718",
  "Kvantas"
);

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
