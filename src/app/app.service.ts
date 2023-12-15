import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'
import { Etudiant } from './Etudiant';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  // Add Etudiant - Create
  addEtudiant(etudiant: Etudiant){
    return this.http.post<Etudiant>(`${this.url}add`, etudiant)
  }

  // Get Etudiants - Read
  getEtudiants(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'Etudiants')
  }

  // Get Etudiant by Id - Read
  getEtudiantById(id: number): Observable<Etudiant>{
    return this.http.get<Etudiant>(`${this.url}Etudiant/${id}`)
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
  importEtudiants(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.url}import`, formData);
  }
}