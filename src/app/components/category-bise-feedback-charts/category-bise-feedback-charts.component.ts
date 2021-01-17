import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-category-bise-feedback-charts',
  templateUrl: './category-bise-feedback-charts.component.html',
  styleUrls: ['./category-bise-feedback-charts.component.scss']
})
export class CategoryBiseFeedbackChartsComponent implements OnInit {

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
          return "";
        },
      },
    }
  };
  labels: Label[] = ["Human Resource", "Finance", "Facilities & Administration", "Customer Services (CRM)", "Sales & Marketing", "Procurement (SRM)", "Corporate Performance & Governance"];
  data: ChartDataSets[] = [
    { data: [28, 70, 40, 19, 40, 21, 50], label: 'Bad' },
    { data: [80, 40, 90, 81, 56, 70, 30], label: 'Good' }    
  ];
  type: ChartType = 'radar';
  legend = true;
  plugins = [pluginDataLabels];

  ngOnInit() {
  }

}
