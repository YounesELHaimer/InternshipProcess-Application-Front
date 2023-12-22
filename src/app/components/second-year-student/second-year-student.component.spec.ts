import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondYearStudentComponent } from './second-year-student.component';

describe('SecondYearStudentComponent', () => {
  let component: SecondYearStudentComponent;
  let fixture: ComponentFixture<SecondYearStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondYearStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondYearStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
