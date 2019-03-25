import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css'],
})
export class EtudiantsComponent implements OnDestroy {

  isInscription: boolean;
  childParamSubscription: Subscription;
  public coursId: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isInscription = val.url.startsWith('/etudiants/inscription');
      }
    });

    if (activatedRoute.firstChild) {
      this.childParamSubscription = activatedRoute.firstChild.paramMap.subscribe(
        (params: ParamMap): void => {
          this.coursId = params.get('id');
        }
      );
    }
  }

  public getCoursId() {
    return this.coursId;
  }

  ngOnDestroy(): void {
    if (this.childParamSubscription) {
      this.childParamSubscription.unsubscribe();
    }
  }
}

