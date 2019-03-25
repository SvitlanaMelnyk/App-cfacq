import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../domaine/user';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PopupNewUserComponent} from '../popup-new-user/popup-new-user.component';
@Component({
  selector: 'app-popup-copy',
  templateUrl: './popup-copy.component.html',
  styleUrls: ['./popup-copy.component.css'],
})
export class PopupCopyComponent {
  constructor(public dialogRef: MatDialogRef<PopupNewUserComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  copy() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', this.data);
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.dialogRef.close();
  }
}







