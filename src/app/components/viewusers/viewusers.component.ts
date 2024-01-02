import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from 'src/app/Etudiant';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ViewusersComponent implements OnInit {
  myScriptElement: HTMLScriptElement | undefined;


  etudiants: any[] | undefined
  url: string = "http://localhost:4200/";
  isEditMode: boolean = false;
  addEtudiantForm: FormGroup;
  updateEtudiantForm: FormGroup;
  selectedFile: File | undefined;  
  currentPage = 1;
  itemsPerPage = 7;
  filiereId: number | undefined;

  constructor(private service: AppService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src = ' https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.bundle.min.js';
    document.body.appendChild(this.myScriptElement);
    this.addEtudiantForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cne: ['', Validators.required],
      cin: ['', Validators.required],
      
    });


    this.updateEtudiantForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cne: ['', Validators.required],
      cin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.filiereId = params['filiereId'];
      // Utilize filiereId as needed
     
      this.fetchEtudiants(this.filiereId!);
    });
  }
  
  fetchEtudiants(filiereId: number) {
    // Assurez-vous que filiereId existe avant d'effectuer la requête
    if (filiereId) {
      // Utilisez l'ID de la filière pour récupérer les étudiants associés à cette filière
      this.service.getEtudiantsByFiliereId(filiereId).subscribe(data => {
        // Reverse the array to display the latest data first
        this.etudiants = data.reverse();
        // Update the current page to 1 after fetching new data
        this.currentPage = 1;
      });
    } else {
      console.error("ID de filière non disponible");
    }
  }
  addEtudiant() {
    const newEtudiant = this.addEtudiantForm.value;
  
    this.route.params.subscribe((params) => {
      const filiereId = params['filiereId'];
  
      this.service.addEtudiant(newEtudiant, filiereId).subscribe(
        () => {
          // Après un ajout réussi, récupérez à nouveau les étudiants pour mettre à jour la liste
          this.fetchEtudiants(filiereId);
  
          // Effacez le formulaire après l'ajout réussi
          this.addEtudiantForm.reset();
        },
        (error) => {
          // Gérer les erreurs
          console.error("Erreur lors de l'ajout de l'étudiant", error);
        }
      );
    });
  }
  
  // ...
  
  importEtudiants() {
    if (!this.selectedFile) {
      console.log('Please select a file.');
      return;
    }
  
    this.route.params.subscribe((params) => {
      const filiereId = params['filiereId'];
  
      this.service.importEtudiants(this.selectedFile!, filiereId).subscribe(
        response => {
          console.log('Import successful:', response);
  
          // Fetch the updated data after import
          this.fetchEtudiants(filiereId);
          
          // Ajoutez toute manipulation ou rétroaction supplémentaire à l'utilisateur
        },
        error => {
          console.error('Import failed:', error);
          // Gérez l'erreur comme nécessaire
        }
      );
    });
  }
  
  nextPage() {
    const totalPages = Math.ceil((this.etudiants?.length || 0) / this.itemsPerPage);
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
    return this.etudiants?.slice(start, end);
  }
  
  
  

  deleteEtudiant(id: number) {
    this.service.deleteEtudiant(id).subscribe(() => {
      this.etudiants = this.etudiants?.filter(etudiant => etudiant.id !== id);
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
          //this.fetchEtudiants();
          location.reload();
          this.isEditMode = false;
          this.updateEtudiantForm.reset();
        },
        error => {
          console.error('Update failed:', error);
          // Handle error as needed
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