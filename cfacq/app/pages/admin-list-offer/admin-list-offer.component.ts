import {Component, OnInit} from '@angular/core';
import {OfferService} from '../../../services/offer.service';
import {MatDialog} from '@angular/material';
import {Offer} from '../../domaine/offer';
import {PopupInfoOffreComponent} from '../../components/popup-info-offre/popup-info-offre.component';
import {PopupNewOfferComponent} from '../../components/popup-new-offer/popup-new-offer.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {FormGroup} from '@angular/forms';
import {FileCvService} from '../../../services/fileCv.service';
import {CvFichier} from '../../domaine/cvFichier';

@Component({
  selector: 'app-admin-list-offer',
  templateUrl: './admin-list-offer.component.html',
  styleUrls: ['./admin-list-offer.component.css'],
  providers: [OfferService]
})
export class AdminListOfferComponent implements OnInit {
  displayedColumns: string[] = ['nameCompany', 'titrePoste', 'city', 'act'];
  dataSource = '';

  listOffer: any[];
  offer: Offer;

  sending: boolean;
  success: boolean;

  file: any;

  fichier: any;

  constructor(private service: OfferService, public dialog: MatDialog) {
    this.fichier = {nom: ''};
  }


  ngOnInit() {
    this.getAll();
    this.getFichier();
  }

  getAll() {
    this.service.getAll().subscribe(
      (offers: Offer[]) => {
        this.listOffer = offers;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  show(offer) {
    this.dialog.open(PopupInfoOffreComponent, {
      data: {
        offer: offer
      }
    });
  }

  edit(offer: Offer) {
    const dialogRef = this.dialog.open(PopupNewOfferComponent, {
      width: '400px',
      data: { offer: offer}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  save(offer: Offer) {
    this.service.save(offer).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      });
  }

  deleteOffer(offer: Offer) {
    this.offer = offer;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cette offre?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doDelete();
      }
    });
  }

  doDelete() {
    this.service.deleteOffer(this.offer).subscribe(() => {
        this.getAll();
      },
      error => {
        console.log(error);
      });
  }

  publier(offer: Offer) {
    this.service.togglePublished(offer).subscribe(() => {
        this.getAll();
      },
      error => {
        console.log(error);
      });
  }


  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;
      this.sendFichier();
    }
  }


  sendFichier() {
    // file size 25mb = 25000000bytes
    if (!this.sending) {
      if (this.file && this.file.size <= 25000000) {
        this.sending = true;
        this.service.uploadFichier(this.file).subscribe(
          (data: any) => {
            this.fichier = data;
            this.sending = false;
            this.success = true;
          },
          () => {
            this.sending = false;
            this.success = false;
          });
      }
    }
  }

  getFichier() {
    this.service.getFichier().subscribe(
      (data: any) => {
        this.fichier = data;
        if (!this.fichier) {
          this.fichier = {nom: ''};
        }
      },
      () => {
        this.success = false;
      });
  }
  deleteFichier() {
    this.service.deleteFichier().subscribe(
      () => {
        this.success = true;
        this.fichier = {nom: ''};
      },
      () => {
        this.success = false;
      });
  }

  showFichier() {
    window.open('http://localhost/sitecfacq.web/intern/showFormulaire?attachment=false', '_blank');
  }
}









