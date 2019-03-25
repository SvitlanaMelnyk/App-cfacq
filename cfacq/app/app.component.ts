import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {User} from './domaine/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  mode = new FormControl('over');
  notHome: boolean;
  isAdmin: boolean;
  isLogin: boolean;

  constructor(private service: UserService, private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
    this.notHome = false;
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.notHome = val.url !== '/home' && val.url !== '/';
        this.isAdmin = val.url.indexOf('/admin') !== -1;
        this.isLogin = val.url.indexOf('/login') !== -1;
      }
    });
  }

  ngOnInit() {
    const t = localStorage.getItem('employeurToken');
    const url = new URL(window.location.href);
    const i = url.searchParams.get('i');
    if (t) {
      this.checkIfEmployeur(t);
    } else if (i) {
      this.checkIfEmployeur(i);
    }
  }

  checkIfEmployeur(i: string) {
    this.service.loginExt(i).subscribe(
      (user: User) => {
        localStorage.setItem('employeurToken', user.token);
        this.authenticationService.setCurrectUserValue(user);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isEmployeur() {
    const currentUser = this.authenticationService.currentUserValue;
    return currentUser && !currentUser.username;
  }
}
