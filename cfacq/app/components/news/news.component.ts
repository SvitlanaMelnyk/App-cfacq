import {Component, Input} from '@angular/core';
import {Actualite} from '../../domaine/actualite';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

  @Input() newsList: Actualite[];

  constructor() {
  }



}
