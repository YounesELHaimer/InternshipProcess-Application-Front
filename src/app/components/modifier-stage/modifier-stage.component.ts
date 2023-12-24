import { Input, Output, EventEmitter, Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import * as moment from 'moment';

@Component({
  selector: 'app-modifier-stage',
  templateUrl: './modifier-stage.component.html',
  styleUrls: ['./modifier-stage.component.css']
})
export class ModifierStageComponent {
  @Input() stage: any;
  @Output() closePopupEvent = new EventEmitter<void>();
  registerForm: FormGroup;
  submitted = false;
  constructor(private route: ActivatedRoute, 
    private appService: AppService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    private _liveAnnouncer: LiveAnnouncer) {
      this.registerForm = this.formBuilder.group({
        organismeDaccueil: ['', [Validators.required]],
        sujet: ['', [Validators.required]],
        dateDeDebut: ['', [Validators.required]],
        dateFin: ['', [Validators.required]],
        });
  }

  get f() { 
    return this.registerForm.controls; 
  }

  modifier(){
    const stage = {
      id: this.route.snapshot.params['id'],
      organismeDaccueil: this.registerForm.value.organismeDaccueil,
      sujet: this.registerForm.value.sujet,
      dateDeDebut: this.registerForm.value.dateDeDebut,
      dateFin: this.registerForm.value.dateFin,
    };

    this.submitted = true;
    const newStage = this.registerForm.value;
    newStage.type = this.stage.type;
    newStage.dateDeDebut = moment(newStage.dateDeDebut, 'YYYY-MM-DD').toDate();
    newStage.dateFin = moment(newStage.dateFin, 'YYYY-MM-DD').toDate();
    newStage.annee = newStage.dateDeDebut.getFullYear();
    if (this.registerForm.invalid) {
        console.log("Form is invalid. Aborting submission.");
        Object.keys(this.registerForm.controls).forEach(controlName => {
          console.log(`Control: ${controlName}, Errors:`, this.registerForm.get(controlName)?.errors);
        });
        return;
    }
    
    this.route.params.subscribe((params) => {
      this.appService.updateStage(this.stage.id, newStage).subscribe(
        () => {
          this.closePopup();
        },
        (error: Error) => {
          console.error("Erreur lors de modification de l'étudiant", error);
        }
      );
    });
  }

  closePopup() {
    this.closePopupEvent.emit();
  }
}
