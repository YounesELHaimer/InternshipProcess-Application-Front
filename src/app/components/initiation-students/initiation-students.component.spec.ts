import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiationStudentsComponent } from './initiation-students.component';

describe('InitiationStudentsComponent', () => {
  let component: InitiationStudentsComponent;
  let fixture: ComponentFixture<InitiationStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiationStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiationStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
