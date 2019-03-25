import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../domaine/user';
import {Role} from '../../domaine/role';
import {RoleService} from '../../../services/role.service';

@Component({
  selector: 'app-popup-new-user',
  templateUrl: './popup-new-user.component.html',
  styleUrls: ['./popup-new-user.component.css'],
  providers: [RoleService]
})
export class PopupNewUserComponent implements OnInit {
  public form: FormGroup;
  public error_messages: any;
  roles: Role[];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<PopupNewUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private serviceRole: RoleService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: new FormControl(this.data.user.username, [
        Validators.minLength(2),
        Validators.required
      ]),
      prenom: new FormControl(this.data.user.prenom, [
        Validators.minLength(2),
        Validators.required
      ]),
      nom: new FormControl(this.data.user.nom, [
        Validators.minLength(2),
        Validators.required
      ]),
      courriel: new FormControl(this.data.user.courriel, [
        Validators.email,
        Validators.required
      ]),
      role: new FormControl(this.data.user.role, [
        Validators.required
      ])
    });

    if (!this.data.user.id) {
      this.form.addControl('password', new FormControl(this.data.user.prenom, [
        Validators.minLength(8),
        Validators.required
      ]));
    }

    this.error_messages = {
      username: [
        {type: 'required', message: 'Le nom d\'utilisateur est requis'},
        {type: 'minlength', message: 'Le nom doit être au moins 6 caractères'}
      ],
      prenom: [
        {type: 'required', message: 'Le prénom est requis'},
        {type: 'minlength', message: 'Le nom doit être au moins 2 caractères'}
      ],
      nom: [
        {type: 'required', message: 'Le nom est requis'},
        {type: 'minlength', message: 'Le nom doit être au moins 2 caractères'}
      ],
      courriel: [
        {type: 'required', message: 'L\'adresse courriel est requise'},
        {type: 'email', message: 'L\'adresse courriel n\'est pas valide'}
      ],
      role: [
        {type: 'required', message: 'Le role est requis'}
      ],
      password: [
        {type: 'required', message: 'Le mot de passe est requis'},
        {type: 'minlength', message: 'Le nom doit être au moins 8 caractères'}
      ]
    };

    this.form.get('role').valueChanges.subscribe(val => {
      if (val.nom === 'Employeur') {
        this.form.removeControl('username');
        this.form.removeControl('password');
      } else {
        this.form.addControl('username', new FormControl(this.data.user.username, [
          Validators.minLength(6),
          Validators.required
        ]));
        if (!this.data.user.id) {
          this.form.addControl('password', new FormControl(this.data.user.prenom, [
            Validators.minLength(8),
            Validators.required
          ]));
        }
      }
    });

    this.getRoles();
  }

  isEmployeur() {
    const e = this.form.get('role').value;
    return e && e.nom === 'Employeur';
  }

  getRoles() {
    this.serviceRole.getAll().subscribe((roles: Role[]) => {
        this.roles = roles;

        if (this.data.user.role) {
          const c = this.roles.filter(e => e.id === this.data.user.role.id);
          if (c.length > 0) {
            this.form.get('role').setValue(c[0]);
          }
        }
      },
      error => {
        console.log(error);
      });
  }

  close() {
    this.dialogRef.close();
  }

  create() {
    if (this.form.valid) {
      const d = this.form.value;
      const t = new User();
      t.id = this.data.user.id;
      t.username = d.username;
      t.prenom = d.prenom;
      t.nom = d.nom;
      t.courriel = d.courriel;
      t.role = d.role;

      this.dialogRef.close({user: t, password: d.password});
    }
  }
}
