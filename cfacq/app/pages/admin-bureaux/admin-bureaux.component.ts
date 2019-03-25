import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {BureauService} from '../../../services/bureau.service';
import {Bureau} from '../../domaine/bureau';
import {Local} from '../../domaine/local';
import {Adresse} from '../../domaine/adresse';
import {PopupNewBureauComponent} from '../../components/popup-new-bureau/popup-new-bureau.component';

@Component({
  selector: 'app-admin-bureaux',
  templateUrl: './admin-bureaux.component.html',
  styleUrls: ['./admin-bureaux.component.css'],
  providers: [BureauService]
})
export class AdminBureauxComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'adresse', 'act'];
  bureaux: Bureau[];
  bureau: Bureau;

  constructor(private service: BureauService, public dialog: MatDialog) {
    this.bureaux = [];
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((bureaux: Bureau[]) => {
        this.bureaux = bureaux;
      },
      error => {
        console.log(error);
      });
  }

  newBureau(bureau: Bureau) {
    const dialogRef = this.dialog.open(PopupNewBureauComponent, {
      width: '300px',
      data: { bureau: bureau || new Bureau()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  save(bureau: Bureau) {
    this.service.save(bureau).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      });
  }

  deleteBureau(bureau: Bureau) {
    this.bureau = bureau;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ce bureau?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doDelete();
      }
    });
  }

  doDelete() {
    this.service.deleteBureau(this.bureau).subscribe(() => {
        this.getAll();
      },
      error => {
        console.log(error);
      });
  }

  getAdresseString(a: Adresse) {
    const t = new Adresse(a.noCivic, a.rue, a.rue2, a.ville, a.province, a.codePostal, a.pays, a.telephone, a.courriel);
    return t.toString();
  }

}
