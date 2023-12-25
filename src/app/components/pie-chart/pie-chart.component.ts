import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  filiereId: number | undefined;

  chart: Chart;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.filiereId = params['filiereId'];});
    this.loadData();
  }
  constructor(private etudiantService: AppService, private route: ActivatedRoute) {
    this.chart = new Chart({
      chart: {
        type: 'pie',
        height: 325
      },
      title: {
        text: 'Nombre d\'etudiants en fonction du stage'
      },
      xAxis: {
        categories: [
          'Etudiants avec stage',
          'Etudiants sans stage'
        ]
      },
      yAxis: {
        title: {
          text: 'Nombre d\'étudiants en %'
        }
      },
      plotOptions: {
        pie: {
          size: '80%' // Vous pouvez ajuster cette valeur en fonction de vos besoins
        }
      },
      series: [
       {
        type: 'pie',
        data: []
       }
      ],
      credits: {
        enabled: false
      }
    });
  }



  loadData() {
    

    this.etudiantService.getNombreEtudiantsAvecStage(this.filiereId!).subscribe(
      (nombreAvecStage) => {
        this.etudiantService.getNombreEtudiantsSansStage(this.filiereId!).subscribe(
          (nombreSansStage) => {
            this.chart.ref!.series[0].setData([
              {
                name: 'Avec stage',
                y: nombreAvecStage,
                color: '#044342',
              },
              {
                name: 'Sans stage',
                y: nombreSansStage,
                color: '#7e0505',
              }
            ]);
          },
          (error) => console.error('Erreur lors de la récupération du nombre d\'étudiants sans stage', error)
        );
      },
      (error) => console.error('Erreur lors de la récupération du nombre d\'étudiants avec stage', error)
    );
  }
}
