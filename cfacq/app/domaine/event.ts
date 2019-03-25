import {Ville} from './ville';
import {Poste} from './poste';
import {Adresse} from './adresse';

export class Event {
  id: number;
  name: string;
  description: string;
  price: number;
  dateStart: Date;
  dateEnd: Date;
  poste: Poste;
  color: string;
  ville: Ville;
  adresse: Adresse;

  constructor(name?: string, description?: string, price?: number, dateStart?: Date, dateEnd?: Date, poste?: Poste, color?: string, ville?: Ville) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.poste = poste;
    this.color = color;
    this.ville = ville;
    this.adresse = new Adresse();
  }
}



