import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {VillesService} from '../../../services/villes.service';
import {Ville} from '../../domaine/ville';
import {CategoriePostesService} from '../../../services/categoriePostes.service';
import {TypePostesService} from '../../../services/typePostes.service';
import {CategoriePoste} from '../../domaine/categoriePoste';
import {TypePoste} from '../../domaine/typePoste';
import {Cours} from '../../domaine/cours';
import {Observable} from 'rxjs/index';
import {map, startWith} from 'rxjs/internal/operators';
import {JobTitleService} from '../../../services/jobTitle.service';
import {JobTitle} from '../../domaine/jobTitle';
import {Cv} from '../../domaine/cv';
import {Student} from '../../domaine/student';
import {CoursService} from '../../../services/cours.service';

@Component({
  selector: 'app-form-create-cv',
  templateUrl: './form-create-cv.component.html',
  styleUrls: ['./form-create-cv.component.css'],
  providers: [CoursService, JobTitleService, VillesService, TypePostesService, CategoriePostesService]
})
export class FormCreateCvComponent implements OnInit {

  @Input() cv: Cv;
  @Input() editing: boolean;

  @Output() send = new EventEmitter();
  @Output() cancel = new EventEmitter();

  public form: FormGroup;

  public error_messages: any;

  jobTitles: any[];
  cityList: Ville[];
  filteredOptions: Observable<Ville[]>;
  domaines: any[];
  travails: any[];

  formations: any[];

  competences: FormArray;

  loading: boolean;

  constructor(private fb: FormBuilder, private coursService: CoursService,
              private jobTitleService: JobTitleService, private villesService: VillesService,
              private typePostesService: TypePostesService, private categoriePostesService: CategoriePostesService) {
    this.domaines = [];
    this.travails = [];
    this.cityList = [];
  }

  ngOnInit() {
    this.getFormations();
    this.getAllJobTitles();
    this.getVilles();
    this.getTypePostes();
    this.getCategoriePostes();

    if (!this.cv) {
      this.cv = new Cv();
      this.cv.student = new Student();
    }

    this.form = this.fb.group({
      surname: new FormControl(this.cv.student.surname, [
        Validators.minLength(2),
        Validators.required
      ]),
      firstName: new FormControl(this.cv.student.name, [
        Validators.minLength(2),
        Validators.required
      ]),
      email: new FormControl(this.cv.student.email, [
        Validators.email,
        Validators.required
      ]),
      city: new FormControl(this.cv.student.city, Validators.required),
      address: new FormControl(this.cv.student.address, [
        Validators.maxLength(200),
        Validators.required
      ]),
      telephone: new FormControl(this.cv.student.telephone, [
        Validators.pattern('^[0-9]{10}$'),
        Validators.required
      ]),
      cours: new FormControl('', Validators.required),
      jobTitle: new FormControl(this.cv.jobTitleCV, Validators.required),
      summary: new FormControl(this.cv.summary, Validators.required),
      competences: this.fb.array([this.createItem()]),
      autre: new FormControl(this.cv.otherInformation, Validators.maxLength(1000))
    });

    this.error_messages = {
      surname: [
        {type: 'required', message: 'Le nom est requis'},
        {type: 'minlength', message: 'Le nom doit être au moins 2 caractères'}
      ],
      firstName: [
        {type: 'required', message: 'Le prénom est requis'},
        {type: 'minlength', message: 'Le prénom doit être au moins 2 caractères'}
      ],
      email: [
        {type: 'required', message: 'Adresse e-mail est requise'},
        {type: 'pattern', message: 'Entrez une adresse e-mail valide'}
      ],
      city: [
        {type: 'required', message: 'Ville est requise'}
      ],
      address: [
        {type: 'required', message: 'Adresse est requise'},
        {type: 'maxlength', message: 'Adresse ne peut pas dépasser 200 caractères'}
      ],
      telephone: [
        {type: 'required', message: 'Numéro de téléphone est requis'},
        {type: 'pattern', message: 'Numéro de téléphone ne doit contenir que des 10 chiffres'},
      ],
      domaines: [
        {message: 'Choisissez au moins un domaine'}
      ],
      cours: [
        {type: 'required', message: 'Choisissez une formation'}
      ],
      travails: [
        {message: 'Choisissez au moins un type du travail'}
      ],
      jobTitle: [
        {type: 'required', message: 'Choisissez le titre de poste'}
      ],
      summary: [
        {type: 'required', message: 'Le champ de sommaire est requis'},
      ],
      competences: [
        {type: 'required', message: 'Le champ de compétence est requis'},
      ],
      autre: [
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

  displayFn(city?: Ville): string | undefined {
    return city ? city.name : undefined;
  }

  private _filter(name: string): Ville[] {
    const filterValue = name.toLowerCase();

    return this.cityList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  createCheckboxes(list, c: any[]) {
    if (list) {
      return list.map(e => {
        const t = c.filter(cc => cc.id === e.id);
        return new FormControl(t.length > 0);
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

  addCompetence() {
    this.competences = this.form.get('competences') as FormArray;
    this.competences.push(this.createItem());
  }

  deleteCompetence(i) {
    if (i > 0) {
      this.competences.removeAt(i);
    }
  }

  getFormations() {
    this.coursService.getAll().subscribe(
      (cours: Cours[]) => {
        this.formations = cours;

        if (this.cv && this.cv.student && this.cv.student.cours) {
          const t = this.formations.filter(e => e.id === this.cv.student.cours);
          if (t.length > 0) {
            this.form.get('cours').setValue(t[0]);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllJobTitles() {
    this.jobTitleService.getAllJobTitles().subscribe(
      (jobTitles: JobTitle[]) => {
        this.jobTitles = jobTitles;

        if (this.cv && this.cv.jobTitleCV) {
          const t = this.jobTitles.filter(e => e.id === this.cv.jobTitleCV.id);
          this.cv.jobTitleCV = t[0];
          this.form.get('jobTitle').setValue(t[0]);
        }
      },
      error => {
        console.log(error);
      }
    );
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
      (typePosts: TypePoste[]) => {
        this.travails = typePosts;
        this.form.controls.travails = new FormArray(this.createCheckboxes(this.travails, this.cv.typePost), this.minSelectedCheckboxes(1));
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
        this.form.controls.domaines = new FormArray(this.createCheckboxes(this.domaines, this.cv.categoryPost), this.minSelectedCheckboxes(1));
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmitCvCreation() {
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      const d = this.form.value;

      const student = {
        name: d.firstName,
        surname: d.surname,
        email: d.email,
        city: d.city,
        address: d.address,
        telephone: d.telephone,
        cours: d.cours.id
      };

      const cv = {
        id: this.cv.id,
        summary: d.summary,
        jobTitleCV: d.jobTitle,
        competences: d.competences
          .map((v, i) => v ? v.text : null)
          .filter(v => v !== null),
        otherInformation: d.autre,
        logo: 'logo_black.png',
        link: '/cv-student',
        city: d.city,
        typePost: d.travails
          .map((v, i) => v ? this.travails[i] : null)
          .filter(v => v !== null),
        categoryPost: d.domaines
          .map((v, i) => v ? this.domaines[i] : null)
          .filter(v => v !== null),
        student: student
      };

      this.loading = true;
      this.send.emit(cv);
    }
  }

  reset() {
    this.form.reset();
  }

  onCancel() {
    this.cancel.emit();
  }
}
