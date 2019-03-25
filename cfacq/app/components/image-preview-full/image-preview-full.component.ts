import {
  Component,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  ChangeDetectorRef
} from '@angular/core';
import {ImagePreviewComponent} from '../image-preview/image-preview.component';

@Component({
  selector: 'app-image-preview-full',
  template: `
    <div class="facturePreview fixed">
      <div class="facturePreviewButton">
        <button text="Fermer" (onClick)="closePreview()"></button>
      </div>
      <app-image-preview #imagePreview
                     [img]="img"
                     [visible]="visible"
                     [imagelink]="imagelink"
                     (getImage)="onGetImage($event)"></app-image-preview>
    </div>`,
  styleUrls: ['./image-preview-full.component.css']
})
export class ImagePreviewFullComponent implements AfterViewInit, OnChanges {
  @Input() img: any;
  @Input() index: number;
  @Input() imagelink: string;
  @Input() canDelete: boolean;
  @Input() visible: boolean;

  @Output() getImage = new EventEmitter();
  @Output() fonctionSupprimerImage = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() imageLoaded = new EventEmitter();
  @Output() showPdf = new EventEmitter();

  @ViewChild(ImagePreviewComponent) private imagePreview: ImagePreviewComponent;
  context: any;

  position: any;

  isSearching: boolean;
  searchText: string;

  constructor(private el: ElementRef) {
    this.index = 0;
    this.isSearching = false;
  }

  ngAfterViewInit() {

  }

  ngOnChanges() {

  }

  changingPage() {
    this.isSearching = false;
    this.searchText = '';
  }

  closePreview() {
    this.visible = false;
    if (this.close) {
      this.close.emit();
    }
  }

  onGetImage(event: any) {
    this.getImage.emit(event);
  }

  supprimerImage() {
    this.fonctionSupprimerImage.emit();
  }
}
