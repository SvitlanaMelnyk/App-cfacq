import {Component, OnInit} from '@angular/core';
import {Fichier} from '../../domaine/fichier';
import {CarrouselService} from '../../../services/carrousel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CarrouselService]
})
export class HomeComponent implements OnInit {

  images: any[];

  constructor(private service: CarrouselService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAllWithImage().subscribe((images: Fichier[]) => {
        this.images = [];
        images.forEach(e => {
          this.images.push({url: 'data:image/png;base64,' + e.fileImage});
        });
      },
      error => {
        console.log(error);
      });
  }
}
