import { Component, OnInit } from '@angular/core';
import {Bureau} from '../../domaine/bureau';
import {PosteService} from '../../../services/poste.service';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {Poste} from '../../domaine/poste';
import {PopupNewPosteComponent} from '../../components/popup-new-poste/popup-new-poste.component';

@Component({
  selector: 'app-admin-poste',
  templateUrl: './admin-poste.component.html',
  styleUrls: ['./admin-poste.component.css'],
  providers: [PosteService]
})
export class AdminPosteComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'numero', 'titre', 'courriel', 'bureau', 'act'];
  postes: Poste[];
  poste: Poste;

  constructor(private service: PosteService, public dialog: MatDialog) {
    this.postes = [];
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((postes: Poste[]) => {
        this.postes = postes;
      },
      error => {
        console.log(error);
      });
  }

  newPoste(poste: Poste) {
    const dialogRef = this.dialog.open(PopupNewPosteComponent, {
      width: '300px',
      data: { poste: poste || new Poste()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  save(poste: Poste) {
    this.service.save(poste).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      });
  }

  deletePoste(poste: Poste) {
    this.poste = poste;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ce poste?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doDelete();
      }
    });
  }

  doDelete() {
    this.service.deletePoste(this.poste).subscribe(() => {
        this.getAll();
      },
      error => {
        console.log(error);
      });
  }
}
