import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'
import { Etudiant } from './Etudiant';
import { ChefFiliere } from './ChefFiliere';
import { Filiere } from './Filiere';
import { Stage } from './Stage';

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
  
  getEtudiantsByFiliereId(id: number): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.url}${id}/etudiants`);
  }
  getFiliereById(id: number): Observable<Filiere> {
    return this.http.get<Filiere>(`${this.url}${id}`);
  }
  getStagesByFiliereId(filiereId: number): Observable<Stage[]> {
    return this.http.get<Stage[]>(`${this.url}${filiereId}/stages`);
  }
  
  
}