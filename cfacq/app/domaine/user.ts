import {Role} from './role';

export class User {
  id: number;
  username: string;
  nom: string;
  prenom: string;
  courriel: string;
  token: string;
  role: Role;
}
