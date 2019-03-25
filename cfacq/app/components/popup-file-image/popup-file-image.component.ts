import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PopupNewEventComponent} from '../popup-new-event/popup-new-event.component';

@Component({
  selector: 'app-popup-file-image',
  templateUrl: './popup-file-image.component.html',
  styleUrls: ['./popup-file-image.component.css']
})
export class PopupFileImageComponent implements OnInit {
  error: string;
  file: File;
  filename: string;

  constructor(public dialogRef: MatDialogRef<PopupNewEventComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  onChange(event: any) {
    if (event.srcElement.files.length === 0) {
      return;
    }

    this.file = event.srcElement.files[0];
    this.filename = this.file.name;
  }

  join() {
    if (!this.file) {
      this.error = 'Le fichier est requis';
    } else {
      this.dialogRef.close(this.file);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
