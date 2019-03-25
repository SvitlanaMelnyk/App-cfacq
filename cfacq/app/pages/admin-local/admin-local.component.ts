import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Local} from '../../domaine/local';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {PopupNewLocalComponent} from '../../components/popup-new-local/popup-new-local.component';
import {LocauxService} from '../../../services/local.service';

@Component({
  selector: 'app-admin-local',
  templateUrl: './admin-local.component.html',
  styleUrls: ['./admin-local.component.css'],
  providers: [LocauxService]
})
export class AdminLocalComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'salles', 'bureau', 'act'];
  locaux: Local[];
  local: Local;

  constructor(private service: LocauxService, public dialog: MatDialog) {
    this.locaux = [];
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((locaux: Local[]) => {
        this.locaux = locaux;
      },
      error => {
        console.log(error);
      });
  }

  newLocal(local: Local) {
    const dialogRef = this.dialog.open(PopupNewLocalComponent, {
      width: '300px',
      data: {local: local || new Local()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  save(local: Local) {
    this.service.save(local).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      });
  }

  deleteLocal(local: Local) {
    this.local = local;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ce local?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doDelete();
      }
    });
  }

  doDelete() {
    this.service.deleteLocal(this.local).subscribe(() => {
        this.getAll();
      },
      error => {
        console.log(error);
      });
  }

  getSallesString(local: Local) {
    return local.salles.map(s => s.nom).join(', ');
  }
}
