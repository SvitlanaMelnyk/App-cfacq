import {Component, OnInit} from '@angular/core';
import {InscriptionService} from '../../../services/inscription.service';
import {Inscription} from '../../domaine/inscription';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {Util} from '../../..//util/util';
import {Cours} from '../../domaine/cours';
import {CoursService} from '../../../services/cours.service';

@Component({
  selector: 'app-admin-inscriptions',
  templateUrl: './admin-inscriptions.component.html',
  styleUrls: ['./admin-inscriptions.component.css'],
  providers: [InscriptionService, CoursService]
})
export class AdminInscriptionsComponent implements OnInit {
  displayedColumns: string[] = ['prenom', 'nom', 'formation', 'telephone', 'courriel', 'date', 'act'];
  inscriptions: Inscription[];
  inscription: Inscription;
  formations: Cours[];

  constructor(private service: InscriptionService, public dialog: MatDialog, private coursService: CoursService) {
    this.inscriptions = [];
    this.formations = [];
  }

  ngOnInit() {
    this.getInscriptions();
    this.getFormations();
  }

  getInscriptions() {
    this.service.getAllInscriptions().subscribe((inscriptions: Inscription[]) => {
        this.inscriptions = inscriptions;
        this.inscriptions.forEach((e: Inscription) => {
          e.date = Util.getDateFromString(e.date);
          e.dateInscriptionString = Util.getDateString(e.date);
        });
        this.refreshFormationsLink();
      },
      error => {
        console.log(error);
      });
  }

  getFormations() {
    this.coursService.getAll().subscribe(
      (cours: Cours[]) => {
        this.formations = cours;
        this.refreshFormationsLink();
      },
      error => {
        console.log(error);
      }
    );
  }

  refreshFormationsLink() {
    this.inscriptions.forEach(ins => {
      ins.coursObj = this.formations.filter(e => e.id === ins.cours)[0];
    });
  }

  deleteInscription(inscription: Inscription) {
    this.inscription = inscription;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cette inscription?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doDeleteInscription();
      }
    });
  }

  doDeleteInscription() {
    this.service.deleteInscription(this.inscription).subscribe(() => {
        this.getInscriptions();
      },
      error => {
        console.log(error);
      });
  }

  toggleTaite(inscription: Inscription) {
    this.service.toggleTraite(inscription).subscribe(() => {
        this.getInscriptions();
      },
      error => {
        console.log(error);
      });
  }

}

