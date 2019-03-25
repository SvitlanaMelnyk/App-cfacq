import {Fichier} from './fichier';

export class AboutUs {
  id: number;
  name: string;
  description: string;
  image: Fichier;

  constructor(name?: string, description?: string, image?: Fichier) {
    this.name = name;
    this.description = description;
    this.image = image;
  }
}
