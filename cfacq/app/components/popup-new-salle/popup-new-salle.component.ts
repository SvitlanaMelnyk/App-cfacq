import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PopupNewEventComponent} from '../popup-new-event/popup-new-event.component';
import {Poste} from '../../domaine/poste';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Bureau} from '../../domaine/bureau';
import {BureauService} from '../../../services/bureau.service';
import {Salle} from '../../domaine/salle';
import {Fichier} from '../../domaine/fichier';

@Component({
  selector: 'app-popup-new-salle',
  templateUrl: './popup-new-salle.component.html',
  styleUrls: ['./popup-new-salle.component.css']
})
export class PopupNewSalleComponent implements OnInit {
  public form: FormGroup;
  public error_messages: any;
  bureaux: Bureau[];
  fichiers: any[];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<PopupNewSalleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.fichiers = this.data.salle.fichiers.map(e => ({data: e}));
  }

  ngOnInit() {
    this.form = this.fb.group({
      nom: new FormControl(this.data.salle.nom, [
        Validators.minLength(2),
        Validators.required
      ])
    });

    this.error_messages = {
      nom: [
        {type: 'required', message: 'Le nom est requis'},
        {type: 'minlength', message: 'Le nom doit être au moins 2 caractères'}
      ]
    };

    if (this.data.salle.fichiers.length === 0) {
      this.addFichier();
    }
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
    if (this.form.valid) {
      const d = this.form.value;
      const t = new Salle();
      t.id = this.data.salle.id;
      t.nom = d.nom;

      const f = this.fichiers.map(fi => fi.data);
      const files = this.fichiers.filter(fi => fi.file).map(fi => fi.file);

      t.fichiers = f;

      this.fichiers = undefined;
      this.dialogRef.close({salle: t, files: files});
    }
  }
}
