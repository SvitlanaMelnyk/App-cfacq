import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-content-mobile',
  templateUrl: './menu-content-mobile.component.html',
  styleUrls: ['./menu-content-mobile.component.css']
})
export class MenuContentMobileComponent implements OnInit {

  @Input() employeur: boolean;

  constructor() { }

  ngOnInit() {
  }

}
