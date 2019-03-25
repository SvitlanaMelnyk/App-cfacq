import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FileCvService} from '../../../services/fileCv.service';
import {FormCreateCvComponent} from '../form-create-cv/form-create-cv.component';
import {CvService} from '../../../services/cv.service';


@Component({
  selector: 'app-form-post-cv',
  templateUrl: './form-post-cv.component.html',
  styleUrls: ['./form-post-cv.component.css'],
  providers: [FileCvService, CvService]
})
export class FormPostCVComponent implements OnInit {
  @ViewChild('form') cvCreationForm: FormCreateCvComponent;

  public joindreCV: FormGroup;
  public error_messages: any;
  public file: any;
  notForm: boolean;
  success: boolean;
  sent: boolean;
  sending: boolean;

  constructor(private fb: FormBuilder, private fileCvService: FileCvService, private cvService: CvService) {
    this.success = null;
  }

  ngOnInit() {
    this.notForm = false;
    this.joindreCV = this.fb.group({
      fileType: new FormControl('', Validators.pattern('(.*?)\.(pdf|PDF)$'))
    });
    this.error_messages = {
      fileType: [
        {type: 'pattern', message: 'Type de fichier doit être .pdf'}
      ],
    };
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;
    }
    this.notForm = true;
  }

  sendCv() {
    // file size 25mb = 25000000bytes
    if (!this.sending) {
      if (this.file && this.joindreCV.valid && this.file.size <= 25000000) {
        this.sending = true;
        this.fileCvService.uploadCV(this.file).subscribe(
          () => {
            this.success = true;
          },
          () => {
            this.success = false;
          });
      }
    }
  }

  showForm() {
    this.notForm = false;
  }

  sendToServer(cv) {
    if (!this.sending) {
      this.sending = true;
      this.cvService.save(cv).subscribe(
        (data: any) => {
          this.success = true;
        },
        error => {

        }
      );
    }
  }
}
