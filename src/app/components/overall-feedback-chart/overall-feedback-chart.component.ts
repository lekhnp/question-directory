import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-overall-feedback-chart',
  templateUrl: './overall-feedback-chart.component.html',
  styleUrls: ['./overall-feedback-chart.component.scss']
})
export class OverallFeedbackChartComponent implements OnInit {

  constructor() { }

  options: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    plugins: {
      datalabels: {
        color: 'white',
        formatter: (value, ctx) => {
          const label = value; //ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  labels: Label[] = ["Good", "Bad"];
  data: number[] = [350, 50];
  type: ChartType = 'pie';
  legend = true;
  plugins = [pluginDataLabels];
  colors = [{
    backgroundColor: ['#64B5F6', '#F06292'],
  }];

  ngOnInit() {
  }

}
