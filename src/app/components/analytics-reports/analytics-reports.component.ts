import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { forAnimation } from '../../animations/route-animation';

@Component({
  selector: 'app-analytics-reports',
  templateUrl: './analytics-reports.component.html',
  styleUrls: ['./analytics-reports.component.scss'],
  animations: [
    forAnimation
  ]
})
export class AnalyticsReportsComponent implements OnInit {

  constructor(
    private loader: LoadingService,
    private dataService: DataService,
    private router: Router
  ) {
    this.dataService.setViewState('workspace');
  }
  
  viewState: string = 'feedback';

  ngOnInit() {
    this.loader.hide();
  }

  ngOnDestroy(){
    this.loader.show();
  }

  goBackToHome(){
    this.router.navigate(['/search']);
  }

  viewReport(state: string) {
    this.viewState = state;
  }

}
