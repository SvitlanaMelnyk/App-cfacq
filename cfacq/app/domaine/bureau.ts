import {Adresse} from './adresse';
import {Local} from './local';
import {Poste} from './poste';

export class Bureau {
  id: number;
  nom: string;
  adresse: Adresse;
  locaux: Local[];
  postes: Poste[];

  constructor() {
    this.adresse = new Adresse();
    this.locaux = [];
    this.postes = [];
  }
}
