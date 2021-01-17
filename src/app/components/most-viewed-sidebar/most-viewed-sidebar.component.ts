import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-most-viewed-sidebar',
  templateUrl: './most-viewed-sidebar.component.html',
  styleUrls: ['./most-viewed-sidebar.component.scss']
})
export class MostViewedSidebarComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  user = this.dataService.getSessionObj().user;
  activityId = this.dataService.getSessionObj().activityId;
  isAdmin = this.user.role == 'admin' ? 0 : 1;
  private context = "elasticsearch/mostusedfaq";
  public mostViewedData: any;
  categoryList:any ;
  selectedCategory: any;

  ngOnInit() {
    this.loadCategories();
    this.dataService.mostViewedStatus.subscribe((data:any) => {
      
      let urlContext = this.context;
      if(data.categoryId){
        this.selectedCategory = this.categoryList && this.categoryList.filter(obj => obj.CategoryId == data.categoryId)[0];
        urlContext += `?categoryId=${data.categoryId}&isAdmin=${this.isAdmin}`;
      } else {
        this.selectedCategory = '';
        urlContext += `?categoryId=&isAdmin=${this.isAdmin}`;
      }
      this.getMostViewedData(urlContext);
    })
    
  }

  getMostViewedData(urlContext: string){
    this.dataService.getData(urlContext).subscribe((res) => {
      if(res && res.Response.Code == 200) {
        this.mostViewedData = res.Documents;
      }
    });
  }

  viewDetail(obj: any){
    this.dataService.modifyNavData(0);
    this.dataService.setDocumentDetail(obj);
    this.saveUserActivity(obj.QuestionId,null);
    this.router.navigate(['/details',obj.QuestionId]);
  }

  loadCategories(){
    this.dataService.getData('elasticsearch/getCategory').subscribe((res) => {
      if(res && res.Response.Code == 200) {
        this.categoryList = res.lstCategory;
      }
    })
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
