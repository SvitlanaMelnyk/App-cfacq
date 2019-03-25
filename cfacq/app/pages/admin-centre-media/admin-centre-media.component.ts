import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Media} from '../../domaine/media';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {MediaService} from '../../../services/media.service';
import {PopupNewMediaComponent} from '../../components/popup-new-media/popup-new-media.component';
import {Fichier} from '../../domaine/fichier';
import {CarrouselService} from '../../../services/carrousel.service';

@Component({
  selector: 'app-admin-centre-media',
  templateUrl: './admin-centre-media.component.html',
  styleUrls: ['./admin-centre-media.component.css'],
  providers: [MediaService]
})
export class AdminCentreMediaComponent implements OnInit {
  displayedColumns: string[] = ['image', 'description', 'link', 'act'];

  medias: Media[];
  media: Media;
  previewVisible: boolean;
  imageLink: string;
  fichier: Fichier;
  imageMap: any = {};

  constructor(private carrouselService: CarrouselService, private service: MediaService, public dialog: MatDialog, private changeDetector: ChangeDetectorRef) {
    this.imageMap = {};
  }

  ngOnInit() {
    this.getAllMedia();
  }


  getAllMedia() {
    this.service.getAll().subscribe((medias: Media[]) => {
        this.medias = medias;
        this.medias.forEach(e => {
          if (e.image) {
            this.loadImage(e.image);
          }
        });
      },
      error => {
        console.log(error);
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

  deleteMedia(media: Media) {
    this.media = media;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ce media?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doDelete();
      }
    });
  }

  doDelete() {
    this.service.deleteMedia(this.media).subscribe(() => {
        this.getAllMedia();
      },
      error => {
        console.log(error);
      });
  }

  getImage(image: Fichier) {
    if (image && image != null) {
      return this.imageMap[image.id];
    }
  }

  newMedia(media: Media) {
    const dialogRef = this.dialog.open(PopupNewMediaComponent, {
      width: '500px',
      data: { media: media || new Media()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result.media, result.image);
      }
    });
  }

  save(media: Media, image: File) {
    this.service.save(media, image).subscribe(
      () => {
        this.getAllMedia();
      },
      (error) => {
        console.log(error);
      });
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

}

