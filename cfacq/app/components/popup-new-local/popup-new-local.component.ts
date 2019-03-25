import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Local} from '../../domaine/local';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Bureau} from '../../domaine/bureau';
import {Salle} from '../../domaine/salle';
import {BureauService} from '../../../services/bureau.service';
import {SalleService} from '../../../services/salle.service';

@Component({
  selector: 'app-popup-new-local',
  templateUrl: './popup-new-local.component.html',
  styleUrls: ['./popup-new-local.component.css']
})
export class PopupNewLocalComponent implements OnInit {
  public form: FormGroup;
  public error_messages: any;
  bureaux: Bureau[];
  salles: Salle[];
  sallesSelected: Salle[];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<PopupNewLocalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private service: BureauService, private serviceSalle: SalleService, private cd: ChangeDetectorRef) {
    this.sallesSelected = [];
  }

  ngOnInit() {
    this.form = this.fb.group({
      nom: new FormControl(this.data.local.nom, [
        Validators.minLength(2),
        Validators.required
      ]),
      bureau: new FormControl(this.data.local.bureau, [Validators.required]),
      salles: this.fb.array(this.createSallesItem(this.data.local.salles))
    });

    this.error_messages = {
      nom: [
        {type: 'required', message: 'Le nom est requis'},
        {type: 'minlength', message: 'Le nom doit être au moins 2 caractères'}
      ],
      bureau: [
        {type: 'required', message: 'Le bureau est requis'}
      ],
      salles: [
        {type: 'required', message: 'La salle est requise'}
      ]
    };

    this.getBureaux();
    this.getSalles();
  }

  selectSalle(id: number, salle: Salle) {
    this.sallesSelected[id] = salle;
  }

  createSallesItem(salles: Salle[]) {
    if (!salles || salles.length === 0) {
      return [this.createItem()];
    } else {
      const t = [];

      salles.forEach(e => {
        t.push(this.createItem(e));
      });

      return t;
    }
  }

  createItem(salle?: Salle): FormGroup {
    const t = salle || new Salle();
    return this.fb.group(t);
  }

  addSalle() {
    (this.form.get('salles') as FormArray).push(this.createItem());
  }

  deleteSalle(i: number) {
    this.sallesSelected[i] = undefined;
    this.sallesSelected = this.sallesSelected.filter(function (el) {
      return el;
    });
    (this.form.get('salles') as FormArray).removeAt(i);
  }

  getBureaux() {
    this.service.getAll().subscribe((bureaux: Bureau[]) => {
        this.bureaux = bureaux;

        if (this.data.local.bureau) {
          const c = this.bureaux.filter(e => e.id === this.data.local.bureau.id);
          if (c.length > 0) {
            this.form.get('bureau').setValue(c[0]);
          }
        }
      },
      error => {
        console.log(error);
      });
  }

  getSalles() {
    this.serviceSalle.getAll().subscribe((salles: Salle[]) => {
        this.salles = salles;

        if (this.data.local.bureau) {
          const c = this.salles.filter(e => e.id === this.data.local.salles.id);
          if (c.length > 0) {
            this.form.get('salles').setValue(this.fb.array(this.createSallesItem(this.data.local.salles)));
          }
        }
      },
      error => {
        console.log(error);
      });
  }

  close() {
    this.dialogRef.close();
  }

  create() {
    if (this.form.valid) {
      const d = this.form.value;
      const t = new Local();
      t.id = this.data.local.id;
      t.nom = d.nom;
      t.salles = this.sallesSelected;
      t.bureau = d.bureau;

      this.dialogRef.close(t);
    }
  }
}
