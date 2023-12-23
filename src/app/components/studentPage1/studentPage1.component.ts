import { ChangeDetectionStrategy, AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { Etudiant } from 'src/app/Etudiant';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


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
  errorMessage: string = ''; 
  stages: any[] | undefined
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();


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

  displayedColumns: string[] = ['type', 'debut', 'fin', 'organisme', 'sujet'];  

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
        this.dataSource.data = data.reverse();
        console.log(this.stages);
        console.log(this.dataSource);
      });
    } else {
      console.error("Error de l'ID");
    }
  }

  
}
