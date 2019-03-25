import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InternService} from '../../../services/intern.service';
import {Ville} from '../../domaine/ville';
import {startWith, map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {VillesService} from '../../../services/villes.service';

@Component({
  selector: 'app-form-search-intern',
  templateUrl: './form-search-intern.component.html',
  styleUrls: ['./form-search-intern.component.css'],
  providers: [InternService, VillesService]
})
export class FormSearchInternComponent implements OnInit {

  public searchInternForm: FormGroup;

  public error_messages: any;

  file: any;
  cityList: Ville[];
  filteredOptions: Observable<Ville[]>;
  hasFichierFormulaire: boolean;

  constructor(private fb: FormBuilder, private service: InternService, private villesService: VillesService) {
    this.cityList = [];
  }

  ngOnInit() {
    this.getVilles();
    this.getHasFichierFormulaire();
    this.searchInternForm = this.fb.group({
      employer: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      city: new FormControl('', Validators.required),
      address: new FormControl('', [
        Validators.maxLength(200),
        Validators.required
      ]),
      telephone: new FormControl('', [
        Validators.pattern('^[0-9]{10}$'),
        Validators.required
      ]),
      sector: new FormControl('', [
        Validators.maxLength(200),
        Validators.required
      ]),
      nbreEmployee: new FormControl('', Validators.required),
      siteAdresse: new FormControl('', [
        Validators.required
      ]),
      fullNamePerson: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      telephonePerson: new FormControl('', [
        Validators.pattern('^[0-9]{10}$'),
        Validators.required
      ]),
      emailPerson: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      informationDetail: new FormControl('', [
        Validators.maxLength(500),
        Validators.required
      ]),
      nbreStagiare: new FormControl('', Validators.required),
      checkSalary: new FormControl(''),
      checkGetJob: new FormControl(''),
      autre: new FormControl('', Validators.maxLength(1000))
    });
    this.error_messages = {
      employer: [
        {type: 'required', message: 'Le nom de l\'employeur est requis'},
        {type: 'minlength', message: 'Le nom de l\'employeur doit être au moins 2 caractères'}
      ],
      city: [
        {type: 'required', message: 'Ville est requise'},
        {type: 'maxlength', message: 'Ville peut être pas plus que 100 caractères'}
      ],
      address: [
        {type: 'required', message: 'Adresse est requise'},
        {type: 'maxlength', message: 'Adresse peut être pas plus que 200 caractères'}
      ],
      telephone: [
        {type: 'required', message: 'Numéro de téléphone est requis'},
        {type: 'pattern', message: 'Numéro de téléphone ne doit contenir que des 10 chiffres'},
      ],
      sector: [
        {type: 'required', message: 'Le secteur d\'activité est requis'},
        {type: 'maxlength', message: 'Votre texte ne doit pas dépasser 200 caractères'}
      ],
      nbreEmployee: [
        {type: 'required', message: 'Nombre d\'employés est requis'},
      ],
      siteAdresse: [
        {type: 'required', message: 'Adresse du site est requise'},
      ],
      fullNamePerson: [
        { type: 'required', message: 'Le nom et le prénom sont requissent' },
        { type: 'minlength', message: 'Le nom et le prénom doivent être au moins 2 caractères' }
      ],
      telephonePerson: [
        {type: 'required', message: 'Numéro de téléphone est requis'},
        {type: 'pattern', message: 'Numéro de téléphone ne doit contenir que des 10 chiffres'},
      ],
      emailPerson: [
        { type: 'required', message: 'Adresse e-mail est requise' },
        { type: 'pattern', message: 'Entrez une adresse e-mail valide' }
      ],
      informationDetail: [
        {type: 'required', message: 'Information détaillée est requise'},
        {type: 'maxlength', message: 'Votre texte ne doit pas dépasser 500 caractères'}
      ],
      nbreStagiare: [
        {type: 'required', message: 'Nombre maximum de stagiaires est requis'},
      ],
      autre: [
        {type: 'maxlength', message: 'Votre texte ne doit pas dépasser 1000 caractères'}
    ]
    };

    this.filteredOptions = this.searchInternForm.get('city').valueChanges
      .pipe(
        startWith<string | Ville>(''),
        map(value => typeof value === 'string' ? value : (!value ? '' : value.name)),
        map(name => name ? this._filter(name) : this.cityList.slice())
      );
  }

  getHasFichierFormulaire() {
    this.service.hasFichierFormulaire().subscribe(
    (hasOne: boolean) => {
      this.hasFichierFormulaire = (hasOne === true ? true : false);
    },
    error => {
      alert(error.toString());
    });
  }

  displayFn(city?: Ville): string | undefined {
    return city ? city.name : undefined;
  }

  private _filter(name: string): Ville[] {
    const filterValue = name.toLowerCase();

    return this.cityList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  fileDownload() {
    // this.service.getFile().subscribe (
    //   (file: any) => {
    //     this.file = file;
    //     console.log(this.file);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
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

  onSubmitSearchIntern() {
    if (this.searchInternForm.valid) {
      const d = this.searchInternForm.value;

      const internForm = {
        companyName: d.employer,
        city: d.city,
        address: d.address,
        telephone: d.telephone,
        sectorActivity: d.sector,
        nbreEmployee: d.nbreEmployee,
        website: d.siteAdresse,
        nameResponsPerson: d.fullNamePerson,
        telephoneResponsPerson: d.telephonePerson,
        emailResponsPerson: d.emailPerson,
        postDetail: d.informationDetail,
        nbreIntern: d.nbreStagiare,
        getJob: d.checkGetJob,
        getSalary: d.checkSalary,
        additionalInfo: d.autre
      };

      this.service.save(internForm).subscribe(
        (data: any) => {
          alert('Formulaire soumis avec succèss');
          this.searchInternForm.reset();
        },
        error => {
          alert('Erreur. Veuillez réessayer plus tard');
        }
      );
    }

  }
}
