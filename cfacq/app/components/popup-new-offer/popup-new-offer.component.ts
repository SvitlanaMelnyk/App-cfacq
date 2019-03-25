import { Component, Inject } from '@angular/core';
import {Offer} from '../../domaine/offer';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PopupNewEventComponent} from '../popup-new-event/popup-new-event.component';

@Component({
  selector: 'app-admin-edit-offer-dialog',
  templateUrl: './popup-new-offer.component.html',
  styleUrls: ['./popup-new-offer.component.css']
})
export class PopupNewOfferComponent {
  offer: Offer;

  constructor(public dialogRef: MatDialogRef<PopupNewEventComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.offer = data.offer;
  }

  close() {
    this.dialogRef.close();
  }

  change(offer: Offer) {
    if (offer) {
      offer.id = this.data.offer.id;
      this.dialogRef.close(offer);
    }
  }
}
