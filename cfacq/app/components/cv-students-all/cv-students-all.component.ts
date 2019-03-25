import { Component, OnInit } from '@angular/core';
import {FilterService} from '../../../services/filter.service';
import {Cv} from '../../domaine/cv';
import {Util} from '../../../util/util';
import {CvService} from '../../../services/cv.service';
import {Ville} from '../../domaine/ville';
import {VillesService} from '../../../services/villes.service';

@Component({
  selector: 'app-cv-students-all',
  styleUrls: ['./cv-students-all.component.css'],
  template: `
    <div class="header">
      <h5>CV disponibles</h5>
      <hr class="marginLine">
    </div>
    <app-filter [villes]="villes" (search)="searchPosteEtudiant($event)"></app-filter>
    <p class="message" *ngIf="message">Désolé, aucun résultat n'a été trouvé. Essayez un autre choix.</p>
    <div class="bottomLine" *ngFor="let post of listDePosteAfficherEtudiant">
      <img *ngIf="post && post.logo" src="../assets/images/{{post.logo}}" alt="" class="responsive-img" width="90px">
      <div class="float">
        <div>{{post.city.name}}</div>
        <div class="float bold">{{post.date | date:"mediumDate" }}</div>
      </div>
      <p class="titre-offer"><a [routerLink]="['/cv-etudiant', {id: post.id}]">{{post.jobTitleCV.name}}</a></p>
      <p class="textAlign">{{post.summary}}</p>
      <div class="float bold"><a [routerLink]="['/cv-etudiant', {id: post.id}]">En savoir plus</a></div>
      <p class="clear"></p>
    </div>
  `,
  providers: [FilterService, CvService, VillesService]
})

export class CVStudentsAllComponent implements OnInit {

  listDePosteAfficherEtudiant: any[];
  message: boolean;

  villes: Ville[];

  constructor(private filterService: FilterService, private cvsService: CvService, private villeService: VillesService) {}


  searchPosteEtudiant(filterForm) {
    Util.removeJSOGId(filterForm);
    this.filterService.searchPosteEtudiant(filterForm.villes, filterForm.typePostes, filterForm.categoriePostes).subscribe((data) => {
        this.listDePosteAfficherEtudiant = data;

        this.listDePosteAfficherEtudiant.length === 0 ? this.message = true : this.message = false;
      },
      err => {

      });
  }

  ngOnInit() {
    this.message = false;
    this.getAll();
    this.getVilles();
  }

  getAll() {
    this.cvsService.getAllPublished().subscribe(
      (cvs: Cv[]) => {
        this.listDePosteAfficherEtudiant = cvs;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getVilles() {
    this.villeService.getAllForCv().subscribe(
      (villes: Ville[]) => {
        this.villes = villes;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

