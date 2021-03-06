import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationsComponent } from './specifications.component';

describe('SpecificationsComponent', () => {
  let component: SpecificationsComponent;
  let fixture: ComponentFixture<SpecificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
