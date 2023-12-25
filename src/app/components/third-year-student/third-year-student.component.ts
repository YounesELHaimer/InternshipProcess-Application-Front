import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Etudiant } from 'src/app/Etudiant';
import { AppService } from 'src/app/app.service';

import { Stage } from 'src/app/Stage';
import { StageDetailsComponent } from '../viewusers/StageDetailsComponent';

@Component({
  selector: 'app-third-year-student',
  templateUrl: './third-year-student.component.html',
  styleUrls: ['./third-year-student.component.css']
})
export class ThirdYearStudentComponent {
  myScriptElement: HTMLScriptElement | undefined;
  firstYearEtudiants: Etudiant[] = [];

  etudiants: any[] | undefined
  url: string = "http://localhost:4200/";
  isEditMode: boolean = false;
  addEtudiantForm: FormGroup;
  updateEtudiantForm: FormGroup;
  selectedFile: File | undefined;  
  currentPage = 1;
  itemsPerPage = 7;
  filiereId: number | undefined;

  constructor(private service: AppService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router,private dialog: MatDialog) {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src = ' https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.bundle.min.js';
    document.body.appendChild(this.myScriptElement);
    this.addEtudiantForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cne: ['', Validators.required],
      cin: ['', Validators.required],
      niveau: ['3', Validators.required],
      codeApogee: ['', Validators.required],
      
    });


    this.updateEtudiantForm = this.fb.group({
      
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cne: ['', Validators.required],
      cin: ['', Validators.required],
      niveau: ['3'],
    });
  }

  
    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.filiereId = params['filiereId'];
        this.fetchFirstYearEtudiants();
      });
    }
    showDetails(etudiantId: number) {
      this.service.getStagesByEtudiantId(etudiantId).subscribe(stages => {
        this.showDetailsPopup(stages);
      });
    }
  
    showDetailsPopup(stages: Stage[]) {
      const dialogRef = this.dialog.open(StageDetailsComponent, {
        data: { stages: stages },
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('Modal closed with result:', result);
      });
    }
    fetchFirstYearEtudiants() {
      this.service.getEtudiantsByFiliereId(this.filiereId!).subscribe((etudiants) => {
        // Assuming your Etudiant interface has a property 'Niveau'
        this.firstYearEtudiants = etudiants.filter((etudiant) => etudiant.niveau === '3');
      });
    }
  
    addEtudiant() {
      const newEtudiant = this.addEtudiantForm.value;
      this.service.addEtudiant(newEtudiant, this.filiereId!).subscribe(
        () => {
          this.fetchFirstYearEtudiants();
          this.addEtudiantForm.reset();
        },
        (error) => {
          console.error("Error adding student:", error);
        }
      );
    }
  
    importEtudiants() {
      if (!this.selectedFile) {
        console.log('Please select a file.');
        return;
      }
  
      this.service.importEtudiants(this.selectedFile!, this.filiereId!).subscribe(
        response => {
          console.log('Import successful:', response);
          this.fetchFirstYearEtudiants();
        },
        error => {
          console.error('Import failed:', error);
        }
      );
    }
  
    nextPage() {
      const totalPages = Math.ceil((this.firstYearEtudiants?.length || 0) / this.itemsPerPage);
      if (this.currentPage < totalPages) {
        this.currentPage++;
      }
    }
  
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  
    get visibleEtudiants(): Etudiant[] | undefined {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.firstYearEtudiants?.slice(start, end);
    }
  
    deleteEtudiant(id: number) {
      this.service.deleteEtudiant(id).subscribe(() => {
        this.firstYearEtudiants = this.firstYearEtudiants?.filter(etudiant => etudiant.id !== id);
      });
    }
  
    editEtudiant(id: number) {
      console.log('Editing etudiant with ID:', id);
      this.service.getEtudiantById(id).subscribe(etudiant => {
        console.log('Fetched etudiant data:', etudiant);
        this.updateEtudiantForm.patchValue(etudiant);
        this.isEditMode = true;
      });
    }
  
    updateEtudiant() {
      if (this.isEditMode) {
        const id = this.updateEtudiantForm.get('id')?.value;
        if (isNaN(id) || id <= 0) {
          console.error('Update failed: Invalid ID');
          return;
        }
        const updatedEtudiant: Etudiant = this.updateEtudiantForm.value as Etudiant;
        this.service.updateEtudiant(id, updatedEtudiant).subscribe(
          response => {
            console.log('Update successful:', response);
            this.isEditMode = false;
            this.updateEtudiantForm.reset();
          },
          error => {
            console.error('Update failed:', error);
          }
        );
      } else {
        this.addEtudiant();
      }
    }
  
    onFileChange(event: any) {
      this.selectedFile = event.target.files[0];
    }
  
}
