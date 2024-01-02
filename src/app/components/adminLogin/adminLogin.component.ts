import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './adminLogin.component.html',
  styleUrls: ['./adminLogin.component.css'],
})
export class AdminLoginComponent implements OnInit {
  errorMessage: string = '';
  loginForm: FormGroup;
  myScriptElement: HTMLScriptElement | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private appService: AppService,
    private authService: AuthService
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
        if (response && response.filiere) {
          this.authService.login('admin', response.id);
          this.router.navigate(['admin/analytique/view', response.filiere.id]);
        } else {
          this.errorMessage = "l'adresse électronique et le mot de passe ne correspondent pas. Réessayez.";
        }
      },
      (error) => {
        this.errorMessage =
          "L'adresse électronique et le mot de passe ne correspondent pas. Réessayez.";
      }
    );

  }

  
  
  
}
