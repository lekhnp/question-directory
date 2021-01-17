import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-question-search-chart',
  templateUrl: './question-search-chart.component.html',
  styleUrls: ['./question-search-chart.component.scss']
})
export class QuestionSearchChartComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  displayedColumns: string[] = ['QuestionText', 'HitCount'];
  dataSource:any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.loadQuestionReports();
  }

  loadQuestionReports() {
    this.dataService.getData('elasticsearch/mostusedfaq?categoryId=&isAdmin=1').subscribe((res) => {
      if(res && res.Response.Code == 200) {
        this.dataSource = new MatTableDataSource(res.Documents);
        this.dataSource.sort = this.sort;
      }
    });
  }

}
