import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmailComponent } from './email/email.component';
import { EburyAttachmentListComponent } from './ebury-attachment-list/ebury-attachment-list.component';
import {FormsModule} from '@angular/forms';
import { EburyAttachmentListConfComponent } from './ebury-attachment-list-conf/ebury-attachment-list-conf.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailComponent,
    EburyAttachmentListComponent,
    EburyAttachmentListConfComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EburyAttachmentListComponent] // Required so we can add Attachment components to the DOM
})
export class AppModule { }
