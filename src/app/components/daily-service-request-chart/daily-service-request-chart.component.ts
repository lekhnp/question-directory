import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-daily-service-request-chart',
  templateUrl: './daily-service-request-chart.component.html',
  styleUrls: ['./daily-service-request-chart.component.scss']
})
export class DailyServiceRequestChartComponent implements OnInit {

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
    { data: [20, 50, 56, 98, 34, 60, 32], label: 'Service Request' }    
  ];;
  type: ChartType = 'line';
  legend = false;
  plugins = [pluginDataLabels];

  ngOnInit() {
  }

}
