export class Intern {
  companyName: string;
  city: any[];
  address: string;
  telephone: number;
  sectorActivity: string;
  nbreEmployee: number;
  website: string;
  nameResponsPerson: string;
  telephoneResponsPerson: number;
  emailResponsPerson: string;
  postDetail: string;
  nbreIntern: number;
  getJob: string;
  getSalary: string;
  additionalInfo: string;
  date: string;

  constructor(companyName: string, city: any[], address: string, telephone: number, sectorActivity: string,
              nbreEmployee: number, website: string, nameResponsPerson: string, telephoneResponsPerson: number,
              emailResponsPerson: string, postDetail: string, nbreIntern: number, getJob: string, getSalary: string,
              additionalInfo: string, date: string) {
    this.companyName = companyName;
    this.city = city;
    this.address = address;
    this.telephone = telephone;
    this.sectorActivity = sectorActivity;
    this.nbreEmployee = nbreEmployee;
    this.website = website;
    this.nameResponsPerson = nameResponsPerson;
    this.telephoneResponsPerson = telephoneResponsPerson;
    this.emailResponsPerson = emailResponsPerson;
    this.postDetail = postDetail;
    this.nbreIntern = nbreIntern;
    this.getJob = getJob;
    this.getSalary = getSalary;
    this.additionalInfo = additionalInfo;
    this.date = date;
  }
}


