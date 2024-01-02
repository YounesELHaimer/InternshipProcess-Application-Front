import { ChangeDetectionStrategy, AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import * as moment from 'moment';

@Component({
  selector: 'app-ajouter-stage-pfa',
  templateUrl: './ajouter-stage-pfa.component.html',
  styleUrls: ['./ajouter-stage-pfa.component.css']
})
export class AjouterStagePFAComponent {
  studentId: number=0;
  nom: string | null = '';
  prenom: string | null = '';
  niveau: string | null = '';
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

  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    const newStage = this.registerForm.value;
    newStage.type = "PFA" ;
    newStage.dateDeDebut = moment(newStage.dateDeDebut, 'YYYY-MM-DD').toDate();
    newStage.dateFin = moment(newStage.dateFin, 'YYYY-MM-DD').toDate();
    if (this.registerForm.invalid) {
        console.log("Form is invalid. Aborting submission.");
        Object.keys(this.registerForm.controls).forEach(controlName => {
          console.log(`Control: ${controlName}, Errors:`, this.registerForm.get(controlName)?.errors);
        });
        return;
    }
    
    this.route.params.subscribe((params) => {
      this.appService.addStage(newStage, this.studentId).subscribe(
        () => {
          this.router.navigate(['student/page/1', this.studentId]);
          this.registerForm.reset();
        },
        (error: Error) => {
          // Gérer les erreurs
          console.error("Erreur lors de l'ajout de l'étudiant", error);
        }
      );
    });
  
  }

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('etudiantId'));
    this.appService.getEtudiantById(this.studentId).subscribe(
      (student) => {
        this.nom = student.nom;
        this.prenom = student.prenom;
        this.niveau = student.niveau;
      },
      (error) => {
        console.error('Error fetching student data', error);
      }
    );

    this.registerForm = this.formBuilder.group({
      organismeDaccueil: ['', [Validators.required]],
        sujet: ['', [Validators.required]],
        dateDeDebut: ['', [Validators.required]],
        dateFin: ['', [Validators.required]],
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  
}
