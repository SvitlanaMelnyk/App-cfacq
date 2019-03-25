import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Fichier} from '../../domaine/fichier';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {CarrouselService} from '../../../services/carrousel.service';
import {PopupFileImageComponent} from '../../components/popup-file-image/popup-file-image.component';

@Component({
  selector: 'app-admin-carrousel',
  templateUrl: './admin-carrousel.component.html',
  styleUrls: ['./admin-carrousel.component.css'],
  providers: [CarrouselService]
})
export class AdminCarrouselComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'act'];
  images: Fichier[];
  image: Fichier;
  imageMap: any = {};
  fichier: Fichier;
  previewLeft: number;
  previewVisible: boolean;
  imageLink: string;

  constructor(private service: CarrouselService, public dialog: MatDialog, private changeDetector: ChangeDetectorRef) {
    this.images = [];
  }

  ngOnInit() {
    this.getAll();
  }

  previewImage(element: any, image: Fichier) {
    const padding = 20;
    this.previewLeft = element._elementRef.nativeElement.offsetLeft + padding;
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

  getAll() {
    this.service.getAll().subscribe((images: Fichier[]) => {
        this.images = images;
      },
      error => {
        console.log(error);
      });
  }

  onGetImage(data: Fichier) {
    this.loadImage(data);

    if (data.id === 0) {
      this.imageLink = URL.createObjectURL(data.fileImage);
    } else {
      this.imageLink = 'http://localhost/sitecfacq.web/carrousel/get?id=' + data.id;
    }
  }

  loadImage(data: Fichier, callback?: any) {
    if (this.imageMap[data.id] && this.imageMap[data.id] !== 'error') {
      this.fichier = data;
      if (callback) {
        callback();
      }
    } else {
      if (data.fileImage && (<any>data.fileImage instanceof File || <any>data.fileImage instanceof Blob)) {
        this.fichier = data;
        this.createImage(data, callback);
      } else {
        this.service.show(data.id)
          .subscribe(
            (fImage: string) => {
              if (fImage) {
                this.fichier = data;
                data.fileImage = fImage;
                this.createImage(data, callback);
              }
            },
            (error: string) => {
              this.imageMap[data.id] = 'error';
              this.fichier = data;
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

  newImage() {
    const dialogRef = this.dialog.open(PopupFileImageComponent, {
      width: '300px',
      data: {image: new Fichier()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  save(fichier: File) {
    this.service.save(fichier).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      });
  }

  deleteImage(image: Fichier) {
    this.image = image;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cette image?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doDelete();
      }
    });
  }

  doDelete() {
    this.service.deleteImage(this.image).subscribe(() => {
        this.getAll();
      },
      error => {
        console.log(error);
      });
  }

}
