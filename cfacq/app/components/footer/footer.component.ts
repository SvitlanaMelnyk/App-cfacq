import { Component, OnInit } from '@angular/core';
import {Bureau} from '../../domaine/bureau';
import {BureauService} from '../../../services/bureau.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [BureauService]
})
export class FooterComponent implements OnInit {
  bureaux: Bureau[];

  constructor(private service: BureauService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((bureaux: Bureau[]) => {
        this.bureaux = bureaux;
      },
      error => {
        console.log(error);
      });
  }

}
