import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-encadrant',
  templateUrl: './encadrant.component.html',
  styleUrls: ['./encadrant.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EncadrantComponent implements OnInit {
  myScriptElement: HTMLScriptElement | undefined;
  filiereId: number | undefined;
  assignStagesSuccess: boolean = false;

  professeurs: any[] | undefined;
  url: string = "http://localhost:4200/";
  isEditMode: boolean = false;
  addProfesseurForm: FormGroup;
  updateProfesseurForm: FormGroup;
  selectedFile: File | undefined;
  currentPage = 1;
  itemsPerPage = 7;
  selectedProfesseurs: { [key: number]: boolean } = {};
allSelected: boolean = false;
nullEncadrantCount: number | undefined;

  constructor(private service: AppService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src = ' https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.bundle.min.js';
    document.body.appendChild(this.myScriptElement);

    this.addProfesseurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      departement: ['', Validators.required],
    });

    this.updateProfesseurForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      departement: ['', Validators.required],
    });
  }

  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.filiereId = params['filiereId'];});
    this.fetchProfesseurs();
    this.countNullEncadrantStages();
  }

  fetchProfesseurs() {
    this.service.getAllProfesseurs().subscribe(data => {
      this.professeurs = data.reverse();
      this.currentPage = 1;
    });
  }
  selectAll() {
    this.allSelected = !this.allSelected;
    Object.keys(this.selectedProfesseurs).forEach((key: string) => {
      const professeurId = parseInt(key, 10);
      this.selectedProfesseurs[professeurId] = this.allSelected;
    });
  }
  
  
  updateSelection() {
    // Implement any logic you need when the selection changes
    console.log('Selected Professeurs:', this.selectedProfesseurs);
  }
  assignStages() {
    const selectedProfesseurIds = Object.entries(this.selectedProfesseurs)
      .filter(([key, value]) => value)
      .map(([key]) => parseInt(key, 10) as number);
  
    if (selectedProfesseurIds.length === 0) {
      console.warn('No professeurs selected. Please select at least one professeur.');
      // You can show a message to the user indicating that they need to select at least one professeur.
      return;
    }
  
    const year = '2024'; // Replace with your actual year
    // Replace with your actual filiereId
  
    this.service.assignStagesToEncadrants(selectedProfesseurIds, year, this.filiereId!).subscribe(
      (response) => {
        console.log('Stages assigned successfully:', response);
        // Set assignStagesSuccess to true on success
        this.assignStagesSuccess = true;
        // Reset the success state after a certain time if needed
        setTimeout(() => this.assignStagesSuccess = false, 5000);
        location.reload();
      },
      (error) => {
        console.error('Error assigning stages:', error);
        // Handle error and display appropriate message to the user
      }
    );
  }
  countNullEncadrantStages() {
    const year = '2024'; // Replace with your actual year
     // Replace with your actual filiereId
  
    this.service.countStagesByYearAndFiliereIdAndEncadrantIsNull(year, this.filiereId!).subscribe(
      (count) => {
        this.nullEncadrantCount = count;
        console.log('Stages assigned successfully:', count);
      },
      (error) => {
        console.error('Error counting stages:', error);
      }
    );
  }
  addProfesseur() {
    const newProfesseur = this.addProfesseurForm.value;

    this.service.addProfesseur(newProfesseur).subscribe(
      () => {
        this.fetchProfesseurs();
        this.addProfesseurForm.reset();
      },
      (error) => {
        console.error("Erreur lors de l'ajout du professeur", error);
      }
    );
  }

  importProfesseurs() {
    if (!this.selectedFile) {
      console.log('Veuillez sélectionner un fichier.');
      return;
    }

    this.service.importProfesseurs(this.selectedFile!).subscribe(
      response => {
        console.log('Import réussi :', response);
        this.fetchProfesseurs();
      },
      error => {
        console.error('Échec de limportation :', error);
      }
    );
  }

  nextPage() {
    const totalPages = Math.ceil((this.professeurs?.length || 0) / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get visibleProfesseurs(): any[] | undefined {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.professeurs?.slice(start, end);
  }

  deleteProfesseur(id: number) {
    this.service.deleteProfesseur(id).subscribe(() => {
      this.professeurs = this.professeurs?.filter(professeur => professeur.id !== id);
    });
  }

  editProfesseur(id: number) {
    console.log('Modification du professeur avec ID :', id);
    this.service.getProfesseurById(id).subscribe(professeur => {
      console.log('Données du professeur récupérées :', professeur);
      this.updateProfesseurForm.patchValue(professeur);
      this.isEditMode = true;
    });
  }

  updateProfesseur() {
    if (this.isEditMode) {
      const id = this.updateProfesseurForm.get('id')?.value;
      if (isNaN(id) || id <= 0) {
        console.error('Échec de la mise à jour : ID invalide');
        return;
      }
      const updatedProfesseur = this.updateProfesseurForm.value;
      this.service.updateProfesseur(id, updatedProfesseur).subscribe(
        response => {
          console.log('Mise à jour réussie :', response);
          location.reload();
          this.isEditMode = false;
          this.updateProfesseurForm.reset();
        },
        error => {
          console.error('Échec de la mise à jour :', error);
        }
      );
    } else {
      this.addProfesseur();
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
