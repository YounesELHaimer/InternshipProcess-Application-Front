import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterStagePFEComponent } from './ajouterStagePFE.component';

describe('AjouterStagePFEComponent', () => {
  let component: AjouterStagePFEComponent;
  let fixture: ComponentFixture<AjouterStagePFEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterStagePFEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterStagePFEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
