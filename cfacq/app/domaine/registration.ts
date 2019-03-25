export class Registration {
  name: string;
  surname: string;
  email: string;
  city: any[];
  address: string;
  telephone: number;
  formation: string;
  cour: string;
  birthday: string;
  date: string;

  constructor(name: string, surname: string, email: string, city: any[], address: string, telephone: number,
              formation: string, cour: string, birthday: string, date: string) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.city = city;
    this.address = address;
    this.telephone = telephone;
    this.formation = formation;
    this.cour = cour;
    this.birthday = birthday;
    this.date = date;
  }
}



