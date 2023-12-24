import { AfterViewInit, Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { Etudiant } from 'src/app/Etudiant';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css'],
  
})
export class CountdownComponent implements OnInit, AfterViewInit {
  studentId: number=0;
  nom: string | null = '';
  prenom: string | null = '';
  niveau: string | null = '';
  year: number = 0;
  date: any;
  now: any;
  targetDate: any = new Date();
  targetTime: any = this.targetDate.getTime();
  difference: number=0;
  months: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  currentTime: any = `${
    this.months[this.targetDate.getMonth()]
  } ${this.targetDate.getDate()}, ${this.targetDate.getFullYear()}`;

  @ViewChild('days', { static: true }) days: ElementRef;
  @ViewChild('hours', { static: true }) hours: ElementRef;
  @ViewChild('minutes', { static: true }) minutes: ElementRef;
  @ViewChild('seconds', { static: true }) seconds: ElementRef;

  constructor(private route: ActivatedRoute, 
    private appService: AppService, 
    private router: Router, 
    private authService: AuthService, 
    private _liveAnnouncer: LiveAnnouncer,) {

      this.days = new ElementRef(null);
      this.hours = new ElementRef(null);
      this.minutes = new ElementRef(null);
      this.seconds = new ElementRef(null);
  }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.studentId = Number(this.route.snapshot.paramMap.get('etudiantId'));
    this.appService.getEtudiantById(this.studentId).subscribe(
      (student) => {
        this.nom = student.nom;
        this.prenom = student.prenom;
        this.niveau = student.niveau;
        this.targerDate();
        this.initializeTimer();
      },
      (error) => {
        console.error('Error fetching student data', error);
      }
    );

 }

 targerDate() {
  console.log(this.year);
  if (this.niveau === '3') {
    this.targetDate = new Date(this.year, 10, 1);
  } else if (this.niveau === '1' || this.niveau === '2') {
    this.targetDate = new Date(this.year + 1, 5, 1);
  }
  this.targetTime = this.targetDate.getTime();
  this.currentTime = `${this.targetDate.getDate()} ${
    this.months[this.targetDate.getMonth()]
  } ${this.targetDate.getFullYear()}`;
}
initializeTimer() {
  setInterval(() => {
    this.tickTock();
    this.difference = this.targetTime - this.now;
    this.difference = this.difference / (1000 * 60 * 60 * 24);

    !isNaN(this.days.nativeElement.innerText)
      ? (this.days.nativeElement.innerText = Math.floor(this.difference))
      : (this.days.nativeElement.innerHTML = `<img src="https://i.gifer.com/VAyR.gif" />`);
  }, 1000);
}

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.tickTock();
      this.difference = this.targetTime - this.now;
      this.difference = this.difference / (1000 * 60 * 60 * 24);

      !isNaN(this.days.nativeElement.innerText)
        ? (this.days.nativeElement.innerText = Math.floor(this.difference))
        : (this.days.nativeElement.innerHTML = `<img src="https://i.gifer.com/VAyR.gif" />`);
    }, 1000);
  }

  tickTock() {
    this.date = new Date();
    this.now = this.date.getTime();
    this.days.nativeElement.innerText = Math.floor(this.difference);
    this.hours.nativeElement.innerText = 23 - this.date.getHours();
    this.minutes.nativeElement.innerText = 60 - this.date.getMinutes();
    this.seconds.nativeElement.innerText = 60 - this.date.getSeconds();
  }

  
}

