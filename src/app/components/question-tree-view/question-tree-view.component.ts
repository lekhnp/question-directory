import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-question-tree-view',
  templateUrl: './question-tree-view.component.html',
  styleUrls: ['./question-tree-view.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({height: '0px'}),
        animate('200ms ease-in', style({height: '*'}))
      ]),
      transition(':leave', [
        style({height: '*'}),
        animate('200ms ease-in', style({height: '0px'}))
      ])
    ])
  ]
})
export class QuestionTreeViewComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
  ) { }

  user = this.dataService.getSessionObj().user;
  activityId = this.dataService.getSessionObj().activityId;
  @Input() treeData: any;
  private context = "elasticsearch/question";

  ngOnInit() {
    this.initExpanded();
  }

  initExpanded(){
    this.treeData.forEach((element: any, index: number) => {
      this.treeData[index].expended = false;
      this.treeData[index].loading = false;
    });
  }

  expend(obj:any){
    if(!obj.expended && obj.RelatedQuestions.length == 0){
      this.saveUserActivity(obj.QuestionId,null);
      obj.loading = true;
      let urlContext = `${this.context}?questionId=${obj.QuestionId}`
      this.dataService.loadData(urlContext, {}).subscribe((res) => {
        obj.loading = false;
        if(res && res.Response.Code == 200) {
          if(res.Documents.RelatedQuestions.length > 0) {
            obj.RelatedQuestions = res.Documents.RelatedQuestions;
            obj.expended = true;
          } else {
            this.router.navigate(['/details',obj.QuestionId]);
          }
        }
      });
    } else {
      obj.expended = !obj.expended;
    }
  }

  saveUserActivity(questionId:any, searchText: any){
    if(this.user.role == 'operator'){
      let activityData = {
        UserId: this.user.userData.UserId,
        ActivityId: this.activityId,
        QuestionId: questionId,
        SearchText: searchText
      }
      this.dataService.saveData('useractivity/insert', activityData).subscribe();
    }
  }

}
