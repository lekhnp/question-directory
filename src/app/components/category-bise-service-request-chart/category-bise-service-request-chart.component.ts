import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-category-bise-service-request-chart',
  templateUrl: './category-bise-service-request-chart.component.html',
  styleUrls: ['./category-bise-service-request-chart.component.scss']
})
export class CategoryBiseServiceRequestChartComponent implements OnInit {

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
  labels: Label[] = ["Human Resource", "Finance", "Facilities & Administration", "Customer Services (CRM)", "Sales & Marketing", "Procurement (SRM)", "Corporate Performance & Governance"];
  data: number[] = [20, 50, 56, 98, 34, 60, 32];
  type: ChartType = 'doughnut';
  legend = true;
  plugins = [pluginDataLabels];
  colors = [{
    backgroundColor: ['#E57373', '#7986CB', '#BA68C8', '#64B5F6', '#FFB74D', '#81C784', '#F06292'],
  }];

  ngOnInit() {
  }

}
