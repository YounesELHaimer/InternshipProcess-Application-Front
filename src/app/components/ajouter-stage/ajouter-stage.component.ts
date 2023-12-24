import { ChangeDetectionStrategy, AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';


@Component({
  selector: 'app-ajouter-stage',
  templateUrl: './ajouter-stage.component.html',
  styleUrls: ['./ajouter-stage.component.css']
})
export class AjouterStageComponent {
  studentId: number=0;
  nom: string | null = '';
  prenom: string | null = '';
  niveau: string | null = '';

  constructor(private route: ActivatedRoute, 
    private appService: AppService, 
    private router: Router, 
    private authService: AuthService, 
    private _liveAnnouncer: LiveAnnouncer) {
    
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
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
  
}
