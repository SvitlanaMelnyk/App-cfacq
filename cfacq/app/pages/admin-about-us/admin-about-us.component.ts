import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AboutService} from '../../../services/about.service';
import {AboutUs} from '../../domaine/aboutUs';
import {Fichier} from '../../domaine/fichier';
import {MatDialog} from '@angular/material';
import {CarrouselService} from '../../../services/carrousel.service';
import {PopupNewAboutUsComponent} from '../../components/popup-new-about-us/popup-new-about-us.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-about-us',
  templateUrl: './admin-about-us.component.html',
  styleUrls: ['./admin-about-us.component.css'],
  providers: [AboutService, CarrouselService]
})
export class AdminAboutUsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'image', 'description', 'act'];

  aboutUs: AboutUs;
  aboutList: AboutUs[];
  previewVisible: boolean;
  imageLink: string;
  fichier: Fichier;
  image: any;
  imageMap: any = {};
  timer: any;

  constructor(private service: CarrouselService, private aboutService: AboutService, private changeDetector: ChangeDetectorRef, public dialog: MatDialog) {
    this.imageMap = {};
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.aboutService.getAll().subscribe(
      (aboutList: any[]) => {
        this.aboutList = aboutList;
        this.aboutList.forEach(e => {
          if (e.image) {
            this.loadImage(e.image);
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  getImage(image: Fichier) {
    if (image && image != null) {
      return this.imageMap[image.id];
    }
  }

  previewImage(image: Fichier) {
    if (image) {
      this.previewVisible = true;
      this.changeDetector.detectChanges();

      this.fichier = image;
      this.changeDetector.detectChanges();
    }
  }

  clearPreview() {
    this.previewVisible = false;
  }

  newAboutUs(aboutUs: AboutUs) {
    const dialogRef = this.dialog.open(PopupNewAboutUsComponent, {
      width: '500px',
      data: { aboutUs: aboutUs || new AboutUs()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result.aboutUs, result.file);
      }
    });
  }

  save(aboutUs: AboutUs, image: File) {
    this.aboutService.save(aboutUs, image).subscribe(
      () => {
        this.getAll();
      },
      (e: any) => {
        alert(e.toString());
      });
  }

  loadImage(data: Fichier, callback?: any) {
    if (this.imageMap[data.id] && this.imageMap[data.id] !== 'error') {
      if (callback) {
        callback();
      }
    } else {
      if (data.fileImage && (<any>data.fileImage instanceof File || <any>data.fileImage instanceof Blob)) {
        this.createImage(data, callback);
      } else {
        this.service.show(data.id)
          .subscribe(
            (fImage: string) => {
              if (fImage) {
                data.fileImage = fImage;
                this.createImage(data, callback);
              }
            },
            (error: string) => {
              this.imageMap[data.id] = 'error';
              data.fileImage = 'error';
              if (callback) {
                callback();
              }
              // this.message = <any>error;
              // this.isErrorMessage = true;
            });
      }
    }
  }

  createImage(data: Fichier, callback?: any) {
    const image = new Image();
    image.onload = () => {
      this.imageMap[data.id] = image;

      if (callback) {
        callback();
      }
    };
    if (data.fileImage && (<any>data.fileImage instanceof File || <any>data.fileImage instanceof Blob)) {
      const reader = new FileReader();
      reader.readAsDataURL(<any>data.fileImage);
      reader.onload = () => {
        image.src = <string>reader.result;
      };
    } else {
      image.src = 'data:image/png;base64,' + data.fileImage;
    }
  }

  deleteAboutUs(aboutUs: AboutUs) {
    this.aboutUs = aboutUs;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cette section?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doDelete();
      }
    });
  }

  doDelete() {
    this.aboutService.deleteAboutUs(this.aboutUs).subscribe(() => {
        this.getAll();
      },
      error => {
        console.log(error);
      });
  }

}
