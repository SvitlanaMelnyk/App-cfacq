import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {CalendarDay} from '../../domaine/calendar-day';
import {EventService} from '../../../services/event.service';
import {VillesService} from '../../../services/villes.service';

import {Ville} from '../../domaine/ville';
import {Util} from '../../../util/util';
import {Event} from '../../domaine/event';

@Component({
  selector: 'app-calendrier-component',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css'],
  providers: [EventService, VillesService]
})
export class CalendrierComponent implements OnInit, OnChanges {
  villes: Ville[];
  villesSelectable: Ville[];
  currentMonth;
  days: CalendarDay[];
  day;
  currentDate;
  months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ];
  selectedVille: Ville;
  noEvent: boolean;

  @Input() events: Event[];
  @Input() editable: boolean;

  @Output() changeMonth = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() getInfo = new EventEmitter();

  villesMap: any;

  constructor(private villesService: VillesService) {
    this.currentDate = new Date();
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    this.currentMonth = this.months[this.currentDate.getMonth()] + ' ' + this.currentDate.getFullYear();

    this.villesMap = {};
    this.getDays();
  }

  ngOnInit() {
    this.getVilles();
    this.day = this.days;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['events']) {
      this.parseEvents();
    }
  }

  parseEvents() {
    this.days.map(day => day.events = []);
    this.noEvent = true;

    if (this.events) {
      this.events.forEach((event: Event) => {
        event.dateStart = Util.getDateFromString(event.dateStart);
        event.dateEnd = Util.getDateFromString(event.dateEnd);

        this.days.forEach((day: CalendarDay) => {
          if (day.date >= event.dateStart && day.date <= event.dateEnd || Util.getDateString(day.date) === Util.getDateString(event.dateStart)) {
            day.events.push(event);
          }
        });

        if (event.ville && !this.villesMap[event.ville.id]) {
          const ville = this.getVilleById(event.ville.id);
          if (ville) {
            this.villesMap[event.ville.id] = ville;
          }
        }
      });

      this.noEvent = this.events.length === 0;

      this.villesSelectable = [];
      for (const key in this.villesMap) {
        if (this.villesMap.hasOwnProperty(key)) {
          this.villesSelectable.push(this.villesMap[key]);
        }
      }
      this.villesSelectable.unshift({
        id: -1,
        name: 'Toutes les villes'
      });
    }
  }

  getVilleById(id: number) {
    if (this.villes) {
      return this.villes.find(e => e.id === id);
    }
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.currentMonth = this.months[this.currentDate.getMonth()] + ' ' + this.currentDate.getFullYear();
    this.getDays();
    this.changeMonth.emit({date: this.days[0].date, dateEnd: this.days[this.days.length - 1].date, ville: this.selectedVille});
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.currentMonth = this.months[this.currentDate.getMonth()] + ' ' + this.currentDate.getFullYear();
    this.getDays();
    this.changeMonth.emit({date: this.days[0].date, dateEnd: this.days[this.days.length - 1].date, ville: this.selectedVille});
  }

  getDays() {
    this.days = [];
    const firstDay = this.currentDate.getDay();
    const today = new Date();
    for (let i = firstDay; i > 0; i--) {
      const day = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - i);
      this.days.push(new CalendarDay(day, day.getDate(), [], false, false));
    }
    for (let i = 0; i < this.daysInMonth(this.currentDate.getFullYear(), this.currentDate.getMonth()); i++) {
      const day = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + i);
      this.days.push(new CalendarDay(day, day.getDate(), [], true, today.getDate() === day.getDate() && today.getMonth() === day.getMonth() && today.getFullYear() === day.getFullYear()));
    }

    const lastDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const lastDay = lastDate.getDay();
    for (let i = 1; i < 7 - lastDay; i++) {
      const day = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() + i);
      this.days.push(new CalendarDay(day, day.getDate(), [], false, false));
    }
  }

  daysInMonth(iYear, iMonth) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  getZeroMonth(day) {
    if ((day.date.getMonth() + 1) < 10) {
      return '0' + (day.date.getMonth() + 1);
    } else {
      return (day.date.getMonth() + 1);
    }
  }

  getZeroDay(day) {
    if (day.date.getDate() < 10) {
      return '0' + (day.date.getDate());
    } else {
      return day.date.getDate();
    }
  }

  getVilles() {
    this.villesService.getAll().subscribe(
      (villes: Ville[]) => {
        this.villes = villes;
        this.parseEvents();
      },
      error => {
        console.log(error);
      }
    );
  }

  getByCity(ville: Ville) {
    if (ville.id === -1) {
      ville = null;
    }
    this.selectedVille = ville;
    this.changeMonth.emit({date: this.days[0].date, dateEnd: this.days[this.days.length - 1].date, ville: this.selectedVille});
  }

  onEdit(event: Event) {
    this.edit.emit(event);
  }

  onRemove(event: Event) {
    this.remove.emit(event);
  }

  onGetInfo(event: Event) {
    this.getInfo.emit(event);
  }
}
