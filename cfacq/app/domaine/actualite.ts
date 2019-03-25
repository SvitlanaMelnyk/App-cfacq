import {Fichier} from './fichier';

export class Actualite {
  id: number;
  name: string;
  description: string;
  images: Fichier[];
  category: string;
  date: string;

  constructor(id?: number, name?: string, description?: string, images?: Fichier[], category?: string, date?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    if (images) {
      this.images = images;
    } else {
      this.images = [];
    }
    this.category = category;
    this.date = date;
  }
}



