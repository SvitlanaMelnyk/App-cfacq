import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../../services/news.service';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
  providers: [NewsService]
})

export class MainContentComponent implements OnInit {
  newsList: any[];
  imageMap: any;

  constructor(private newsService: NewsService) {
    this.newsList = [];
  }

  ngOnInit() {
    this.getThreeLastNews();
  }

  getThreeLastNews() {
    this.newsService.getThreeLastNews().subscribe(
      (newsList: any[]) => {
        this.newsList = newsList;
      },
      error => {
        console.log(error);
      }
    );
  }
}
