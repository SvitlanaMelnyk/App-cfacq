import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PopupNewEventComponent} from '../popup-new-event/popup-new-event.component';
import {Poste} from '../../domaine/poste';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Bureau} from '../../domaine/bureau';
import {BureauService} from '../../../services/bureau.service';

@Component({
  selector: 'app-popup-new-poste',
  templateUrl: './popup-new-poste.component.html',
  styleUrls: ['./popup-new-poste.component.css'],
  providers: [BureauService]
})
export class PopupNewPosteComponent implements OnInit {
  public form: FormGroup;
  public error_messages: any;
  bureaux: Bureau[];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<PopupNewPosteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private service: BureauService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      nom: new FormControl(this.data.poste.nom, [
        Validators.minLength(2),
        Validators.required
      ]),
      numero: new FormControl(this.data.poste.numero, [
        Validators.required
      ]),
      titre: new FormControl(this.data.poste.titre, [
        Validators.required
      ]),
      courriel: new FormControl(this.data.poste.courriel, [Validators.required]),
      bureau: new FormControl(this.data.poste.bureau, [Validators.required])
    });

    this.error_messages = {
      nom: [
        {type: 'required', message: 'Le nom est requis'},
        {type: 'minlength', message: 'Le nom doit être au moins 2 caractères'}
      ],
      numero: [
        {type: 'required', message: 'Le numéro est requis'}
      ],
      titre: [
        {type: 'required', message: 'Le titre est requis'}
      ],
      courriel: [
        {type: 'required', message: 'Le courriel est requis'}
      ],
      bureau: [
        {type: 'required', message: 'Le bureau est requis'}
      ],
    };

    this.getBureaux();
  }

  getBureaux() {
    this.service.getAll().subscribe((bureaux: Bureau[]) => {
        this.bureaux = bureaux;

        if (this.data.poste.bureau) {
          const c = this.bureaux.filter(e => e.id === this.data.poste.bureau.id);
          if (c.length > 0) {
            this.form.get('bureau').setValue(c[0]);
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
      const t = new Poste();
      t.id = this.data.poste.id;
      t.nom = d.nom;
      t.numero = d.numero;
      t.titre = d.titre;
      t.courriel = d.courriel;
      t.bureau = d.bureau;

      this.dialogRef.close(t);
    }
  }
}
