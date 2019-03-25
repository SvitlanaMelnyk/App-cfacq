import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PopupNewEventComponent} from '../popup-new-event/popup-new-event.component';
import {Cv} from '../../domaine/cv';

@Component({
  selector: 'app-popup-new-cv',
  templateUrl: './popup-new-cv.component.html',
  styleUrls: ['./popup-new-cv.component.css']
})
export class PopupNewCvComponent implements OnInit {

  cv: Cv;

  constructor(public dialogRef: MatDialogRef<PopupNewEventComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cv = data.cv;
  }

  ngOnInit() {
  }

  onSubmit(cv?: Cv) {
    this.dialogRef.close(cv);
  }

}
