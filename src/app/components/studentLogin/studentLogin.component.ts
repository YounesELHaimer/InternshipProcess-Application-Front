import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  errorMessage: string = '';
  loginForm: FormGroup;
  myScriptElement: HTMLScriptElement | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private appService: AppService,
    private authService: AuthService
  ) {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src = ' https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.bundle.min.js';
    document.body.appendChild(this.myScriptElement);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    // Ajoutez ici la logique de vérification des données de connexion
    const isValidCredentials = this.checkCredentials();

    if ( !isValidCredentials) {
      this.errorMessage = "l'adresse électronique et le mot de passe ne correspondent pas. Réessayez.";
    }

    /*this.appService.loginEtudiant(this.loginForm.value.email, this.loginForm.value.motDePasse).subscribe(
      (response) => {
        // La connexion réussie
        if (response) {
          
          this.router.navigate(['student/page/1']);
        } else {
          console.error("La propriété 'filiere' est manquante dans la réponse.");
        }
      },
      (error) => {
        this.errorMessage =
          "L'adresse électronique et le mot de passe ne correspondent pas. Réessayez.";
      }
    );*/
  }

  private checkCredentials(): boolean {
    
    this.appService.loginEtudiant(this.loginForm.value.email, this.loginForm.value.motDePasse).subscribe(
      (response) => {
          if (response) {
            this.authService.login('student', response.id);
            this.router.navigate(['student/page/1', response.id]);
            return true;
          } else {
            return false;
          }
      },
      (error) => {
        this.errorMessage =
          "L'adresse électronique et le mot de passe ne correspondent pas. Réessayez.";
          return false;
      }
    );
    return false;
  }
  
  
  
}
