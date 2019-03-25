export class Cours {
  id: number;
  nom: string;
  description: string;
  link: any[];

  constructor(nom: string, description: string) {
    this.nom = nom;
    this.description = description;
  }
}
