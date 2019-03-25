import {Salle} from './salle';
import {Bureau} from './bureau';

export class Local {
  id: number;
  nom: string;
  salles: Salle[];
  bureau: Bureau;
}
