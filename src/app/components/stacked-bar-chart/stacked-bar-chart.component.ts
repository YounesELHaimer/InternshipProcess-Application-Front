import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { Stage } from 'src/app/Stage';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.css']
})
export class StackedBarChartComponent implements OnInit {
  filiereId: number | undefined;

  chart: Chart;
  stages: Stage[] = [];
  colors: string[] = [];

  constructor(private stageService: AppService, private route: ActivatedRoute) {
    this.chart = new Chart({
      chart: {
        type: 'column',
        height: 350
      },
      title: {
        text: 'Nombre de Stages par Organisme d\'Accueil'
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        title: {
          text: 'Nombre de Stages'
        }
      },
      series: [
        {
          type: 'column',
          showInLegend: false,
          data: []
        }
      ],
      credits: {
        enabled: false
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.filiereId = +params['filiereId'];
    });

    this.stageService.getStagesByFiliereId(this.filiereId!).subscribe(
      (stages) => {
        this.stages = stages;
        this.updateChart();
      },
      (error) => console.error('Erreur lors de la récupération des stages', error)
    );
  }

  updateChart() {
    const organismeCounts: { [key: string]: number } = {};

    // Compter le nombre d'occurrences de chaque organisme
    this.stages.forEach((stage) => {
      const organismeKey = stage.organismeDaccueil.toLowerCase();
      organismeCounts[organismeKey] = (organismeCounts[organismeKey] || 0) + 1;
    });

    // Générer dynamiquement une palette de couleurs pour chaque barre
    this.colors = this.generateColors(Object.keys(organismeCounts).length);

    // Mettre à jour les données du graphique
    const data = Object.keys(organismeCounts).map((organisme, index) => ({
      name: organisme,
      y: organismeCounts[organisme],
      color: this.colors[index]
    }));

    this.chart.ref!.update({
      xAxis: {
        categories: data.map((point) => point.name)
      },
      series: [
        {
          data: data
        }
      ] as any
    });
  }

  generateColors(count: number): string[] {
    // Générer des couleurs avec des valeurs hexadécimales aléatoires
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      colors.push(color);
    }
    return colors;
  }
}
