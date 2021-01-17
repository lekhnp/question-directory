import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-feedback-table',
  templateUrl: './feedback-table.component.html',
  styleUrls: ['./feedback-table.component.scss']
})
export class FeedbackTableComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  displayedColumns: string[] = ['CreatedDate', 'UserName', 'ActivityText', 'RatingText'];
  dataSource:any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.loadRatingReports();
  }

  loadRatingReports() {
    this.dataService.getData('useractivity/getfeedback').subscribe((res) => {
      if(res && res.Response.Code == 200) {
        this.dataSource = new MatTableDataSource(res.LstFeedback.map((obj) => {
          let feedbackObj = { 
            ...obj,
            ActivityText: obj.ActivityText ? obj.ActivityText.split(' #@ ') : obj.ActivityText
          }
          return feedbackObj;
        }));
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

}
