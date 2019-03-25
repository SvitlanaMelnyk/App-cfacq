export class CalendarDay {
  date: Date;
  day: any;
  events: any[];
  isCurrentMonth: boolean;
  isCurrentDay: boolean;

  constructor(date: Date, day: any, events: any[], isCurrentMonth: boolean, isCurrentDay: boolean) {
    this.date = date;
    this.day = day;
    this.events = events;
    this.isCurrentMonth = isCurrentMonth;
    this.isCurrentDay = isCurrentDay;
  }
}
