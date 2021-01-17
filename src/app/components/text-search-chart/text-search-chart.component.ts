import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatTableDataSource, MatSort } from '@angular/material';

const SearchData = [
  { Keyword: 'Pure Software', RelatedQuestionCount: 7, SearchCount: 240 },
  { Keyword: 'Hiring', RelatedQuestionCount: 20, SearchCount: 189 },
  { Keyword: 'Policy', RelatedQuestionCount: 10, SearchCount: 165 },
  { Keyword: 'Reimbursement', RelatedQuestionCount: 32, SearchCount: 120 },
  { Keyword: 'Leave Policy', RelatedQuestionCount: 14, SearchCount: 80 },
  { Keyword: 'Salary Slip', RelatedQuestionCount: 43, SearchCount: 77 },
  { Keyword: 'Billing', RelatedQuestionCount: 9, SearchCount: 73 },
  { Keyword: 'Procurement', RelatedQuestionCount: 4, SearchCount: 68 },
  { Keyword: 'Travel Policy', RelatedQuestionCount: 24, SearchCount: 45 }
];

@Component({
  selector: 'app-text-search-chart',
  templateUrl: './text-search-chart.component.html',
  styleUrls: ['./text-search-chart.component.scss']
})
export class TextSearchChartComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['Keyword', 'RelatedQuestionCount', 'SearchCount'];
  dataSource = new MatTableDataSource(SearchData);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
