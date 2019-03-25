import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {PopupPasswordComponent} from '../../components/popup-password/popup-password.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {UserService} from '../../../services/user.service';
import {User} from '../../domaine/user';
import {PopupNewUserComponent} from '../../components/popup-new-user/popup-new-user.component';
import {PopupCopyComponent} from '../../components/popup-copy/popup-copy.component';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  providers: [UserService]
})

export class AdminUsersComponent implements OnInit {
  @ViewChild('i') i;
  displayedColumns: string[] = ['username', 'prenom', 'nom', 'courriel', 'role', 'act'];
  displayedColumnsEmployeur: string[] = ['prenom', 'nom', 'courriel', 'role', 'act'];
  users: User[];
  employeurs: User[];
  user: User;

  constructor(public dialog: MatDialog, private service: UserService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((users: User[]) => {
        this.users = users.filter(e => e.role.nom !== 'Employeur');
        this.employeurs = users.filter(e => e.role.nom === 'Employeur');
      },
      error => {
        console.log(error);
      });
  }

  changePassord(user: User) {
    this.user = user;
    const dialogRef = this.dialog.open(PopupPasswordComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doChangePassword(this.user, result.password);
      }
    });
  }

  newUser(user: User) {
    const dialogRef = this.dialog.open(PopupNewUserComponent, {
      width: '300px',
      data: {user: user || new User()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result.user, result.password);
      }
    });
  }

  deleteUser(user: User) {
    this.user = user;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doDelete();
      }
    });
  }

  save(user: User, password: string) {
    this.service.save(user, password).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      });
  }

  doChangePassword(user: User, password: string) {
    this.service.changePassword(user, password).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      });
  }

  doDelete() {
    this.service.deleteUser(this.user).subscribe(() => {
        this.getAll();
      },
      error => {
        console.log(error);
      });
  }

  copyLink(user: User) {
    this.service.getLink(user).subscribe((link: string) => {
        this.dialog.open(PopupCopyComponent, {
          width: '600px',
          data: link
        });
      },
      error => {
        console.log(error);
      });
  }
}
