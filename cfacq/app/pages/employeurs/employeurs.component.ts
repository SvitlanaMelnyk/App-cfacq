import { Component } from '@angular/core';
import {Offer} from '../../domaine/offer';
import {OfferService} from '../../../services/offer.service';

@Component({
  selector: 'app-employeurs',
  templateUrl: './employeurs.component.html',
  styleUrls: ['./employeurs.component.css'],
  providers: [OfferService]
})
export class EmployeursComponent {
  offer: Offer;
  message: string;

  constructor(private service: OfferService) {
    this.offer = new Offer();
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
