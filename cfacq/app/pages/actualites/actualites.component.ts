import {Component, OnInit} from '@angular/core';
import {Actualite} from '../../domaine/actualite';
import {NewsService} from '../../../services/news.service';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css'],
  providers: [NewsService]
})
export class ActualitesComponent implements OnInit {
  newsList: Actualite[];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.getAll();
  }

  clickListActualites(category: string) {
    if (category === 'toutes') {
      this.getAll();
    } else {
      this.getNewsByCategory(category);
    }
  }

  getAll() {
    this.newsService.getAll().subscribe(
      (newsList: any[]) => {
        this.newsList = newsList;
      },
      error => {
        console.log(error);
      }
    );
  }

  getNewsByCategory(category) {
    this.newsService.getNewsByCategory(category).subscribe((data) => {
        this.newsList = data;
        console.log(this.newsList);
      },
      error => {
        console.log(error);
      });
  }
}
