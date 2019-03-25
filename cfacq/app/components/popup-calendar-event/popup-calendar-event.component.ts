import {Component, Inject, OnInit} from '@angular/core';
import {EventService} from '../../../services/event.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Event} from '../../domaine/event';
import {Adresse} from '../../domaine/adresse';
import {Util} from '../../../util/util';
import {PopupNewEventComponent} from '../popup-new-event/popup-new-event.component';

@Component({
  selector: 'app-popup-calendar-event',
  templateUrl: './popup-calendar-event.component.html',
  styleUrls: ['./popup-calendar-event.component.css'],
  providers: [EventService]
})
export class PopupCalendarEventComponent implements OnInit {
  event: Event;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PopupNewEventComponent>) {
    this.event = data.event;
  }

  ngOnInit() {
  }

  getHeures() {
    return this.event.dateStart.getDate() + ' ' + Util.getMoisFromDate(this.event.dateStart.getMonth()) + ' ' + this.event.dateStart.getFullYear() + ' / ' + Util.getTimeString(this.event.dateStart) + ' - ' + Util.getTimeString(this.event.dateEnd);
  }

  getAdresseString() {
    const t = new Adresse(this.event.adresse.noCivic, this.event.adresse.rue, this.event.adresse.rue2, this.event.ville.name, this.event.adresse.province, this.event.adresse.codePostal, this.event.adresse.pays, this.event.adresse.telephone, this.event.poste.courriel);
    return t.toString();
  }

  getPrice() {
    return this.event.price.toFixed(2);
  }

  close() {
    this.dialogRef.close();
  }

}
