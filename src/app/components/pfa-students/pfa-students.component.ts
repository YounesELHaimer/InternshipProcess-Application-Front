import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Etudiant } from 'src/app/Etudiant';
import { Stage } from 'src/app/Stage';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-pfa-students',
  templateUrl: './pfa-students.component.html',
  styleUrls: ['./pfa-students.component.css']
})
export class PfaStudentsComponent {
  myScriptElement: HTMLScriptElement | undefined;
  stages: Stage[] = [];
  selectedEtudiant: Etudiant | undefined;
  modalRef: NgbModalRef | undefined;
  selectedYear: string | undefined;

  etudiantDetailsModal: NgbModalRef | undefined;

  currentPage = 1;
  itemsPerPage = 7;
  totalPages = 0; // Added this variable
  filiereId: number | undefined;

  constructor(private service: AppService, private route: ActivatedRoute,private modalService: NgbModal,private el: ElementRef, private renderer: Renderer2) { 
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src = ' https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.bundle.min.js';
    document.body.appendChild(this.myScriptElement); 
    
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.filiereId = params['filiereId'];
      this.fetchStages();
    }); 
  }
  openEtudiantDetailsModal(etudiant: Etudiant) {
    this.selectedEtudiant = etudiant;
    const modalElement = this.el.nativeElement.querySelector('#etudiantDetailsModal');
    
    // Manually open the modal using Bootstrap's modal method
    this.renderer.addClass(modalElement, 'show');
    this.renderer.setStyle(modalElement, 'display', 'block');
  
    
  }
  closeEtudiantDetailsModal() {
    const modalElement = this.el.nativeElement.querySelector('#etudiantDetailsModal');
    
    // Manually close the modal using Bootstrap's modal method
    this.renderer.removeClass(modalElement, 'show');
    this.renderer.setStyle(modalElement, 'display', 'none');
  }
  
  fetchStages() {
    if (this.filiereId) {
      this.service.getStagesByFiliereId(this.filiereId).subscribe(data => {
        // Reverse the array to display the latest data first
        this.stages = data.reverse().filter(stage => {
          // Check if stage.type is a non-empty string before calling toLowerCase()
          const isPFE = typeof stage.type === 'string' && stage.type.toLowerCase() === 'pfa';
          const isMatchingYear = !this.selectedYear || stage.annee === this.selectedYear; // Add this line
          return isPFE && isMatchingYear; // Update this line
        });
        this.totalPages = Math.ceil(this.stages.length / this.itemsPerPage);
        this.currentPage = 1;
      });
    }
  }
  
  getUniqueYears(): string[] {
    return [...new Set(this.stages.map(stage => stage.annee || ''))];
  }
  
  
  
  

  get visibleStages(): Stage[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.stages.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}