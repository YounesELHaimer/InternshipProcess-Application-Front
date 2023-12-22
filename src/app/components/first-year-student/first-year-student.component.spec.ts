import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstYearStudentComponent } from './first-year-student.component';

describe('FirstYearStudentComponent', () => {
  let component: FirstYearStudentComponent;
  let fixture: ComponentFixture<FirstYearStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstYearStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstYearStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
