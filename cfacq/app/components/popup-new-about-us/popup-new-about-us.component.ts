import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AboutUs} from '../../domaine/aboutUs';

@Component({
  selector: 'app-popup-new-about-us',
  templateUrl: './popup-new-about-us.component.html',
  styleUrls: ['./popup-new-about-us.component.css']
})
export class PopupNewAboutUsComponent implements OnInit {
  public form: FormGroup;
  public error_messages: any;
  error: string;
  file: File;
  filename: string;

  constructor(private  fb: FormBuilder, public dialogRef: MatDialogRef<PopupNewAboutUsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.aboutUs && data.aboutUs.image) {
      this.filename = data.aboutUs.image.nom;
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      // file: new FormControl((this.data.media && this.data.media.image) ? this.data.media.image.nom : '', Validators.required),
      name: new FormControl(this.data.aboutUs.name, [
        Validators.minLength(2),
        Validators.required
      ]),
      description: new FormControl(this.data.aboutUs.description, [
        Validators.minLength(2),
        Validators.required
      ])
    });

    this.error_messages = {
      name: [
        {type: 'required', message: 'Le nom est requis'}
      ],
      description: [
        {type: 'required', message: 'La description est requise'},
        {type: 'minlength', message: 'La description doit être au moins 2 caractères'}
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
      const m = new AboutUs();
      m.id = this.data.aboutUs.id;
      m.image = this.data.aboutUs.image;
      if (m.image) {
        m.image.fileImage = null;
      }
      if (d.image) {
        m.image = d.image;
      }
      m.name = d.name;
      m.description = d.description;
      const file = this.file;
      this.file = undefined;

      this.dialogRef.close({aboutUs: m, file: file});
    }
  }
}
