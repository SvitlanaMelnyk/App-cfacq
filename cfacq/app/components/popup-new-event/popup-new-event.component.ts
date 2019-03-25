import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Util} from '../../../util/util';
import {Ville} from '../../domaine/ville';
import {VillesService} from '../../../services/villes.service';
import {map, startWith} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {Poste} from '../../domaine/poste';
import {PosteService} from '../../../services/poste.service';
import {Event} from '../../domaine/event';
import provinces from '../../domaine/provinces';

@Component({
  selector: 'app-popup-new-event',
  templateUrl: './popup-new-event.component.html',
  styleUrls: ['./popup-new-event.component.css'],
  providers: [VillesService, PosteService]
})
export class PopupNewEventComponent implements OnInit {
  public form: FormGroup;
  public error_messages: any;
  villes: Ville[];
  postes: Poste[];
  filteredOptions: Observable<Ville[]>;
  provinces: any[];
  provinceObj: any;

  constructor(private posteServiceprivate: PosteService, private fb: FormBuilder, public dialogRef: MatDialogRef<PopupNewEventComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private serviceVille: VillesService) {
    this.villes = [];
    this.postes = [];

    this.provinces = provinces;

    if (data.event.adresse) {
      provinces.forEach(p => {
        if (data.event.adresse.province === p.value) {
          this.provinceObj = p;
        }
      });
    }
  }

  ngOnInit() {
    const dateStart = this.data.event.dateStart ? Util.getDateString(this.data.event.dateStart) + 'T' + Util.getTimeString(this.data.event.dateStart) : '';
    const dateEnd = this.data.event.dateEnd ? Util.getDateString(this.data.event.dateEnd) + 'T' + Util.getTimeString(this.data.event.dateEnd) : '';
    this.form = this.fb.group({
      name: new FormControl(this.data.event.name, [
        Validators.minLength(2),
        Validators.required
      ]),
      dateStart: new FormControl(dateStart, [
        Validators.required
      ]),
      dateEnd: new FormControl(dateEnd, [
        Validators.required
      ]),
      ville: new FormControl(this.data.event.ville, [
        Validators.required
      ]),
      noCivic: new FormControl(this.data.event.adresse.noCivic, [
        Validators.required
      ]),
      rue: new FormControl(this.data.event.adresse.rue, [
        Validators.required
      ]),
      rue2: new FormControl(this.data.event.adresse.rue2, []),
      province: new FormControl(this.provinceObj, []),
      codePostal: new FormControl(this.data.event.adresse.codePostal, []),
      poste: new FormControl(this.data.event.poste, [
        Validators.required
      ]),
      price: new FormControl(this.data.event.price, [
        Validators.required
      ]),
      description: new FormControl(this.data.event.description),
      color: new FormControl(this.data.event.color, [
        Validators.required
      ])
    });

    this.error_messages = {
      name: [
        {type: 'required', message: 'Le nom est requis'},
        {type: 'minlength', message: 'Le nom doit être au moins 2 caractères'}
      ],
      dateStart: [
        {type: 'required', message: 'La date de début est requise'}
      ],
      dateEnd: [
        {type: 'required', message: 'La date de fin est requise'}
      ],
      ville: [
        {type: 'required', message: 'La ville est requise'}
      ],
      poste: [
        {type: 'required', message: 'Le poste est requis'}
      ],
      price: [
        {type: 'required', message: 'Le coût est requis'}
      ],
      color: [
        {type: 'required', message: 'La couleur est requise'}
      ]
    };

    this.getVilles();
    this.getPostes();

    this.filteredOptions = this.form.get('ville').valueChanges
      .pipe(
        startWith<string | Ville>(''),
        map(value => typeof value === 'string' ? value : (!value ? '' : value.name)),
        map(name => name ? this._filter(name) : this.villes.slice())
      );
  }

  private _filter(name: string): Ville[] {
    const filterValue = name.toLowerCase();

    return this.villes.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getVilles() {
    this.serviceVille.getAll().subscribe(
      (villes: Ville[]) => {
        this.villes = villes;

        if (this.data.event.ville) {
          const c = this.villes.filter(e => e.id === this.data.event.ville.id);
          if (c.length > 0) {
            this.form.get('ville').setValue(c[0]);
          }
        }
      },
      (error) => {
        console.log(error);
      });
  }

  getPostes() {
    this.posteServiceprivate.getAll().subscribe(
      (postes: Poste[]) => {
        this.postes = postes;

        if (this.data.event.poste) {
          const c = this.postes.filter(e => e.id === this.data.event.poste.id);
          if (c.length > 0) {
            this.form.get('poste').setValue(c[0]);
          }
        }
      },
      (error) => {
        console.log(error);
      });
  }

  displayFn(city?: Ville): string | undefined {
    return city ? city.name : undefined;
  }

  close() {
    this.dialogRef.close();
  }

  create() {
    if (this.form.valid) {
      const d = this.form.value;
      const t = new Event();
      t.id = this.data.event.id;
      t.name = d.name;
      t.dateStart = d.dateStart;
      t.dateEnd = d.dateEnd;
      t.poste = d.poste;
      t.price = d.price;
      t.color = d.color;
      t.description = d.description;
      t.adresse.id = this.data.event.adresse.id;
      t.adresse.noCivic = d.noCivic;
      t.adresse.rue = d.rue;
      t.adresse.rue2 = d.rue2;
      t.ville = d.ville;
      t.adresse.province = d.province.value;
      t.adresse.codePostal = d.codePostal;
      t.adresse.courriel = d.courriel;

      this.dialogRef.close(t);
    }
  }
}
