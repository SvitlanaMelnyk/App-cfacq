import {Fichier} from './fichier';

export class Media {
  id: number;
  image: Fichier;
  description: string;
  link: string;
  date: string;
  dateMedia: Date;
  dateMediaString: string;
  traite: boolean;

  constructor(image?: Fichier, description?: string, link?: string, date?: string, dateMedia?: Date, dateMediaString?: string, traite?: boolean ) {
    this.image = image;
    this.description = description;
    this.link = link;
    this.date = date;
    this.dateMedia = dateMedia;
    this.dateMediaString = dateMediaString;
    this.traite = traite;
  }
}
