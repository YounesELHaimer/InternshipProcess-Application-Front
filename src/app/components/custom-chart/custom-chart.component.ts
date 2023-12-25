import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-custom-chart',
  templateUrl: './custom-chart.component.html',
  styleUrls: ['./custom-chart.component.css']
})
export class CustomChartComponent implements OnInit {
  filiereId: number | undefined;
  chart: Chart = new Chart({
    chart: {
      type: 'bar',
      height: 225
    },
    title: {
      text: 'Etudiant Statistiques par Niveau'
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: 'Number of Students'
      }
    },
    series: [],
    credits: {
      enabled: false
    }
  });

  constructor(private route: ActivatedRoute, private appService: AppService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.filiereId = +params['filiereId'];
      this.loadStats();
    });
  }

  loadStats() {
    // Fetch etudiant data
    this.appService.getEtudiantsByFiliereId(this.filiereId!).subscribe(
      (etudiants) => {
        console.log('Etudiants:', etudiants);
        // Fetch stats data
        this.appService.getStatsByNiveau(this.filiereId!).subscribe(
          (stats) => {
            console.log('Stats:', stats);
            // Process the data and update the chart
            this.updateChart(etudiants, stats);
          },
          (error) => console.error('Error fetching statistics', error)
        );
      },
      (error) => console.error('Error fetching etudiants', error)
    );
  }
  updateChart(etudiants: any[], stats: any[]) {
    // Process the data and update the chart
    // Assuming stats is an array of objects with properties: niveau, stagesTrouves, stagesNonTrouves
    console.log('Updating chart with etudiants and stats:', etudiants, stats);
  
    const categories = stats.map((stat) => stat[0]); // Accessing the niveau from the subarray
  
    const seriesData = stats.map((stat) => {
      const niveau = stat[0];
      const totalEtudiants = etudiants.filter((etudiant) => etudiant.niveau === niveau).length;
      const stagesTrouves = stat[1];
      const stagesNonTrouves = stat[2];
  
      return {
        name: niveau,
        data: [stagesTrouves, stagesNonTrouves],
        color: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6) // Random color
      };
    });
  
    console.log('Chart categories and seriesData:', categories, seriesData);
  
    // Check if the series data is present
    if (seriesData.length > 0) {
      this.chart = new Chart({
        chart: {
          type: 'bar',
          height: 225
        },
        title: {
          text: 'Etudiant Statistiques par Niveau'
        },
        xAxis: {
          categories: categories
        },
        yAxis: {
          title: {
            text: 'Number of Students'
          }
        },
        series: seriesData as any,
        credits: {
          enabled: false
        }
      });
  
      console.log('Chart updated successfully.');
    } else {
      console.error('Series data is empty.');
    }
  }
  
  
}
