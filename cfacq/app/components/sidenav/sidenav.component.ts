import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  closeSideNav() {
    this.close.emit();
  }
}
