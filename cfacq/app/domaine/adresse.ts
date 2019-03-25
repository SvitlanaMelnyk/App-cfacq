export class Adresse {
  id: number;
  noCivic: string;
  rue: string;
  rue2: string;
  ville: string;
  province: string;
  codePostal: string;
  telephone: string;
  telephonePoste: string;
  telephone2: string;
  telephone2Poste: string;
  telephone3: string;
  fax: string;
  lat: number;
  lng: number;
  courriel: string;
  pays: string;

  constructor(noCivic?: string, rue?: string, rue2?: string, ville?: string, province?: string, codePostal?: string, pays?: string, telephone?: string, courriel?: string) {
    this.noCivic = noCivic;
    this.rue = rue;
    this.rue2 = rue2;
    this.ville = ville;
    this.province = province;
    this.codePostal = codePostal;
    this.pays = pays;
    this.telephone = telephone;
    this.courriel = courriel;
  }

  toString() {
    let r = '';

    if (this.rue2) {
      r += this.rue2 + '-';
    }

    if (this.noCivic) {
      r += this.noCivic + ' ';
    }

    if (this.rue) {
      r += this.rue + ', ';
    }

    if (this.ville) {
      r += this.ville + ' ';
    }

    if (this.province) {
      r += this.province + ' ';
    }

    if (this.pays) {
      r += this.pays + ' ';
    }

    if (this.codePostal) {
      r += this.codePostal + ' ';
    }

    return r;
  }
}
