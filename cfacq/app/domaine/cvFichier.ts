import {Fichier} from './fichier';

export class CvFichier {
  id: number;
  date: string;
  fichier: Fichier;

  constructor(date: string, fichier: Fichier) {
    this.date = date;
    this.fichier = fichier;
  }
}





