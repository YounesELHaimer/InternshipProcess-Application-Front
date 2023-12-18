import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPage1Component } from './studentPage1.component';

describe('StudentPage1Component', () => {
  let component: StudentPage1Component;
  let fixture: ComponentFixture<StudentPage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPage1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
