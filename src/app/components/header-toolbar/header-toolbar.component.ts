import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { forAnimation } from '../../animations/route-animation';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss'],
  animations: [
    forAnimation
  ]
})
export class HeaderToolbarComponent implements OnInit {

  constructor(
    private helper: HelperService,
    private dataService: DataService,
    private router: Router
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  user = this.dataService.getSessionObj().user;
  activityId: any;
  @Input() isMobile: boolean;
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  questionCount: number;

  ngOnInit() {
    this.dataService.questionCount.subscribe((count) => {
      if(count != 0) {
        this.questionCount += 1;
      }
    });
    this.loadQuestionCount(); 
  }

  loadQuestionCount(){
    this.dataService.getData('elasticsearch/getquestioncount').subscribe((res) => {
      if(res && res.Response.Code == 200) {
        this.questionCount = res.QuestionCount ;
      }
    });
  }

  logout(){
    this.activityId = this.dataService.getSessionObj().activityId;
    let isConfirm = confirm("Are you sure you want to logout?");
    if(isConfirm){
      this.toggleMenu.emit(false);
      // if(this.activityId){
      //   this.helper.openFeedbackForm({ });
      // }
      this.dataService.clearSessionObj();
      this.router.navigate(['/']);
    }
  }

  goBackToHome(){
    this.activityId = this.dataService.getSessionObj().activityId;
    // if(this.activityId){
    //   this.helper.openFeedbackForm({ });
    // }
    this.router.navigate(['/search']);
  }

  showMostViewed(){
    this.toggleMenu.emit(true);
  }

}
