import { Component, OnInit } from '@angular/core';
import {EventService} from '../../../services/event.service';
import {Ville} from '../../domaine/ville';
import {PopupCalendarEventComponent} from '../../components/popup-calendar-event/popup-calendar-event.component';
import {MatDialog} from '@angular/material';
import {Event} from '../../domaine/event';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css'],
  providers: [EventService]
})
export class CalendrierPageComponent implements OnInit {

  date: Date;
  dateEnd: Date;
  ville: Ville;
  events: Event[];

  constructor(private service: EventService, public dialog: MatDialog) {
    this.date = new Date();
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
      (events: any[]) => {
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

  onGetInfo(event: Event) {
    this.dialog.open(PopupCalendarEventComponent, {
      width: '300px',
      data: { event: event || new Event()}
    });
  }

}
