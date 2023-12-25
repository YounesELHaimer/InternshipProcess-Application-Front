import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'
import { Etudiant } from './Etudiant';
import { ChefFiliere } from './ChefFiliere';
import { Filiere } from './Filiere';
import { Stage } from './Stage';
import { Professeur } from './Professeur';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  // Add Etudiant - Create
  addEtudiant(etudiant: Etudiant, filiereId: number){
    return this.http.post<Etudiant>(`${this.url}add/${filiereId}`, etudiant);
  }
  

  // Get Etudiants - Read
  getEtudiants(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'Etudiants')
  }

  // Get Etudiant by Id - Read
  getEtudiantById(id: number): Observable<Etudiant>{
    return this.http.get<Etudiant>(`${this.url}etudiant/${id}`)
  }

  // Update Etudiant - Update
  updateEtudiant(id?: number ,etudiant?: any): Observable<any> {
    return this.http.put<any>(`${this.url}update/${id}`, etudiant)
      .pipe(
        catchError(error => {
          console.error('Update failed:', error);
          return throwError(error);
        })
      );
  }
  

  // Delete Etudiant - Delete
  deleteEtudiant(id: number): Observable<any>{
    return this.http.delete<any>(`${this.url}delete/${id}`)
  }
  importEtudiants(file: File, filiereId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    // Ajoutez l'ID de la filière à l'URL
    return this.http.post(`${this.url}import/${filiereId}`, formData);
  }
  loginChefFiliere(email: string, motDePasse: string): Observable<ChefFiliere> {
    const loginRequest = { email: email, motDePasse: motDePasse };
    return this.http.post<ChefFiliere>(`${this.url}login`, loginRequest);
  }

  loginEtudiant(email: string, motDePasse: string): Observable<Etudiant> {
    const loginRequest = { email: email, motDePasse: motDePasse };
    return this.http.post<Etudiant>(`${this.url}loginEtudiant`, loginRequest);
  }

  getStagesByEtudiantId(id: number): Observable<Stage[]> {
    return this.http.get<Stage[]>(`${this.url}stages/etudiant/${id}`);
  }
  
  // Ajoutez une méthode pour compter le nombre d'étudiants par niveau et par statut de stage
  getStatsByNiveau(filiereId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}${filiereId}/statsByNiveau`);
  }
  getEtudiantsByFiliereId(id: number): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.url}${id}/etudiants`);
  }
  getFiliereById(id: number): Observable<Filiere> {
    return this.http.get<Filiere>(`${this.url}${id}`);
  }
  getStagesByFiliereId(filiereId: number): Observable<Stage[]> {
    return this.http.get<Stage[]>(`${this.url}${filiereId}/stages`);
  }
  //professeur
  getAllProfesseurs(): Observable<Professeur[]> {
    return this.http.get<Professeur[]>(`${this.url}professeurs`);
  }

  getProfesseurById(id: number): Observable<Professeur> {
    return this.http.get<Professeur>(`${this.url}professeurs/${id}`);
  }

  addProfesseur(professeur: Professeur): Observable<Professeur> {
    return this.http.post<Professeur>(`${this.url}addprofesseurs`, professeur);
  }

  updateProfesseur(id: number, professeur: Professeur): Observable<void> {
    return this.http.put<void>(`${this.url}professeurs/${id}`, professeur);
  }

  deleteProfesseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}professeurs/${id}`);
  }

  importProfesseurs(file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<void>(`${this.url}professeurs/import`, formData);
  } 
  assignStagesToEncadrants(encadrantIds: number[], year: string, filiereId: number): Observable<string> {
    const url = `${this.url}stages/assign/${filiereId}`;
  
    // Include encadrantIds as query parameters
    const params = new HttpParams().set('encadrantIds', encadrantIds.join(',')).set('year', year);
  
    return this.http.post<string>(url, null, { params });
  }
  
  countStagesByYearAndFiliereId(year: string, filiereId: number): Observable<number> {
    const url = `${this.url}stages/count/${filiereId}?year=${year}`;
    return this.http.get<number>(url);
  }
  countStagesByYearAndFiliereIdAndEncadrantIsNull(year: string, filiereId: number): Observable<number> {
    const url = `${this.url}stages/count/null-encadrant/${filiereId}?year=${year}`;
    return this.http.get<number>(url);
  }
  assignJuriesToStages(filiereId: number, juryIds: number[], year: string): Observable<any> {
    const url = `${this.url}stages/assign/juries/${filiereId}`;

    let params = new HttpParams().set('year', year);

    juryIds.forEach(id => {
      params = params.append('juryIds', id.toString());
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // Add any other headers if needed
    });

    return this.http.post(url, null, { headers: headers, params: params })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error.message || 'server error');
  }
  countStagesWithNullJury(year: string, filiereId: number): Observable<number> {
    const url = `${this.url}stages/count/null-jury/${filiereId}`;
    const params = new HttpParams().set('year', year);
    return this.http.get<number>(url, { params });
  }
  getNombreEtudiantsSansStage(filiereId: number): Observable<number> {
    return this.http.get<number>(`${this.url}nombreSansStage/${filiereId}`);
  }

  getNombreEtudiantsAvecStage(filiereId: number): Observable<number> {
    return this.http.get<number>(`${this.url}nombreAvecStage/${filiereId}`);
  }
  
}