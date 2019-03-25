import {Component, OnInit} from '@angular/core';
import {Cv} from '../../domaine/cv';
import {CvService} from '../../../services/cv.service';
import {ActivatedRoute} from '@angular/router';
import {Cours} from '../../domaine/cours';
import {CoursService} from '../../../services/cours.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-cv-student',
  templateUrl: './cv-student.component.html',
  styleUrls: ['./cv-student.component.css'],
  providers: [CvService, CoursService, UserService]
})
export class CvStudentComponent implements OnInit {

  cv: Cv;
  emailContact: string;

  constructor(private cvsService: CvService, private userService: UserService, private coursService: CoursService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getContact();
    this.getById();
  }

  getContact() {
    this.userService.getContacts().subscribe((data) => {
        this.emailContact = data.join(';');
        this.getCours();
      },
      error => {
        console.log(error);
      });
  }

  getById() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.cvsService.getById(id).subscribe((data) => {
        this.cv = data;
        this.getCours();
      },
      error => {
        console.log(error);
      });
  }

  getCours() {
    this.coursService.getAll().subscribe(
      (cours: Cours[]) => {
        if (this.cv.student && this.cv.student.cours) {
          const t = cours.filter(e => e.id === this.cv.student.cours);
          if (t.length > 0) {
            this.cv.student.coursString = t[0].nom;
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
