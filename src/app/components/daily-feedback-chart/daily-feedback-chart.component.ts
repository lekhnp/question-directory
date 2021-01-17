import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-daily-feedback-chart',
  templateUrl: './daily-feedback-chart.component.html',
  styleUrls: ['./daily-feedback-chart.component.scss']
})
export class DailyFeedbackChartComponent implements OnInit {

  constructor() { }

  options: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{
      ticks: {
        beginAtZero: true,
        max: 140
      }
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  labels: Label[] = ['15/11/2019', '16/11/2019', '17/11/2019', '18/11/2019', '19/11/2019', '20/11/2019', '21/11/2019'];
  data: ChartDataSets[] = [
    { data: [85, 25, 65, 74, 92, 50, 43], label: 'Good', backgroundColor: '#64B5F6' },
    { data: [7, 30, 20, 14, 34, 10, 20], label: 'Bad', backgroundColor: '#F06292' }        
  ];;
  type: ChartType = 'bar';
  legend = true;
  plugins = [pluginDataLabels];

  ngOnInit() {
  }

}
