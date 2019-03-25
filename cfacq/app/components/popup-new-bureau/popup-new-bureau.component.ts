import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PopupNewEventComponent} from '../popup-new-event/popup-new-event.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Bureau} from '../../domaine/bureau';
import provinces from '../../domaine/provinces';
import pays from '../../domaine/pays';

@Component({
  selector: 'app-popup-new-bureau',
  templateUrl: './popup-new-bureau.component.html',
  styleUrls: ['./popup-new-bureau.component.css']
})
export class PopupNewBureauComponent implements OnInit {
  public form: FormGroup;
  public error_messages: any;
  provinces: any[];
  pays: any[];
  provinceObj: any;
  paysObj: any;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<PopupNewEventComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.provinces = provinces;
    this.pays = pays;

    if (data.bureau.adresse) {
      provinces.forEach(p => {
        if (data.bureau.adresse.province === p.value) {
          this.provinceObj = p;
        }
      });

      pays.forEach(p => {
        if (data.bureau.adresse.pays === p.value) {
          this.paysObj = p;
        }
      });
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      nom: new FormControl(this.data.bureau.nom, [
        Validators.minLength(2),
        Validators.required
      ]),
      noCivic: new FormControl(this.data.bureau.adresse.noCivic, [
        Validators.required
      ]),
      rue: new FormControl(this.data.bureau.adresse.rue, [
        Validators.required
      ]),
      rue2: new FormControl(this.data.bureau.adresse.rue2, []),
      ville: new FormControl(this.data.bureau.adresse.ville, []),
      province: new FormControl(this.provinceObj, []),
      pays: new FormControl(this.paysObj, []),
      codePostal: new FormControl(this.data.bureau.adresse.codePostal, []),
      telephone: new FormControl(this.data.bureau.adresse.telephone, []),
      telephonePoste: new FormControl(this.data.bureau.adresse.telephonePoste, []),
      telephone2: new FormControl(this.data.bureau.adresse.telephone2, []),
      telephone2Poste: new FormControl(this.data.bureau.adresse.telephone2Poste, []),
      fax: new FormControl(this.data.bureau.adresse.fax, []),
      courriel: new FormControl(this.data.bureau.adresse.courriel, [])
    });

    this.error_messages = {
      nom: [
        {type: 'required', message: 'Le nom est requis'},
        {type: 'minlength', message: 'Le nom doit être au moins 2 caractères'}
      ],
      noCivic: [
        {type: 'required', message: 'Le numéro civique est requis'}
      ],
      rue: [
        {type: 'required', message: 'La rue est requise'}
      ],
    };
  }

  close() {
    this.dialogRef.close();
  }

  create() {
    if (this.form.valid) {
      const d = this.form.value;
      const t = new Bureau();
      t.id = this.data.bureau.id;
      t.nom = d.nom;
      t.adresse.id = this.data.bureau.adresse.id;
      t.adresse.noCivic = d.noCivic;
      t.adresse.rue = d.rue;
      t.adresse.rue2 = d.rue2;
      t.adresse.ville = d.ville;
      t.adresse.province = d.province.value;
      t.adresse.pays = d.pays.value;
      t.adresse.codePostal = d.codePostal;
      t.adresse.telephone = d.telephone;
      t.adresse.telephonePoste = d.telephonePoste;
      t.adresse.telephone2 = d.telephone2;
      t.adresse.telephone2Poste = d.telephone2Poste;
      t.adresse.fax = d.fax;
      t.adresse.courriel = d.courriel;

      this.dialogRef.close(t);
    }
  }

}
