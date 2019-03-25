import {Component, Input, OnInit} from '@angular/core';
import {AboutUs} from '../../domaine/aboutUs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @Input() aboutList: AboutUs[];

  constructor() { }

  ngOnInit() {
  }

}
