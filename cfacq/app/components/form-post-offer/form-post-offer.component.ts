import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Ville} from '../../domaine/ville';
import {VillesService} from '../../../services/villes.service';
import {CategoriePostesService} from '../../../services/categoriePostes.service';
import {CategoriePoste} from '../../domaine/categoriePoste';
import {TypePostesService} from '../../../services/typePostes.service';
import {TypePoste} from '../../domaine/typePoste';
import {Observable} from 'rxjs/index';
import {startWith, map} from 'rxjs/internal/operators';
import {Offer} from '../../domaine/offer';
import {OfferService} from '../../../services/offer.service';

@Component({
  selector: 'app-form-post-offer',
  templateUrl: './form-post-offer.component.html',
  styleUrls: ['./form-post-offer.component.css'],
  providers: [OfferService, VillesService, CategoriePostesService, TypePostesService]
})
export class FormPostOfferComponent implements OnInit, OnChanges {
  @Input() offer: Offer;
  @Input() editing: boolean;
  @Input() buttonText: string;

  @Output() submit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  public form: FormGroup;

  public error_messages: any;

  cityList: Ville[];
  filteredOptions: Observable<Ville[]>;
  domaines: any[];
  typePostes: any[];

  competences: FormArray;
  tasks: FormArray;
  requirements: FormArray;

  constructor(private fb: FormBuilder, private offerService: OfferService,
              private villesService: VillesService, private typePostesService: TypePostesService,
              private categoriePostesService: CategoriePostesService) {
    this.domaines = [];
    this.typePostes = [];
    this.cityList = [];
  }

  ngOnInit() {
    this.getVilles();
    this.getCategoriePostes();
    this.getTypePostes();

    this.form = this.fb.group({
      title: new FormControl(this.offer.title || '', [
        Validators.minLength(2),
        Validators.required
      ]),
      nameEmployer: new FormControl(this.offer.nameEmployer || '', [
        Validators.minLength(2),
        Validators.required
      ]),
      city: new FormControl(this.offer.city || '', Validators.required),
      address: new FormControl(this.offer.address || '', [
        Validators.maxLength(200),
        Validators.required
      ]),
      telephone: new FormControl(this.offer.telephone || '', [
        Validators.pattern('^[0-9]{10}$'),
        Validators.required
      ]),
      email: new FormControl(this.offer.email || '', [
        Validators.email,
        Validators.required
      ]),
      sector: new FormControl(this.offer.sector || '', [
        Validators.maxLength(200),
        Validators.required
      ]),
      website: new FormControl(this.offer.website || '', [
        // Validators.required
      ]),
      contactName: new FormControl(this.offer.contactName || '', [
        Validators.minLength(2),
        Validators.required
      ]),
      contactTelephone: new FormControl(this.offer.contactTelephone || '', [
        Validators.pattern('^[0-9]{10}$'),
        Validators.required
      ]),
      contactEmail: new FormControl(this.offer.contactEmail || '', [
        Validators.pattern('[a-zA-Z0-9.!#$%&amp;’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)+'),
        Validators.required
      ]),
      physicalAddress: new FormControl(this.offer.physicalAddress || '', [
        Validators.maxLength(200),
        Validators.required
      ]),
      summary: new FormControl(this.offer.summary || '', [
        Validators.maxLength(1000),
        Validators.required
      ]),
      tasks: this.fb.array(this.offer.tasks ? this.createItems(this.offer.tasks) : [this.createItem()]),
      competences: this.fb.array(this.offer.competences ? this.createItems(this.offer.competences) : [this.createItem()]),
      requirements: this.fb.array(this.offer.requirements ? this.createItems(this.offer.requirements) : [this.createItem()]),
      otherInformation: new FormControl(this.offer.otherInformation || '', Validators.maxLength(1000))
    });

    this.error_messages = {
      title: [
        {type: 'required', message: 'Le title de post est requis'},
        {type: 'minlength', message: 'Le title de post doit être au moins 2 caractères'}
      ],
      nameEmployer: [
        {type: 'required', message: 'Le nom de l\'employeur est requis'},
        {type: 'minlength', message: 'Le nom de l\'employeur doit être au moins 2 caractères'}
      ],
      city: [
        {type: 'required', message: 'Ville est requise'}
      ],
      address: [
        {type: 'required', message: 'Adresse est requise'},
        {type: 'maxlength', message: 'Adresse peut être pas plus que 200 caractères'}
      ],
      telephone: [
        {type: 'required', message: 'Numéro de téléphone est requis'},
        {type: 'pattern', message: 'Numéro de téléphone ne doit contenir que des 10 chiffres'},
      ],
      email: [
        {type: 'required', message: 'Adresse e-mail est requise'},
        {type: 'pattern', message: 'Entrez une adresse e-mail valide'}
      ],
      sector: [
        {type: 'required', message: 'Le secteur d\'activité est requis'},
        {type: 'maxlength', message: 'Votre texte ne doit pas dépasser 200 caractères'}
      ],
      contactName: [
        {type: 'required', message: 'Le nom et le prénom sont requissent'},
        {type: 'minlength', message: 'Le nom et le prénom doivent être au moins 2 caractères'}
      ],
      contactTelephone: [
        {type: 'required', message: 'Numéro de téléphone est requis'},
        {type: 'pattern', message: 'Numéro de téléphone ne doit contenir que des 10 chiffres'},
      ],
      contactEmail: [
        {type: 'required', message: 'Adresse e-mail est requise'},
        {type: 'pattern', message: 'Entrez une adresse e-mail valide'}
      ],
      domaines: [
        {message: 'Choisissez au moins un domaine'}
      ],
      physicalAddress: [
        {type: 'required', message: 'Lieu physique est requis'},
        {type: 'maxlength', message: 'Votre texte ne doit pas dépasser 200 caractères'}
      ],
      typePostes: [
        {message: 'Choisissez au moins un type de poste'}
      ],
      summary: [
        {type: 'required', message: 'Sommaire est requis'},
        {type: 'maxlength', message: 'Votre texte ne doit pas dépasser 1000 caractères'}
      ],
      tasks: [
        {type: 'required', message: 'Tâches sont requissent'},
        {type: 'maxlength', message: 'Votre texte ne doit pas dépasser 1000 caractères'}
      ],
      competences: [
        {type: 'required', message: 'Le champ de compétence est requis'},
        {type: 'maxlength', message: 'Votre texte ne doit pas dépasser 1000 caractères'}
      ],
      otherInformation: [
        {type: 'maxlength', message: 'Votre texte ne doit pas dépasser 1000 caractères'}
      ]
    };

    this.filteredOptions = this.form.get('city').valueChanges
      .pipe(
        startWith<string | Ville>(''),
        map(value => typeof value === 'string' ? value : (!value ? '' : value.name)),
        map(name => name ? this._filter(name) : this.cityList.slice())
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['offer'] && this.form) {
      this.form.reset(this.offer);
    }
  }

  displayFn(city?: Ville): string | undefined {
    return city ? city.name : undefined;
  }

  private _filter(name: string): Ville[] {
    const filterValue = name.toLowerCase();

    return this.cityList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  createCheckboxes(list, listObj) {
    if (list) {
      return list.map(c => {
        const selected = listObj && listObj.length > 0 ? listObj.filter(e => e.id === c.id).length > 0 : false;
        return new FormControl(selected);
      });
    }
    return [];
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : {required: true};
    };

    return validator;
  }

  createItem(): FormGroup {
    return this.fb.group({text: ''});
  }

  createItems(list: string[]): FormGroup[] {
    return list.map(e => this.fb.group({text: e}));
  }

  addCompetence() {
    this.competences = this.form.get('competences') as FormArray;
    this.competences.push(this.createItem());
  }

  addTask() {
    this.tasks = this.form.get('tasks') as FormArray;
    this.tasks.push(this.createItem());
  }

  addRequirement() {
    this.requirements = this.form.get('requirements') as FormArray;
    this.requirements.push(this.createItem());
  }

  deleteCompetence(i) {
    if (i > 0) {
      this.competences.removeAt(i);
    }
  }

  deleteTask(i) {
    if (i > 0) {
      this.tasks.removeAt(i);
    }
  }

  deleteRequirement(i) {
    if (i > 0) {
      this.requirements.removeAt(i);
    }
  }

  getVilles() {
    this.villesService.getAll().subscribe(
      (villes: Ville[]) => {
        this.cityList = villes;
      },
      error => {
        console.log(error);
      }
    );
  }

  getTypePostes() {
    this.typePostesService.getTypePostes().subscribe(
      (typePostes: TypePoste[]) => {
        this.typePostes = typePostes;
        this.form.addControl('typePostes', new FormArray(this.createCheckboxes(this.typePostes, this.offer.typePostes), this.minSelectedCheckboxes(1)));
      },
      error => {
        console.log(error);
      }
    );
  }

  getCategoriePostes() {
    this.categoriePostesService.getCategoriePostes().subscribe(
      (categories: CategoriePoste[]) => {
        this.domaines = categories;
        this.form.addControl('domaines', new FormArray(this.createCheckboxes(this.domaines, this.offer.domaines), this.minSelectedCheckboxes(1)));
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmitPostOffer() {
    if (this.form.valid) {
      const d = this.form.value;

      const domaines = d.domaines
        .map((v, i) => v ? this.domaines[i] : null)
        .filter(v => v !== null);
      d.domaines = domaines;

      const typePostes = d.typePostes
        .map((v, i) => v ? this.typePostes[i] : null)
        .filter(v => v !== null);
      d.typePostes = typePostes;

      const tasks = d.tasks
        .map((v, i) => v ? v.text : null)
        .filter(v => v !== null);

      const competences = d.competences
        .map((v, i) => v ? v.text : null)
        .filter(v => v !== null);

      const requirements = d.requirements
        .map((v, i) => v ? v.text : null)
        .filter(v => v !== null);


      const o = new Offer();
      o.title = d.title;
      o.nameEmployer = d.nameEmployer;
      o.city = d.city;
      o.address = d.address;
      o.telephone = d.telephone;
      o.email = d.email;
      o.sector = d.sector;
      o.website = d.website;
      o.contactName = d.contactName;
      o.contactTelephone = d.contactTelephone;
      o.contactEmail = d.contactEmail;
      o.domaines = domaines;
      o.physicalAddress = d.physicalAddress;
      o.typePostes = typePostes;
      o.summary = d.summary;
      o.tasks = tasks;
      o.competences = competences;
      o.requirements = requirements;
      o.otherInformation = d.otherInformation;

      this.submit.emit(o);
    }
  }

  onCancel() {
    this.cancel.emit();
  }


}
