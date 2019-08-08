import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EburyAttachmentListConfComponent} from './ebury-attachment-list-conf.component';
import {EburyAttachmentListComponent} from '../ebury-attachment-list/ebury-attachment-list.component';

describe('EburyAttachmentListConfComponent', () => {
  let component: EburyAttachmentListConfComponent;
  let fixture: ComponentFixture<EburyAttachmentListConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EburyAttachmentListConfComponent,
        EburyAttachmentListComponent,
        EburyAttachmentListConfComponent,
        EburyAttachmentListConfComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EburyAttachmentListConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
