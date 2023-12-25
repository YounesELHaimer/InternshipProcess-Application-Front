import { ChangeDetectionStrategy, AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { Etudiant } from 'src/app/Etudiant';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PopupService } from 'src/app/popup.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



interface User {
  email: string;
  password: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const users: User[] = [
  { email: 'younes@gmail.com', password: '123456' },
  { email: 'badr@gmail.com', password: '123456' },
  // Ajoutez d'autres utilisateurs au besoin
];

@Component({
  selector: 'app-student-page1',
  templateUrl: './studentPage1.component.html',
  styleUrls: ['./studentPage1.component.css'],
})
export class StudentPage1Component implements OnInit {
  myScriptElement: HTMLScriptElement | undefined;
  studentId: number=0;
  nom: string | null = '';
  prenom: string | null = '';
  niveau: string | null = '';
  errorMessage: string = ''; 
  stages: any[] | undefined;
  selectedStage: any[] | undefined;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  isJuryPopupOpen = false;
  isModifierPopupOpen= false;
  isEncadrantPopupOpen= false;



  constructor(private route: ActivatedRoute, 
    private appService: AppService, 
    private router: Router, 
    private authService: AuthService, 
    private popupService: PopupService,
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
    this.fetchStages(this.studentId);

  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  displayedColumns: string[] = ['type', 'debut', 'fin', 'organisme', 'sujet', 'statut' ,'encadrant', 'jurys', 'actions'];  

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  fetchStages(filiereId: number) {
    if (filiereId) {
      this.appService.getStagesByEtudiantId(this.studentId).subscribe(data => {
        this.stages = data.reverse();
        this.dataSource.data = data.map(item => ({
          ...item,
          encadrantNomComplet: item.encadrant ? 'Pr. '+item.encadrant.nom+' '+item.encadrant.prenom : '-',
          statut: (() => {
            const currentDate = new Date();
            const debutDate = new Date(item.dateDeDebut);
            const finDate = new Date(item.dateFin);
  
            if (currentDate >= debutDate && currentDate <= finDate) {
              return 'En Cours';
            } else if (currentDate > finDate) {
              return 'Terminé';
            } else {
              return 'En Attente';
            }
          })(),
        }));
        console.log(this.dataSource.data);
      });
    } else {
      console.error("Error de l'ID");
    }
  }

  AddStage(){
    const currentDate = new Date();
    const isDateInRange = this.checkIfCurrentDateIsInRange(currentDate);
  
    if (this.niveau === "3" && isDateInRange) {
      this.router.navigate(['student/AddStage/PFE', this.studentId]);
    } else if(this.niveau == "1" && isDateInRange) {
      this.router.navigate(['student/AddStage', this.studentId]);
    } else if(this.niveau == "2" && isDateInRange) {
      this.router.navigate(['student/AddStage/PFA', this.studentId]);
    }
    else{
      this.router.navigate(['student/countdown', this.studentId]);
    }
  }
  
  checkIfCurrentDateIsInRange(currentDate: Date): boolean {
    // Définir les dates de début et de fin de la plage (1/11/yyyy au 31/01/yyyy+1)
    let startDate = new Date(currentDate.getFullYear(), 10, 1); // 10 représente novembre (0-indexed)
    let endDate = new Date(currentDate.getFullYear(), 11, 15); // 0 représente janvier (0-indexed)
    if(this.niveau === "3" ){
      startDate = new Date(currentDate.getFullYear(), 10, 1); 
      endDate = new Date(currentDate.getFullYear()+1, 0, 31); 
      
    }else if (this.niveau === "1" || this.niveau === "2"){
      if(currentDate.getMonth() <= 5 && currentDate.getMonth() >= 1){
        startDate = new Date(currentDate.getFullYear(), 5, 1); 
        endDate = new Date(currentDate.getFullYear(), 6, 15); 
      }
      else{
        startDate = new Date(currentDate.getFullYear()+1, 5, 1); 
        endDate = new Date(currentDate.getFullYear()+1, 6, 15); 
      }
    }
    return currentDate >= startDate && currentDate <= endDate;
    
  }

  selectedStageId: number = 0; 
  selectedStageJurys: any[] = [];
  selectedEncadrant: any[] = [];
  openJuryPopup(stageId: number) {
    this.isJuryPopupOpen = true;
    const selectedStage = this.dataSource.data.find(item => item.id === stageId);
    this.selectedStageJurys = selectedStage ? selectedStage.jurys || [] : [];
  }
  
  closeJuryPopup() {
    this.isJuryPopupOpen = false;
  }

  openModifierPopup(stageId: number) {
    this.isModifierPopupOpen = true;
    this.selectedStage = this.dataSource.data.find(item => item.id === stageId);
  }
  
  closeModifierPopup() {
    this.isModifierPopupOpen = false;
  }

  openEncadrantPopup(encadrant: any) {
    this.isEncadrantPopupOpen = true;
    this.selectedEncadrant = encadrant;
  }

  closeEncadrantPopup() {
    this.isEncadrantPopupOpen = false;
  }
  
}
