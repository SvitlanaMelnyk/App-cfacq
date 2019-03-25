import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PosteService} from '../../../services/poste.service';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {Salle} from '../../domaine/salle';
import {SalleService} from '../../../services/salle.service';
import {PopupNewSalleComponent} from '../../components/popup-new-salle/popup-new-salle.component';
import {Fichier} from '../../domaine/fichier';
import {CarrouselService} from '../../../services/carrousel.service';

@Component({
  selector: 'app-admin-salle',
  templateUrl: './admin-salle.component.html',
  styleUrls: ['./admin-salle.component.css'],
  providers: [PosteService, CarrouselService]
})
export class AdminSalleComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'images', 'act'];
  salles: Salle[];
  salle: Salle;
  imageMap: any = {};
  fichier: Fichier;
  previewLeft: number;
  previewVisible: boolean;
  imageLink: string;

  constructor(private service: SalleService, public dialog: MatDialog, private changeDetector: ChangeDetectorRef, private serviceCarrousel: CarrouselService) {
    this.salles = [];
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((salles: Salle[]) => {
        this.salles = salles;
      },
      error => {
        console.log(error);
      });
  }

  newSalle(salle: Salle) {
    const dialogRef = this.dialog.open(PopupNewSalleComponent, {
      width: '300px',
      data: { salle: salle || new Salle()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result.salle, result.files);
      }
    });
  }

  deleteSalle(salle: Salle) {
    this.salle = salle;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cette salle?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doDelete();
      }
    });
  }

  save(salle: Salle, files: File[]) {
    this.service.save(salle, files).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      });
  }

  doDelete() {
    this.service.deleteSalle(this.salle).subscribe(() => {
        this.getAll();
      },
      error => {
        console.log(error);
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
        this.serviceCarrousel.show(data.id)
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
}
