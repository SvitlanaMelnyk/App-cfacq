import {Cours} from './cours';

export class Inscription {
  id: number;
  cours: number;
  coursObj: Cours;
  prenom: string;
  nom: string;
  telephone: string;
  courriel: string;
  ville: string;
  adresse: string;
  birthday: Date;
  date: Date;
  dateInscriptionString: string;
  traite: boolean;


  constructor() {

  }
}
