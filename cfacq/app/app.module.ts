import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, LOCALE_ID} from '@angular/core';
import {RouterModule, Routes, UrlSegment} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);


import {AppComponent} from './app.component';
import {FormationsComponent} from './pages/formations/formations.component';
import {EtudiantsComponent} from './pages/etudiants/etudiants.component';
import {MatExpansionModule, MatSidenavModule} from '@angular/material';
import {FooterComponent} from './components/footer/footer.component';
import {EmployeursComponent} from './pages/employeurs/employeurs.component';
import {CalendrierComponent} from './components/calendrier/calendrier.component';
import {MenuContentComponent} from './components/menu-content/menu-content.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import {MainContentComponent} from './pages/main-content/main-content.component';
import {MenuComponent} from './components/menu/menu.component';
import {HomeComponent} from './pages/home/home.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {AProposComponent} from './pages/a-propos/a-propos.component';
import {ActualitesComponent} from './pages/actualites/actualites.component';
import {CentreMediasComponent} from './pages/centre-medias/centre-medias.component';
import {NousJoindreComponent} from './pages/nous-joindre/nous-joindre.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {FormPostCVComponent} from './components/form-post-cv/form-post-cv.component';
import {FormPostOfferComponent} from './components/form-post-offer/form-post-offer.component';
import {FormInscriptionComponent} from './components/form-inscription/form-inscription.component';
import {OffersComponent} from './components/offers/offers.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {LogoComponent} from './components/logo/logo.component';
import {LogoMobileComponent} from './components/logo-mobile/logo-mobile.component';
import {SanitizeHtmlComponent} from './pipes/sanitize-html/sanitize-html.component';
import {OffreComponent} from './pages/offre/offre.component';
import {MenuContentMobileComponent} from './components/menu-content-mobile/menu-content-mobile.component';
import {FormSearchInternComponent} from './components/form-search-intern/form-search-intern.component';
import {CVStudentsAllComponent} from './components/cv-students-all/cv-students-all.component';
import {CvStudentComponent} from './pages/cv-student/cv-student.component';
import {FormCreateCvComponent} from './components/form-create-cv/form-create-cv.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {FilterComponent} from './components/filter/filter.component';
import {NewsComponent} from './components/news/news.component';
import {SingleNewsComponent} from './pages/single-news/single-news.component';
import {AdminComponent} from './pages/admin/admin.component';
import {AdminMenuComponent} from './components/admin-menu/admin-menu.component';
import {LoginComponent} from './pages/login/login.component';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AdminUsersComponent} from './pages/admin-users/admin-users.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {PopupPasswordComponent} from './components/popup-password/popup-password.component';
import {AdminListCvComponent} from './pages/admin-list-cv/admin-list-cv.component';
import {AdminListOfferComponent} from './pages/admin-list-offer/admin-list-offer.component';
import {AdminCalendarComponent} from './pages/admin-calendar/admin-calendar.component';
import {PopupInfoCvComponent} from './components/popup-info-cv/popup-info-cv.component';
import {AdminInscriptionsComponent} from './pages/admin-inscriptions/admin-inscriptions.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {CalendrierPageComponent} from './pages/calendrier/calendrier.component';
import {PopupNewEventComponent} from './components/popup-new-event/popup-new-event.component';
import {PopupInfoOffreComponent} from './components/popup-info-offre/popup-info-offre.component';
import {PopupNewOfferComponent} from './components/popup-new-offer/popup-new-offer.component';
import {PopupNewPosteComponent} from './components/popup-new-poste/popup-new-poste.component';
import {PopupNewLocalComponent} from './components/popup-new-local/popup-new-local.component';
import {PopupNewSalleComponent} from './components/popup-new-salle/popup-new-salle.component';
import {AboutComponent} from './components/about/about.component';
import {AdminCentreMediaComponent} from './pages/admin-centre-media/admin-centre-media.component';
import {AdminCarrouselComponent} from './pages/admin-carrousel/admin-carrousel.component';
import {AdminActualitesComponent} from './pages/admin-actualites/admin-actualites.component';
import {AdminBureauxComponent} from './pages/admin-bureaux/admin-bureaux.component';
import {PopupNewBureauComponent} from './components/popup-new-bureau/popup-new-bureau.component';
import {ImagePreviewComponent} from './components/image-preview/image-preview.component';
import {ImagePreviewFullComponent} from './components/image-preview-full/image-preview-full.component';
import {PopupFileImageComponent} from './components/popup-file-image/popup-file-image.component';
import {AdminAboutUsComponent} from './pages/admin-about-us/admin-about-us.component';
import {SoumettreOffreComponent} from './pages/soumettre-offre/soumettre-offre.component';
import {AuthGuard} from './gards/auth.gard';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {JwtHelperService} from '@auth0/angular-jwt';
import { PopupNewMediaComponent } from './components/popup-new-media/popup-new-media.component';
import { PopupNewCvComponent } from './components/popup-new-cv/popup-new-cv.component';
import { MapComponent } from './components/map/map.component';
import { AdminLocalComponent } from './pages/admin-local/admin-local.component';
import { AdminPosteComponent } from './pages/admin-poste/admin-poste.component';
import {AdminSalleComponent} from './pages/admin-salle/admin-salle.component';
import { PopupNewActualiteComponent } from './components/popup-new-actualite/popup-new-actualite.component';
import { PopupCalendarEventComponent } from './components/popup-calendar-event/popup-calendar-event.component';
import {PopupNewUserComponent} from './components/popup-new-user/popup-new-user.component';
import {PopupCopyComponent} from './components/popup-copy/popup-copy.component';
import {EmployeurGuard} from './gards/employeur.gard';
import {PopupNewAboutUsComponent} from './components/popup-new-about-us/popup-new-about-us.component';


const appRoutes: Routes = [
  {
    path: 'formations', component: FormationsComponent
  },
  {
    path: 'etudiants', component: EtudiantsComponent,
    children: [
      {
        path: 'inscription',
        component: FormInscriptionComponent
      },
      {
        path: 'inscription/:id',
        component: FormInscriptionComponent
      },
      {
        path: 'cv',
        component: FormPostCVComponent
      },
      {
        path: 'offres',
        component: OffersComponent
      }
    ]
  },
  {
    path: 'employeurs',
    component: EmployeursComponent,
    canActivate: [EmployeurGuard],
    children: [
      {
        path: 'offre',
        component: SoumettreOffreComponent,
        canActivate: [EmployeurGuard]
      },
      {
        path: 'cv',
        component: CVStudentsAllComponent,
        canActivate: [EmployeurGuard]
      },
      {
        path: 'stagiaire',
        component: FormSearchInternComponent,
        canActivate: [EmployeurGuard]
      }
    ]
  },
  {path: 'calendrier', component: CalendrierPageComponent},
  {path: 'a-propos', component: AProposComponent},
  {path: 'actualites', component: ActualitesComponent},
  {path: 'centre-medias', component: CentreMediasComponent},
  {path: 'nous-joindre', component: NousJoindreComponent},
  {path: 'offre', component: OffreComponent},
  {path: 'cv-student', component: CvStudentComponent},
  {path: 'form-create-cv', component: FormCreateCvComponent},
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'calendrier',
        component: AdminCalendarComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cv',
        component: AdminListCvComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'offres',
        component: AdminListOfferComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'inscriptions',
        component: AdminInscriptionsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'utilisateurs',
        component: AdminUsersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'a-propos',
        component: AdminAboutUsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'postes',
        component: AdminPosteComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'actualites',
        component: AdminActualitesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'centre-media',
        component: AdminCentreMediaComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'carrousel',
        component: AdminCarrouselComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'bureaux',
        component: AdminBureauxComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'locaux',
        component: AdminLocalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'salles',
        component: AdminSalleComponent,
        canActivate: [AuthGuard]
      },
      {path: '**', redirectTo: '/admin/calendrier'}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'nouvelle', component: SingleNewsComponent},
  {path: 'cv-etudiant', component: CvStudentComponent},
  {path: 'offre', component: OffreComponent},
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FormationsComponent,
    EtudiantsComponent,
    FooterComponent,
    EmployeursComponent,
    CalendrierComponent,
    MenuContentComponent,
    MainContentComponent,
    MenuComponent,
    HomeComponent,
    EtudiantsComponent,
    EmployeursComponent,
    CalendrierComponent,
    PageNotFoundComponent,
    SidenavComponent,
    AProposComponent,
    ActualitesComponent,
    CentreMediasComponent,
    NousJoindreComponent,
    FormPostCVComponent,
    FormPostOfferComponent,
    FormInscriptionComponent,
    OffersComponent,
    LogoComponent,
    LogoMobileComponent,
    SanitizeHtmlComponent,
    OffreComponent,
    MenuContentMobileComponent,
    FormSearchInternComponent,
    CVStudentsAllComponent,
    CvStudentComponent,
    FormCreateCvComponent,
    FilterComponent,
    NewsComponent,
    SingleNewsComponent,
    AdminComponent,
    AdminMenuComponent,
    LoginComponent,
    AdminUsersComponent,
    PopupPasswordComponent,
    AdminListCvComponent,
    AdminListOfferComponent,
    AdminCalendarComponent,
    PopupInfoCvComponent,
    AdminInscriptionsComponent,
    ConfirmDialogComponent,
    CalendrierPageComponent,
    PopupNewEventComponent,
    PopupInfoOffreComponent,
    PopupNewOfferComponent,
    PopupNewPosteComponent,
    PopupNewLocalComponent,
    PopupNewSalleComponent,
    AboutComponent,
    AdminCentreMediaComponent,
    AdminCarrouselComponent,
    AdminActualitesComponent,
    AdminBureauxComponent,
    PopupNewBureauComponent,
    ImagePreviewComponent,
    ImagePreviewFullComponent,
    PopupFileImageComponent,
    AdminAboutUsComponent,
    SoumettreOffreComponent,
    PopupNewMediaComponent,
    PopupNewCvComponent,
    PopupNewActualiteComponent,
    PopupNewUserComponent,
    PopupCopyComponent,
    MapComponent,
    AdminLocalComponent,
    AdminPosteComponent,
    AdminSalleComponent,
    PopupCalendarEventComponent,
    PopupNewAboutUsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSidenavModule,
    SlideshowModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    MatAutocompleteModule,
    MatTableModule,
    MatDialogModule
  ],
  entryComponents: [
    PopupPasswordComponent,
    PopupInfoCvComponent,
    ConfirmDialogComponent,
    PopupNewEventComponent,
    PopupInfoOffreComponent,
    PopupNewOfferComponent,
    PopupNewPosteComponent,
    PopupNewLocalComponent,
    PopupNewSalleComponent,
    PopupNewBureauComponent,
    PopupNewMediaComponent,
    PopupFileImageComponent,
    PopupNewCvComponent,
    PopupNewActualiteComponent,
    PopupNewUserComponent,
    PopupCopyComponent,
    PopupCalendarEventComponent,
    PopupNewAboutUsComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-CA'},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
