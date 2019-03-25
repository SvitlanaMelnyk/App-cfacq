import {Component, Input, OnInit} from '@angular/core';
import {Actualite} from '../../domaine/actualite';
import {NewsService} from '../../../services/news.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.css'],
  providers: [NewsService]
})
export class SingleNewsComponent implements OnInit {

  @Input() singleNews: Actualite;

  images: string[];
  previewImages: any[];

  constructor(private newsService: NewsService, private route: ActivatedRoute) {
    this.singleNews = new Actualite();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.getNews(id);
    }
  }

  getNews(id: number) {
    this.newsService.getNewsById(id).subscribe(
      (data: Actualite) => {
        this.singleNews = data;

        this.images = [];
        this.singleNews.images.forEach(e => {
          this.images.push('http://localhost/sitecfacq.web/actualite/show?id=' + e.id);
        });
      },
      error => {
        console.log(error);
      });
  }

  preview(id: number) {
    const index = this.images.indexOf('http://localhost/sitecfacq.web/actualite/show?id=' + id);
    this.previewImages = this.images.slice(index);
    this.previewImages = this.previewImages.concat(this.images.slice(0, index));
  }

  closePreview() {
    this.previewImages = null;
  }
}
