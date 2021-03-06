import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DicomComponent } from './dicom.component';

describe('DicomComponent', () => {
  let component: DicomComponent;
  let fixture: ComponentFixture<DicomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
