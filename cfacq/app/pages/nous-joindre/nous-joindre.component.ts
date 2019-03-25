import {Component, OnInit} from '@angular/core';
import {BureauService} from '../../../services/bureau.service';
import {Bureau} from '../../domaine/bureau';
import {Adresse} from '../../domaine/adresse';

@Component({
  selector: 'app-nous-joindre',
  templateUrl: './nous-joindre.component.html',
  styleUrls: ['./nous-joindre.component.css'],
  providers: [BureauService]
})
export class NousJoindreComponent implements OnInit {

  bureaux: Bureau[];
  maps: google.maps.Map[];

  constructor(private bureauService: BureauService) {
    this.maps = [];
  }

  ngOnInit() {
    this.getBureaux();
  }

  getBureaux() {
    this.bureauService.getAll().subscribe((bureaux: Bureau[]) => {
        this.bureaux = bureaux;
      },
      error => {
        console.log(error);
      });
  }

  getAdresseString(a: Adresse) {
    const t = new Adresse(a.noCivic, a.rue, a.rue2, a.ville, a.province, a.codePostal, a.pays, a.telephone, a.courriel);
    return t.toString();
  }
}
