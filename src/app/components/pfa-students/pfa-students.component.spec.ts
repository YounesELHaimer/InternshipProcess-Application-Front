import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfaStudentsComponent } from './pfa-students.component';

describe('PfaStudentsComponent', () => {
  let component: PfaStudentsComponent;
  let fixture: ComponentFixture<PfaStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfaStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfaStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
