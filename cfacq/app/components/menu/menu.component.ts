import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() sidenav: any;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  toggleSideNav() {
    this.sidenav.toggle();
  }

  logout() {
    localStorage.removeItem('employeurToken');
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }

  isEmployeur() {
    const currentUser = this.authenticationService.currentUserValue;
    return currentUser && !currentUser.username;
  }
}
