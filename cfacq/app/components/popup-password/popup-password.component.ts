import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../domaine/user';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PopupNewUserComponent} from '../popup-new-user/popup-new-user.component';
@Component({
  selector: 'app-popup-password',
  templateUrl: './popup-password.component.html',
  styleUrls: ['./popup-password.component.css'],
})
export class PopupPasswordComponent implements OnInit {
  public form: FormGroup;
  public error_messages: any;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<PopupNewUserComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required
      ])
    });

    this.error_messages = {
      password: [
        { type: 'required', message: 'Mot de passe est requis' },
        { type: 'minlength', message: 'Le nom doit être au moins 8 caractères' }
      ]
    };
  }

  close() {
    this.dialogRef.close();
  }

  changePassword() {
    if (this.form.valid) {
      const d = this.form.value;
      this.dialogRef.close({password: d.password});
    }
  }
}







