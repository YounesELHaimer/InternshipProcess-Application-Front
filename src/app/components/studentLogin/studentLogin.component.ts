import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './studentLogin.component.html',
  styleUrls: ['./studentLogin.component.css'],
})
export class StudentLoginComponent implements OnInit {
  errorMessage: string = '';
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private appService: AppService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    this.appService.loginChefFiliere(this.loginForm.value.email, this.loginForm.value.motDePasse).subscribe(
      (response) => {
        // La connexion réussie
        if (response && response.filiere) {
          this.router.navigate(['admin/students/view', response.filiere.id]);
        } else {
          console.error("La propriété 'filiere' est manquante dans la réponse.");
          // Gérez ce cas d'erreur, redirigez peut-être vers une page d'erreur
        }
      },
      (error) => {
        // La connexion a échoué
        this.errorMessage =
          "L'adresse électronique et le mot de passe ne correspondent pas. Réessayez.";
      }
    );
  }
  
  
  
}
