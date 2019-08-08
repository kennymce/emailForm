import {Component, OnInit, ViewChild} from '@angular/core';
import {EburyAttachmentListComponent} from '../ebury-attachment-list/ebury-attachment-list.component';
import {NgForm} from '@angular/forms';
import {EburyAttachmentListConfComponent} from '../ebury-attachment-list-conf/ebury-attachment-list-conf.component';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.less']
})

export class EmailComponent implements OnInit {
  @ViewChild(EburyAttachmentListComponent, { static: true }) eburyAttachmentListComponent;
  @ViewChild(EburyAttachmentListConfComponent, { static: true }) eburyAttachmentListConfComponent;
  // tslint:disable-next-line:max-line-length
  regexp = new RegExp('^(([a-zA-Z0-9_\\-.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)(\\s*,\\s*|\\s*$))*$');
  attachmentList: any[];
  attachmentCount: number;
  formFields: FormFields;
  editMode: boolean;
  constructor() {
    this.attachmentList = new Array<any>();
    this.formFields = new FormFields();
    this.attachmentCount = 0;
    this.editMode = true;
  }

  validateTo() {
    if (this.formFields.to) {
      return (this.regexp.test(this.formFields.to));
    }
  }

  validateCc() {
    if (this.formFields.cc) {
      return (!this.regexp.test(this.formFields.cc));
    }
  }

  validateBcc() {
    if (this.formFields.bcc) {
      return (!this.regexp.test(this.formFields.bcc));
    }
  }
  ngOnInit() {
  }

  sendImagesToChild(file: FileList) {
    const reader = new FileReader();
    this.eburyAttachmentListComponent.attachmentFile = file;
    reader.readAsDataURL(file[0]);
    try {
      reader.onload = () => this.attachFile(file[0].name, reader.result);
    } catch (error) {
      console.log('File not uploaded');
    }

  }

  attachFile(filename: string, result: any) {
      const attachmentThing: AttachmentThing = new AttachmentThing(filename, result);
      this.attachmentList.push(attachmentThing);
      this.eburyAttachmentListComponent.attachedImages = this.attachmentList;
      this.attachmentCount += 1;
    }

  handleBinClicked() {
    this.attachmentCount -= 1;
  }

  sendEmail(emailForm: NgForm) {
    this.eburyAttachmentListConfComponent.attachedImages = this.attachmentList;
    this.editMode = !this.editMode;
  }
}

export class AttachmentThing {
  id: any;
  image: any;
  constructor(id: any, image: any) {
    this.id = id;
    this.image = image;
  }
}

export class FormFields {
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  message: string;
}
