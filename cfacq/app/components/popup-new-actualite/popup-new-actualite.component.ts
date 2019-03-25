import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PopupNewEventComponent} from '../popup-new-event/popup-new-event.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Actualite} from '../../domaine/actualite';
import newsCategories from '../../domaine/newsCategories';

@Component({
  selector: 'app-popup-new-actualite',
  templateUrl: './popup-new-actualite.component.html',
  styleUrls: ['./popup-new-actualite.component.css']
})
export class PopupNewActualiteComponent implements OnInit {

  public form: FormGroup;
  public error_messages: any;

  categories: any[];
  categoryObj: any;
  fichiers: any[];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<PopupNewEventComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (!this.data.actualite.images) {
      this.data.actualite.images = [];
    }
    this.fichiers = this.data.actualite.images.map(e => ({data: e}));
    this.categories = newsCategories;

    if (data.actualite) {

      if (this.data.actualite.images.length === 0) {
        this.addFichier();
      }

      if (data.actualite.category) {
        newsCategories.forEach(c => {
          if (data.actualite.category === c.value) {
            this.categoryObj = c;
          }
        });
      }
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      category: new FormControl(this.categoryObj, []),
      name: new FormControl(this.data.actualite.name, Validators.required),
      description: new FormControl(this.data.actualite.description, Validators.required),
    });

    this.error_messages = {
      name: [
        {type: 'required', message: 'Le titre est requis'}
      ],
      description: [
        {type: 'required', message: 'La description est requise'}
      ],
    };
  }


  addFichier() {
    this.fichiers.push({data: {nom: ''}});
  }

  onFileChange(i: number, event: any) {
    const file = event.srcElement.files[0];
    if (file) {
      this.fichiers[i] = {data: {nom: file.name}, file: file};
    }
  }

  deleteFichier(i: number) {
    this.fichiers.splice(i, 1);
  }

  close() {
    this.dialogRef.close();
  }

  create() {
    const d = this.form.value;
    const t = new Actualite();
    t.id = this.data.actualite.id;
    t.category = d.category.value;
    t.name = d.name;
    const f = this.fichiers.map(fi => fi.data);
    const files = this.fichiers.map(fi => fi.file);

    t.images = f;
    t.description = d.description;
    this.fichiers = undefined;
    this.dialogRef.close({actualite: t, files: files});
  }
}
