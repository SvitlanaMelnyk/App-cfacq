import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CategoriePostesService} from '../../../services/categoriePostes.service';
import {TypePostesService} from '../../../services/typePostes.service';
import {VillesService} from '../../../services/villes.service';
import {Ville} from '../../domaine/ville';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [VillesService, TypePostesService, CategoriePostesService]
})
export class FilterComponent implements OnInit {
  @Input() villes: Ville[];
  @Output() search = new EventEmitter();

  public filterForm: FormGroup;

  typePosteList: any[];
  categoriePosteList: any[];
  listData: any[];

  searchExecuted: boolean;

  constructor(private fb: FormBuilder, private villesService: VillesService,
              private typePostesService: TypePostesService,
              private categoriePostesService: CategoriePostesService) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      villes: new FormControl([]),
      typePostes: new FormControl([]),
      categoriePostes: new FormControl([])
    });

    this.getTypePostes();
    this.getCategoriePostes();
  }


  getTypePostes() {
    this.typePostesService.getTypePostes().subscribe(
      (typePosteList: any[]) => {
        this.typePosteList = typePosteList;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCategoriePostes() {
    this.categoriePostesService.getCategoriePostes().subscribe(
      (categoriePosteList: any[]) => {
        this.categoriePosteList = categoriePosteList;
      },
      error => {
        console.log(error);
      }
    );
  }

  onChange() {
    if (this.searchExecuted) {
      this.onFetch();
    }
  }

  onFetch() {
    this.searchExecuted = true;
    this.search.emit(this.filterForm.value);
  }
}
