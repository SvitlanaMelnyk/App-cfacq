import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {Fichier} from '../../domaine/fichier';
import {CarrouselService} from '../../../services/carrousel.service';
import {Actualite} from '../../domaine/actualite';
import {NewsService} from '../../../services/news.service';
import {PopupNewActualiteComponent} from '../../components/popup-new-actualite/popup-new-actualite.component';

@Component({
  selector: 'app-admin-actualites',
  templateUrl: './admin-actualites.component.html',
  styleUrls: ['./admin-actualites.component.css'],
  providers: [NewsService]
})
export class AdminActualitesComponent implements OnInit {
  displayedColumns: string[] = ['category', 'name', 'images', 'description', 'act'];

  actualites: Actualite[];
  actualite: Actualite;
  previewVisible: boolean;
  imageLink: string;
  fichier: Fichier;
  imageMap: any = {};

  previewLeft: number;

  constructor(private carrouselService: CarrouselService, private service: NewsService, public dialog: MatDialog, private changeDetector: ChangeDetectorRef) {
    this.imageMap = {};
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((actualites: Actualite[]) => {
        this.actualites = actualites;
      },
      error => {
        alert(error.toString());
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
        this.carrouselService.show(data.id)
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

  deleteActualite(actualite: Actualite) {
    this.actualite = actualite;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cet actualité?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doDelete();
      }
    });
  }

  doDelete() {
    this.service.deleteNews(this.actualite).subscribe(() => {
        this.getAll();
      },
      error => {
        alert(error.toString());
      });
  }

  getImage(image: Fichier) {
    if (image && image != null) {
      return this.imageMap[image.id];
    }
  }

  newActualite(actualite: Actualite) {
    const dialogRef = this.dialog.open(PopupNewActualiteComponent, {
      width: '500px',
      data: { actualite: actualite || new Actualite()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result.actualite, result.files);
      }
    });
  }

  save(actualite: Actualite, images: File[]) {
    this.service.save(actualite, images).subscribe(
      () => {
        this.getAll();
      },
      (e: any) => {
        alert(e.toString());
      });
  }


  previewImage(element: any, image: Fichier) {
    const padding = 20;
    this.previewLeft = element._elementRef.nativeElement.offsetLeft + element._elementRef.nativeElement.offsetWidth;
    this.previewVisible = true;
    this.changeDetector.detectChanges();

    this.loadImage(image, () => {
      this.fichier = image;
      this.changeDetector.detectChanges();

      if (this.fichier.id === 0) {
        this.imageLink = URL.createObjectURL(this.fichier.fileImage);
      } else {
        this.imageLink = 'http://localhost/sitecfacq.web/carrousel/get?id=' + this.fichier.id;
      }
    });
  }

  clearPreview() {
    this.fichier = null;
    this.previewLeft = 0;
    this.previewVisible = false;
  }

}

