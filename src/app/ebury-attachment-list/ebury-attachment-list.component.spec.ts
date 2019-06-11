import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EburyAttachmentListComponent } from './ebury-attachment-list.component';

describe('EburyAttachmentListComponent', () => {
  let component: EburyAttachmentListComponent;
  let fixture: ComponentFixture<EburyAttachmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EburyAttachmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EburyAttachmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
