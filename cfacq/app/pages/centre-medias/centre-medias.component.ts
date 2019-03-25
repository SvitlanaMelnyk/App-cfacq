import { Component, OnInit } from '@angular/core';
import {MediaService} from '../../../services/media.service';

@Component({
  selector: 'app-centre-medias',
  templateUrl: './centre-medias.component.html',
  styleUrls: ['./centre-medias.component.css'],
  providers: [MediaService]
})
export class CentreMediasComponent implements OnInit {
  mediaList: any[];

  constructor(private mediaService: MediaService  ) { }

  ngOnInit() {
    this.getAllMedia();
  }
  getAllMedia() {
    this.mediaService.getAll().subscribe(
      (mediaList: any[]) => {
        this.mediaList = mediaList;
      },
      error => {
        console.log(error);
      }
    );
  }
}


