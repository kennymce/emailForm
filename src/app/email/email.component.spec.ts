/* tslint:disable:no-string-literal */
import {async, tick, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {AttachmentThing, EmailComponent} from './email.component';
import {EburyAttachmentListConfComponent} from '../ebury-attachment-list-conf/ebury-attachment-list-conf.component';
import {EburyAttachmentListComponent} from '../ebury-attachment-list/ebury-attachment-list.component';
import {DebugElement} from '@angular/core';
import {type} from 'os';

describe('EmailComponent', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;
  let rootElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmailComponent,
        EburyAttachmentListConfComponent,
        EburyAttachmentListComponent
      ],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When validating the form', () => {
    const invalidEmail = 'thisisnotavalidemail';
    const validEmail = 'this@that.com';
    const invalidClass = 'is-invalid';
    const validClass = 'ng-valid';

    beforeEach(() => {
      fixture = TestBed.createComponent(EmailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      rootElement = fixture.debugElement;
    });

    describe('The TO field', () => {

      it('should show a validation error if the TO field contains an invalid email address', () => {
        fixture.whenStable().then(() => {
          const theInput = fixture.nativeElement.querySelector('#to');
          theInput.value = invalidEmail;
          theInput.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          expect(theInput.classList).toContain(invalidClass);
        });
      });

      it('should not show a validation error if the TO field contains a valid email address', () => {
        fixture.whenStable().then(() => {
          const theInput = fixture.nativeElement.querySelector('#to');
          theInput.value = validEmail;
          theInput.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          expect(theInput.classList).not.toContain(invalidClass);
          expect(theInput.classList).toContain(validClass);
        });
      });

    });

    describe('The CC field', () => {

      it('should show a validation error if the CC field contains an invalid email address', () => {
        fixture.whenStable().then(() => {
          const theInput = fixture.nativeElement.querySelector('#cc');
          theInput.value = invalidEmail;
          theInput.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          expect(theInput.classList).toContain(invalidClass);
        });
      });

      it('should not show a validation error if the CC field contains a valid email address', () => {
        fixture.whenStable().then(() => {
          const theInput = fixture.nativeElement.querySelector('#cc');
          theInput.value = validEmail;
          theInput.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          expect(theInput.classList).not.toContain(invalidClass);
          expect(theInput.classList).toContain(validClass);
        });
      });
    });

    describe('The BCC field', () => {

      it('should show a validation error if the BCC field contains an invalid email address', () => {
        fixture.whenStable().then(() => {
          const theInput = fixture.nativeElement.querySelector('#bcc');
          theInput.value = invalidEmail;
          theInput.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          expect(theInput.classList).toContain(invalidClass);
        });
      });

      it('should not show a validation error if the BCC field contains a valid email address', () => {
        fixture.whenStable().then(() => {
          const theInput = fixture.nativeElement.querySelector('#bcc');
          theInput.value = validEmail;
          theInput.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          expect(theInput.classList).not.toContain(invalidClass);
          expect(theInput.classList).toContain(validClass);
        });
      });
    });

    describe('the Send button', () => {

      it('should be disabled when there is not a valid email address in the TO field', () => {
        const theButton = fixture.nativeElement.querySelector('#send');
        const theTo = fixture.nativeElement.querySelector('#to');
        const theCc = fixture.nativeElement.querySelector('#cc');
        const theBcc = fixture.nativeElement.querySelector('#bcc');
        const theSubject = fixture.nativeElement.querySelector('#subject');
        const theMessage = fixture.nativeElement.querySelector('#message');

        fixture.whenStable().then(() => {
          theTo.value = invalidEmail;
          theTo.dispatchEvent(new Event('input'));
          theSubject.value = 'subject';
          theSubject.dispatchEvent(new Event('input'));
          theMessage.value = 'message';
          theMessage.dispatchEvent(new Event('input'));

          expect(theButton.disabled).toBeTruthy();
        });
      });

      it(`should be enabled when this is a valid email in the TO field and subject and message are provided`, () => {
        const theButton = fixture.nativeElement.querySelector('#send');
        const theTo = fixture.nativeElement.querySelector('#to');
        const theCc = fixture.nativeElement.querySelector('#cc');
        const theBcc = fixture.nativeElement.querySelector('#bcc');
        const theSubject = fixture.nativeElement.querySelector('#subject');
        const theMessage = fixture.nativeElement.querySelector('#message');

        fixture.whenStable().then(() => {
          theTo.value = validEmail;
          theTo.dispatchEvent(new Event('input'));
          theSubject.value = 'subject';
          theSubject.dispatchEvent(new Event('input'));
          theMessage.value = 'message';
          theMessage.dispatchEvent(new Event('input'));

          expect(theButton.classList).not.toContain('disabled');
        });
      });

    });
  });

  describe('When clicking on the paper-clip and providing a file', () => {
    const fileReaderSpy = jasmine.createSpyObj('FileReader', ['readAsDataURL', 'onloadend']);

    const blob = new Blob([''], { type: 'text/html' });
    blob['lastModifiedDate'] = '';
    blob['name'] = 'testFileName';
    const file = blob as File;
    const fileList = {
      0: file,
      1: file,
      length: 2,
      item: (index: number) => file
    };
    const mockReader = jasmine.createSpyObj('FileReader', ['readAsDataURL', 'onload']);

    it('should add the file to the attachment list', () => {
      spyOn(window as any, 'FileReader').and.returnValue(mockReader);
      component.sendImagesToChild(fileList);

      fixture.whenStable().then(() => {
        expect((window as any).FileReader).toHaveBeenCalled();
        expect(mockReader.readAsDataURL).toHaveBeenCalledWith(fileList[0]);
      });
    });

  });

  describe('the attachFile method', () => {

    it('should create a new attachmentThing and add it to the attachmentListComponent attached images', () => {
      const testAttachmentThing = {id: '1', image: {} };
      component.attachFile(testAttachmentThing.id, testAttachmentThing.image);

      expect(component.attachmentCount).toBe(1);
    });
  });

  describe('the handleBinClicked method', () => {

    it('should decrement the attachment count on the component', () => {
      const testAttachmentThing = {id: '1', image: {} };
      component.attachFile(testAttachmentThing.id, testAttachmentThing.image);

      component.handleBinClicked();
      expect(component.attachmentCount).toBe(0);
    });
  });
  afterAll(() => {
    component = null;
  });

});
