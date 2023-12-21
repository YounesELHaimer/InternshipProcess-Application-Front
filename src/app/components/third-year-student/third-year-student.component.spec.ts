import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdYearStudentComponent } from './third-year-student.component';

describe('ThirdYearStudentComponent', () => {
  let component: ThirdYearStudentComponent;
  let fixture: ComponentFixture<ThirdYearStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdYearStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdYearStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
