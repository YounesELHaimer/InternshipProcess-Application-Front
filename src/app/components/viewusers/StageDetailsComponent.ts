import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// ... autres imports nécessaires ...

@Component({
  selector: 'app-stage-details',
  template: `
    <div class="table-container table-responsive">
                <table class="table table-striped table-bordered text-center">
                  <thead>
                    <tr>
                      
                      <th>Organisme D'accueil</th>
                      <th>Sujet</th>
                      <th>Type</th>
                      <th>Date De Début</th>
                      <th>Date Fin</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let stage of data.stages">
                    
                      <td>{{ stage.organismeDaccueil }}</td>
                      <td>{{ stage.sujet }}</td>
                      <td>{{ stage.type }}</td>
                      <td>{{ stage.dateDeDebut | date: 'dd/MM/yyyy' }}</td>
                      <td>{{ stage.dateFin | date: 'dd/MM/yyyy' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
  `,
})
export class StageDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
