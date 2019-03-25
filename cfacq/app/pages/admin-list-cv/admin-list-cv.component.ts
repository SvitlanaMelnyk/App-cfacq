import { Component, OnInit } from '@angular/core';
import {Cv} from '../../domaine/cv';
import {CvService} from '../../../services/cv.service';
import {MatDialog} from '@angular/material';
import {PopupInfoCvComponent} from '../../components/popup-info-cv/popup-info-cv.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {Offer} from '../../domaine/offer';
import {PopupNewCvComponent} from '../../components/popup-new-cv/popup-new-cv.component';
import {Cours} from '../../domaine/cours';
import {CoursService} from '../../../services/cours.service';
import {CvFichier} from '../../domaine/cvFichier';

@Component({
  selector: 'app-admin-list-cv',
  templateUrl: './admin-list-cv.component.html',
  styleUrls: ['./admin-list-cv.component.css'],
  providers: [CvService, CoursService]
})

export class AdminListCvComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'name', 'titre', 'city', 'act'];
  displayedColumnsFichier: string[] = ['date', 'name', 'act'];
  dataSource = '';

  listCv: Cv[];
  listCvFichier: CvFichier[];
  cv: any;

  constructor(private service: CvService, private coursService: CoursService, public dialog: MatDialog) {
    this.listCv = [];
    this.listCvFichier = [];
  }

  ngOnInit() {
    this.getAll();
    this.getAllFichiers();
  }

  getAll() {
    this.service.getAll().subscribe(
      (cvs: Cv[]) => {
        this.listCv = cvs;
        this.getCours();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllFichiers() {
    this.service.getAllFichiers().subscribe(
      (cvs: CvFichier[]) => {
        this.listCvFichier = cvs;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCours() {
    this.coursService.getAll().subscribe(
      (cours: Cours[]) => {
        this.listCv.forEach(cv => {
          if (cv.student && cv.student.cours) {
            const t = cours.filter(e => e.id === cv.student.cours);
            if (t.length > 0) {
              cv.student.coursString = t[0].nom;
            }
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  showInfo(cv) {
    this.dialog.open(PopupInfoCvComponent, {
      data: {
        cv: cv
      }
    });
  }

  edit(cv) {
    const dialogRef = this.dialog.open(PopupNewCvComponent, {
      width: '400px',
      data: { cv: cv}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  save(cv: Cv) {
    this.service.save(cv).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      });
  }

  deleteCv(cv: Cv) {
    this.cv = cv;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ce CV?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doDeleteCv();
      }
    });
  }

  deleteCvFichier(cv: CvFichier) {
    this.cv = cv;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ce CV?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doDeleteCvFichier();
      }
    });
  }

  doDeleteCv() {
    this.service.deleteCv(this.cv).subscribe(() => {
        this.getAll();
      },
      error => {
        console.log(error);
      });
  }

  doDeleteCvFichier() {
    this.service.deleteCvFichier(this.cv).subscribe(() => {
        this.getAllFichiers();
      },
      error => {
        console.log(error);
      });
  }

  publier(cv: Cv) {
    this.service.togglePublished(cv).subscribe(() => {
        this.getAll();
      },
      error => {
        console.log(error);
      });
  }

  showFichier(cv: CvFichier) {
    window.open('http://localhost/sitecfacq.web/cv/show?id=' + cv.fichier.id, '_blank');
  }
}




