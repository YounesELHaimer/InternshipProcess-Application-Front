import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  
  currentPage = 1;
  itemsPerPage = 7;
  totalPages = 0; // Added this variable
  filiereId: number | undefined;

  constructor(private service: AppService, private route: ActivatedRoute) { 
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

  fetchStages() {
    if (this.filiereId) {
      this.service.getStagesByFiliereId(this.filiereId).subscribe(data => {
        // Reverse the array to display the latest data first
        this.stages = data.reverse().filter(stage => stage.type === 'PFA');
        this.totalPages = Math.ceil(this.stages.length / this.itemsPerPage);
        this.currentPage = 1;
      });
    }
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