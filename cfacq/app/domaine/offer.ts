import {Ville} from './ville';
import {CategoriePoste} from './categoriePoste';
import {TypePoste} from './typePoste';

export class Offer {
  id: number;
  title: string;
  nameEmployer: string;
  city: Ville;
  address: string;
  telephone: string;
  email: string;
  sector: string;
  website: string;
  contactName: string;
  contactTelephone: string;
  contactEmail: string;
  domaines: CategoriePoste[];
  physicalAddress: string;
  typePostes: TypePoste[];
  summary: string;
  tasks: string[];
  competences: string[];
  requirements: string[];
  otherInformation: string;
  logo: string;
  date: Date;
  published: boolean;
}
