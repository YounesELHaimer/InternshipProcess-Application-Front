import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Etudiant } from 'src/app/Etudiant';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth.service';


interface User {
  email: string;
  password: string;
}

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

  errorMessage: string = ''; 
  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  
}