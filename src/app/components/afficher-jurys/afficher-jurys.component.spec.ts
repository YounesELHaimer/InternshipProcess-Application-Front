import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherJurysComponent } from './afficher-jurys.component';

describe('AfficherJurysComponent', () => {
  let component: AfficherJurysComponent;
  let fixture: ComponentFixture<AfficherJurysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherJurysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherJurysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
