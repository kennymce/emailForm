import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EmailComponent } from './email/email.component';
import { FormsModule } from '@angular/forms';
import { EburyAttachmentListConfComponent } from './ebury-attachment-list-conf/ebury-attachment-list-conf.component';
import { EburyAttachmentListComponent } from './ebury-attachment-list/ebury-attachment-list.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        EmailComponent,
        EburyAttachmentListConfComponent,
        EburyAttachmentListComponent
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ebury-email'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ebury-email');
  });
});
