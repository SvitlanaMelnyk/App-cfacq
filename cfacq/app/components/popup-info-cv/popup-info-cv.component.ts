import {Component, Inject, OnInit} from '@angular/core';
import {Cv} from '../../domaine/cv';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Cours} from '../../domaine/cours';
import {CoursService} from '../../../services/cours.service';
import {PopupNewEventComponent} from '../popup-new-event/popup-new-event.component';

@Component({
  selector: 'app-popup-info-cv',
  templateUrl: './popup-info-cv.component.html',
  styleUrls: ['./popup-info-cv.component.css'],
  providers: [CoursService]
})

export class PopupInfoCvComponent implements OnInit {

  cv: Cv;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private coursService: CoursService, public dialogRef: MatDialogRef<PopupNewEventComponent>) {
    this.cv = data.cv;
  }

  ngOnInit() {
    this.getCours();
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

  close() {
    this.dialogRef.close();
  }
}
