import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterStagePFAComponent } from './ajouter-stage-pfa.component';

describe('AjouterStagePFAComponent', () => {
  let component: AjouterStagePFAComponent;
  let fixture: ComponentFixture<AjouterStagePFAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterStagePFAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterStagePFAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
