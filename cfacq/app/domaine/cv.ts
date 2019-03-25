import {Student} from './student';
import {TypePoste} from './typePoste';
import {CategoriePoste} from './categoriePoste';
import {JobTitle} from './jobTitle';

export class Cv {
  id: number;
  jobTitleCV: JobTitle;
  summary: string;
  competence: string;
  otherInformation: string;
  logo: string;
  date: string;
  link: string;
  city: any[];
  typePost: TypePoste[];
  categoryPost: CategoriePoste[];
  student: Student;
  constructor(jobTitleCV?: JobTitle, summary?: string, competence?: string, otherInformation?: string, logo?: string, date?: string,
              link?: string, city?: any[], typePost?: TypePoste[], categoryPost?: CategoriePoste[]) {
    this.jobTitleCV = jobTitleCV;
    this.summary = summary;
    this.competence = competence;
    this.otherInformation = otherInformation;
    this.logo = logo;
    this.date = date;
    this.link = link;
    this.typePost = typePost || [];
    this.categoryPost = categoryPost || [];
    this.city = city;
  }
}





