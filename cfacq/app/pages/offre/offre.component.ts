import { Component, OnInit } from '@angular/core';
import {Offer} from '../../domaine/offer';
import {OfferService} from '../../../services/offer.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css'],
  providers: [OfferService]
})
export class OffreComponent implements OnInit {
  offer: Offer;
  constructor(private offerService: OfferService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getById();
  }

  getById() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.offerService.getById(id).subscribe((data) => {
        this.offer = data;
        console.log(this.offer);
      },
      error => {
        console.log(error);
      });
  }
}
