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
  selector: 'app-login',
  templateUrl: './studentLogin.component.html',
  styleUrls: ['./studentLogin.component.css'],
})
export class StudentLoginComponent implements OnInit {
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
  
  login() {
    // Ajoutez ici la logique de vérification des données de connexion
    const isValidCredentials = this.checkCredentials();

    if (isValidCredentials) {
      this.authService.login('student');
      this.router.navigate(['student/page/1']);
      console.log('login successful');
      console.log(this.authService.getUserRole());
    } else {
      this.errorMessage = "l'adresse électronique et le mot de passe ne correspondent pas. Réessayez.";
    }
  }

  private checkCredentials(): boolean {
    const user = users.find((u) => u.email === this.loginForm.value.email);

    if (!user || user.password !== this.loginForm.value.motDePasse) {
      return false;
    }

    return true;
  }
  
}