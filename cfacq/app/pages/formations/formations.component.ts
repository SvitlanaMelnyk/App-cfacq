import {Component, OnInit} from '@angular/core';
import {Formation} from '../../domaine/formation';
import {Cours} from '../../domaine/cours';
import {Mapaq} from '../../domaine/mapaq';
import {CoursService} from '../../../services/cours.service';


@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css'],
  providers: [CoursService]
})

export class FormationsComponent implements OnInit {

  cours: Cours[];
  selectedCours: Cours;

  constructor(private service: CoursService) {

  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(
      (cours: Cours[]) => {
        this.cours = cours;
        this.cours.forEach(c => {
          c.link = ['/etudiants/inscription/', c.id];
        });
        this.selectedCours = this.cours[0];
      },
      error => {
        console.log(error);
      }
    );
  }

  select(t: any) {
    this.selectedCours = t;
  }
}
