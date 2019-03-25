export class Salle {
  id: number;
  nom: string;
  fichiers: any;

  constructor() {
    this.fichiers = [];
    this.nom = '';
    this.id = undefined;
  }
}
