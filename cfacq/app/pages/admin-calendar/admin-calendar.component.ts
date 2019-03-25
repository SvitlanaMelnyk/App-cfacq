import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {EventService} from '../../../services/event.service';
import {Ville} from '../../domaine/ville';
import {Event} from '../../domaine/event';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {PopupNewEventComponent} from '../../components/popup-new-event/popup-new-event.component';
import {Util} from 'src/util/util';
import {VillesService} from '../../../services/villes.service';
import {PopupCalendarEventComponent} from '../../components/popup-calendar-event/popup-calendar-event.component';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css'],
  providers: [EventService]
})
export class AdminCalendarComponent implements OnInit {

  date: Date;
  dateEnd: Date;
  ville: Ville;
  events: Event[];
  event: Event;

  constructor(private service: EventService, public dialog: MatDialog) {
    this.date = new Date();
    this.initDates();
  }

  initDates() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    const lastDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    const lastDay = lastDate.getDay();
    this.dateEnd = new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, lastDate.getDate() + (7 - lastDay));
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll(this.date, this.dateEnd, this.ville).subscribe(
      (events: Event[]) => {
        this.events = events;
      },
      (error) => {
        console.log(error);
      });
  }

  onChangeMonth(date: Date, dateEnd: Date, ville: Ville) {
    this.date = date;
    this.dateEnd = dateEnd;
    this.ville = ville;
    this.getAll();
  }

  newEvent(event: Event) {
    const dialogRef = this.dialog.open(PopupNewEventComponent, {
      width: '400px',
      data: { event: event || new Event()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  save(event: Event) {
    this.service.save(event).subscribe(
      (e) => {
        this.date = Util.getDateFromString(e.dateStart);
        this.initDates();
        this.getAll();
      },
      (error) => {
        console.log(error);
      });
  }

  onRemove(event: Event) {
    this.event = event;
    const dateStart = Util.getDateString(event.dateStart);
    const dateEnd = Util.getDateString(event.dateEnd);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Suppression',
        message: `Êtes-vous sûr de vouloir supprimer l'événement "${event.name}" du ${dateStart} au ${dateEnd}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doRemove();
      }
    });
  }

  doRemove() {
    this.service.deleteEvent(this.event).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      });
  }

  onGetInfo(event: Event) {
    this.dialog.open(PopupCalendarEventComponent, {
      width: '300px',
      data: { event: event || new Event()}
    });
  }
}
