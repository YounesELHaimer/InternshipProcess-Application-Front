import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfeStudentsComponent } from './pfe-students.component';

describe('PfeStudentsComponent', () => {
  let component: PfeStudentsComponent;
  let fixture: ComponentFixture<PfeStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfeStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfeStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
