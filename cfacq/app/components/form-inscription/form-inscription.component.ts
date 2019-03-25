import {Component, forwardRef, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CoursService} from '../../../services/cours.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Ville} from '../../domaine/ville';
import {VillesService} from '../../../services/villes.service';
import {StudentRegistrationService} from '../../../services/studentRegistration.service';
import {Cours} from '../../domaine/cours';
import {ActivatedRoute} from '@angular/router';
import {EtudiantsComponent} from '../../pages/etudiants/etudiants.component';


@Component({
  selector: 'app-form-inscription',
  templateUrl: './form-inscription.component.html',
  styleUrls: ['./form-inscription.component.css'],
  providers: [CoursService, VillesService, StudentRegistrationService]
})
export class FormInscriptionComponent implements OnInit, OnChanges {

  @Input() coursId: any;

  public inscriptionForm: FormGroup;
  public error_messages: any;

  formations: Cours[];
  cityList: Ville[];
  filteredOptions: Observable<Ville[]>;

  loading: boolean;

  constructor(private fb: FormBuilder,
              private coursService: CoursService,
              private villesService: VillesService,
              private studentRegistrationService: StudentRegistrationService,
              private route: ActivatedRoute,
              @Inject(forwardRef(() => EtudiantsComponent)) private _parent: EtudiantsComponent) {
    this.cityList = [];

    this.coursId = _parent.getCoursId();
    this.setCoursValue(this.coursId);
  }

  ngOnInit() {
    this.getFormations();
    this.getVilles();

    this.inscriptionForm = this.fb.group({
      surname: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      telephone: new FormControl('', [
        Validators.pattern('^[0-9]{10}$'),
        Validators.required
      ]),
      city: new FormControl('', Validators.required),
      address: new FormControl('', [
        Validators.maxLength(200),
        Validators.required
      ]),
      birthday: new FormControl('', [
        Validators.pattern('^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])$'),
        Validators.required
      ]),
      cours: new FormControl('', Validators.required)
    });
    this.error_messages = {
      surname: [
        {type: 'required', message: 'Nom est requis'},
        {type: 'minlength', message: 'Nom doit être au moins 2 caractères'},
      ],
      name: [
        {type: 'required', message: 'Prénom est requis'},
        {type: 'minlength', message: 'Prénom doit être au moins 2 caractères'},
      ],
      email: [
        {type: 'required', message: 'Email est requis'},
        {type: 'pattern', message: 'Entrez un email valid'}
      ],
      telephone: [
        {type: 'required', message: 'Numéro de téléphone est requis'},
        {type: 'pattern', message: 'Numéro de téléphone ne doit contenir que des 10 chiffres'},
      ],
      city: [
        {type: 'required', message: 'Ville est requise'},
      ],
      address: [
        {type: 'required', message: 'Àddress est requise'},
        {type: 'maxlength', message: 'Address peut être pas plus que 200 caractères'},
      ],
      birthday: [
        {type: 'pattern', message: 'Format pour Date de naissance : AAAA-MM-DD'},
        {type: 'required', message: 'Date de naissance est requise'},
      ],
      cours: [
        {type: 'required', message: 'Choisissez une formation'}
      ]
    };

    this.filteredOptions = this.inscriptionForm.get('city').valueChanges
      .pipe(
        startWith<string | Ville>(''),
        map(value => typeof value === 'string' ? value : (!value ? '' : value.name)),
        map(name => name ? this._filter(name) : this.cityList.slice())
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['coursId']) {
      this.setCoursValue(this.coursId);
    }
  }

  displayFn(city?: Ville): string | undefined {
    return city ? city.name : undefined;
  }

  private _filter(name: string): Ville[] {
    const filterValue = name.toLowerCase();

    return this.cityList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getFormations() {
    this.coursService.getAll().subscribe(
      (cours: Cours[]) => {
        this.formations = cours;

        this.coursId = this._parent.getCoursId();
        this.setCoursValue(this.coursId);
      },
      error => {
        console.log(error);
      }
    );
  }

  setCoursValue(id: any) {
    if (id && this.formations) {
      const c = this.formations.filter(e => e.id === parseInt(id, 10));
      if (c.length > 0) {
        this.inscriptionForm.get('cours').setValue(c[0]);
      }
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

  onSubmitStudentRegister() {
    if (this.inscriptionForm.valid) {
      const d = this.inscriptionForm.value;

      const registration = {
        cours: d.cours.id,
        name: d.name,
        surname: d.surname,
        email: d.email,
        telephone: d.telephone,
        city: d.city,
        address: d.address,
        birthday: d.birthday
      };

      this.loading = true;
      this.studentRegistrationService.registerStudent(registration).subscribe(
        (data: any) => {
          alert('Vous vous êtes enregistré avec succès');
          this.inscriptionForm.reset();
          this.loading = false;
        },
        error => {
          alert('Erreur. Veuillez réessayer plus tard');
          this.loading = false;
        });
    }
  }
}

