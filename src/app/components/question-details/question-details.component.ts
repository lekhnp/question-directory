import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { LoadingService } from '../../services/loading.service';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { forAnimation } from '../../animations/route-animation';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss'],
  animations: [
    forAnimation
  ]
})
export class QuestionDetailsComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private helper: HelperService,
    private loader: LoadingService
  ) {
    this.dataService.setViewState('workspace');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  user = this.dataService.getSessionObj().user;
  activityId = this.dataService.getSessionObj().activityId;
  public documentData: any;
  private context = {
    question: "elasticsearch/question",
    hitCount: "elasticsearch/updatehitcount",
    autoSearch: "elasticsearch/searchDocumentSuggestion",
  };
  private documentId = this.route.snapshot.paramMap.get('id');
  public breadcrumbs: any;
  questionData: any; 
  isLoading = false;
  searchField = new FormControl('');
  categoryField = new FormControl('');
  categoryList:any ;

  ngOnInit() {
    this.dataService.subQuesStatus.subscribe((count) => {
      this.loadDocumentDetails();
    });
    this.loadCategories();
    this.initAutoSearch();
    this.updateHitCount();
    this.getBreadcrumbs();
  }

  ngOnDestroy(){
    this.loader.show();
  }

  initAutoSearch() {
    this.searchField.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.questionData = undefined;
          this.isLoading = true;
        }),
        switchMap((value) => {
          if(typeof value == "string" && value != ''){
            return this.dataService.loadData(this.context.autoSearch, { SuggestionTerm: value, CategoryId: this.categoryField.value })
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
          } else {
            return [];
          }
        }
        )
      )
      .subscribe((data) => {
        this.isLoading = false;
        if (data && data.Response.Code == 200) {
          this.questionData = data.Documents;
        } else {
          this.questionData = undefined;
        }
      });
  }

  loadDocumentDetails(){
    let urlContext = `${this.context.question}?questionId=${this.documentId}`
    this.dataService.loadData(urlContext, {}).subscribe((res) => {
      this.loader.hide();
      if(res && res.Response.Code == 200) {
        this.documentData = res.Documents;
        this.categoryField.setValue(this.documentData.Category.CategoryId);
        this.setMostViewedCategory();
        this.setBreadcrumb();
      }
    });
    // this.dataService.documentDetails.subscribe((data: any) => {
    //   if(data && data.QuestionId) {
    //     this.documentData = data;
    //   } else {
    //     let urlContext = `${this.context.question}?questionId=${this.documentId}`
    //     this.dataService.loadData(urlContext, {}).subscribe((res) => {
    //       if(res && res.Response.Code == 200) {
    //         this.documentData = res.Documents;
    //       }
    //     });
    //   }
    // });
  }

  updateHitCount(){
    setTimeout(() => {
      let urlContext = `${this.context.hitCount}?questionId=${this.documentId}`
      this.dataService.loadData(urlContext, {}).subscribe((res) => {
        if(res && res.Code == 200) {
          //alert("updated hit count");
          this.dataService.setMostViewedStatus();
        }
      });
    },1000);
  }

  createSubQuestion(){
    this.helper.openFormDialog({ 
      ParentQuestionId: this.documentId,
      ParentQuestionText: this.documentData.QuestionText,
      currentCategory: this.documentData.Category,
      ParentQuestionLevel: this.documentData.QuestionLevel
    });
  }

  viewDetail(obj: any){
    this.searchField.setValue(obj.QuestionText);
    let navData = {
      questionId: this.documentData.QuestionId,
      questionText: this.documentData.QuestionText,
      path: `/details/${this.documentData.QuestionId}`
    }
    this.saveUserActivity(obj.QuestionId,null);
    this.dataService.setNavData(navData);
    this.router.navigate(['/details',obj.QuestionId]);
  }

  getBreadcrumbs(){
    this.dataService.breadcrumbData.subscribe((data) => {
      this.breadcrumbs = data;
    });
  }

  navigateLink(data: any, index: number){
    this.saveUserActivity(data.questionId,null);
    this.dataService.modifyNavData(index);
    this.router.navigate([data.path]);
  }

  setMostViewedCategory(){
    this.dataService.setMostViewedStatus({ categoryId: this.documentData.Category.CategoryId });
  }

  setBreadcrumb(){
    this.dataService.setNavData({
      questionId: this.documentData.Category.CategoryId,
      questionText: this.documentData.Category.CategoryName,
      path: `/results/byCategory/${this.documentData.Category.CategoryId}`
    });
    if(this.documentData.ParentQuestion) {
      this.dataService.setNavData({
        questionId: this.documentData.ParentQuestion.ParentQuestionId,
        questionText: this.documentData.ParentQuestion.ParentQuestionText,
        path: `/details/${this.documentData.ParentQuestion.ParentQuestionId}`
      });
    }
  }

  goBackToHome(){
    // if(this.activityId){
    //   this.helper.openFeedbackForm({ });
    // }
    this.router.navigate(['/search']);
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

  loadCategories(){
    this.dataService.getData('elasticsearch/getCategory').subscribe((res) => {
      if(res && res.Response.Code == 200) {
        this.categoryList = res.lstCategory;
      }
    })
  }

  onCategoryChange(CategoryId: any) {
    this.searchField.setValue('');
  }

  search(keyword: any, category: string){
    if(keyword) {
      this.saveUserActivity(null, keyword);
      this.router.navigate(['/results',keyword,category]);
    }
  }

}
