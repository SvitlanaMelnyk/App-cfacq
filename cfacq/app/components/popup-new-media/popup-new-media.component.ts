import {Component, Inject, OnInit} from '@angular/core';
import {PopupNewEventComponent} from '../popup-new-event/popup-new-event.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Media} from '../../domaine/media';

@Component({
  selector: 'app-popup-new-media',
  templateUrl: './popup-new-media.component.html',
  styleUrls: ['./popup-new-media.component.css']
})
export class PopupNewMediaComponent implements OnInit {
  public form: FormGroup;
  public error_messages: any;
  error: string;
  file: File;
  filename: string;

  constructor(private  fb: FormBuilder, public dialogRef: MatDialogRef<PopupNewEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.media && data.media.image) {
      this.filename = data.media.image.nom;
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      // file: new FormControl((this.data.media && this.data.media.image) ? this.data.media.image.nom : '', Validators.required),
      description: new FormControl(this.data.media.description, [
        Validators.minLength(2),
        Validators.required
      ]),
      link: new FormControl(this.data.media.link,  [
      Validators.required
      ]),
    });

    this.error_messages = {
      // file: [
      //   {type: 'required', message: 'Ce champ est requis'}
      // ],
      description: [
        {type: 'required', message: 'La description est requise'},
        {type: 'minlength', message: 'La description doit être au moins 2 caractères'}
      ],
      link: [
        {type: 'required', message: 'Le lien est requis'}
      ]
    };
  }

  onChange(event: any) {
    if (event.srcElement.files.length === 0) {
      return;
    }

    this.file = event.srcElement.files[0];
    this.filename = this.file.name;
  }
  close() {
    this.dialogRef.close();
  }
  create() {
    if (this.form.valid && this.filename) {
      const d = this.form.value;
      const m = new Media();
      m.id = this.data.media.id;
      m.image = this.data.media.image;
      if (m.image) {
        m.image.fileImage = null;
      }
      if (d.image) {
        m.image = d.image;
      }
      m.description = d.description;
      m.link = d.link;
      const file = this.file;
      this.file = undefined;

      this.dialogRef.close({media: m, image: file});
    }
  }
}
