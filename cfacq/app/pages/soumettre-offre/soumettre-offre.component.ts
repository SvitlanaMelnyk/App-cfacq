import { Component, OnInit } from '@angular/core';
import {Offer} from '../../domaine/offer';
import {OfferService} from '../../../services/offer.service';

@Component({
  selector: 'app-soumettre-offre',
  templateUrl: './soumettre-offre.component.html',
  styleUrls: ['./soumettre-offre.component.css'],
  providers: [OfferService]
})
export class SoumettreOffreComponent implements OnInit {
  offer: Offer;
  message: string;

  constructor(private service: OfferService) {
    this.offer = new Offer();
  }

  ngOnInit() {
  }

  create(offer: Offer) {
    this.service.save(offer).subscribe(
      () => {
        this.message = 'Votre offre d\'emploi a été ajouté au système.';
        this.offer = new Offer();
        document.body.scrollTop = 0;

        setTimeout(() => {
          this.clearMessage();
        }, 4000);
      },
      (error) => {
        console.log(error);
      });
  }

  clearMessage() {
    this.message = null;
  }

}
