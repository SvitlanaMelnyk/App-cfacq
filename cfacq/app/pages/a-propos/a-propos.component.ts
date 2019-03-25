import {Component, OnInit} from '@angular/core';
import {AboutUs} from '../../domaine/aboutUs';
import {AboutService} from '../../../services/about.service';
import {Bureau} from '../../domaine/bureau';
import {BureauService} from '../../../services/bureau.service';
import {CarrouselService} from '../../../services/carrousel.service';

@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.component.html',
  styleUrls: ['./a-propos.component.css'],
  providers: [AboutService, BureauService, CarrouselService]
})
export class AProposComponent implements OnInit {

  aboutList: AboutUs[];
  officeList: Bureau[];

  selectedAboutUs: AboutUs;
  selectedBureau: Bureau;
  imageMap: any;

  images: string[];
  previewImages: any[];

  constructor(private aboutService: AboutService, private service: BureauService) {
    this.aboutList = [];
    this.imageMap = {};
  }

  ngOnInit() {
    this.getAllAboutUs();
    this.getAllOffices();
  }

  getAllAboutUs() {
    this.aboutService.getAll().subscribe((data) => {
        this.aboutList = data;
        if (this.aboutList.length > 0) {
          this.selectedAboutUs = this.aboutList[0];
        }
      },
      error => {
        console.log(error);
      });
  }

  getAllOffices() {
    this.service.getAll().subscribe((bureaux: Bureau[]) => {
        this.officeList = bureaux.filter(e => e.locaux.length > 0);
      },
      error => {
        console.log(error);
      });
  }

  clickListAboutUs(about: AboutUs) {
    this.selectedAboutUs = about;
    this.selectedBureau = null;
  }

  clickListOffices(office: Bureau) {
    this.selectedBureau = office;
    this.selectedAboutUs = null;

    this.images = [];
    this.selectedBureau.locaux.forEach(l => {
        l.salles.forEach(s => {
          s.fichiers.forEach(f => {
            this.images.push('http://localhost/sitecfacq.web/actualite/show?id=' + f.id);
          });
        });
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
