import {Component, OnInit} from '@angular/core';
import {FilterService} from '../../../services/filter.service';
import {Util} from '../../../util/util';
import {Offer} from '../../domaine/offer';
import {OfferService} from '../../../services/offer.service';
import {Ville} from '../../domaine/ville';
import {VillesService} from '../../../services/villes.service';


@Component({
  selector: 'app-offers',
  styleUrls: ['./offers.component.css'],
  template: `
    <div class="header">
      <h5>Offres pours les étudiants</h5>
      <hr class="marginLine">
    </div>
    <app-filter [villes]="villesSelectable" (search)="searchPosteEmployeur($event)"></app-filter>
    <p class="message" *ngIf="message">Désolé, aucun résultat n'a été trouvé. Essayez un autre choix.</p>
    <div class="bottomLine" *ngFor="let post of offers">
      <div class="float">
        <div>{{post.physicalAddress}}, {{post.city.name}}</div>
        <div class="float bold">{{post.date | date : 'mediumDate'}}</div>
      </div>
      <p class="clear"></p>
      <p class="titre-offer"><a [routerLink]="['/offre', {id: post.id}]">{{post.title}}</a></p>
      <p class="textAlign">{{post.summary}}</p>
      <div class="float bold"><a [routerLink]="['/offre', {id: post.id}]">En savoir plus</a></div>
      <p class="clear"></p>
    </div>
  `,
  providers: [FilterService, OfferService]
})

export class OffersComponent implements OnInit {
  offers: Offer[];
  message: boolean;
  villes: Ville[];
  villesSelectable: Ville[];
  villesMap: any;

  constructor(private filterService: FilterService, private offerService: OfferService) {
    this.villesMap = {};
  }

  searchPosteEmployeur(filterForm) {
    Util.removeJSOGId(filterForm);
    this.filterService.searchPosteEmployeur(filterForm.villes, filterForm.typePostes, filterForm.categoriePostes).subscribe(
      (data) => {
            this.offers = data;

            this.offers.length === 0 ? this.message = true : this.message = false;
      },
      err => {

      });
  }

   ngOnInit() {
     this.message = false;
     this.getAll();
   }

  getAll() {
    this.offerService.getAllPublished().subscribe(
      (offers: Offer[]) => {
        this.offers = offers;
        this.offers.forEach(e => {
          if (e.city && !this.villesMap[e.city.id]) {
            this.villesMap[e.city.id] = e.city;
          }
        });

        this.villesSelectable = [];
        for (const key in this.villesMap) {
          if (this.villesMap.hasOwnProperty(key)) {
            this.villesSelectable.push(this.villesMap[key]);
          }
        }
        this.villesSelectable.unshift({
          id: -1,
          name: 'Toutes les villes'
        });
      },
      (error) => {
        console.log(error);
      });
  }
}



