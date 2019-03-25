import {Component, Inject, OnInit} from '@angular/core';
import {OfferService} from '../../../services/offer.service';
import {Offer} from '../../domaine/offer';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PopupNewEventComponent} from '../popup-new-event/popup-new-event.component';




@Component({
  selector: 'app-popup-info-offre',
  templateUrl: './popup-info-offre.component.html',
  styleUrls: ['./popup-info-offre.component.css'],
  providers: [OfferService]
})
export class PopupInfoOffreComponent implements OnInit {
  offer: Offer;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PopupNewEventComponent>) {
    this.offer = data.offer;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}


