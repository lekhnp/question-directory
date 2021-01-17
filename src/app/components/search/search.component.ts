import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { CategoryIcons } from '../../data/category-list';
import { HelperService } from '../../services/helper.service';
import { forAnimation } from '../../animations/route-animation';

const uuid = require('uuid/v4');

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    forAnimation
  ]
})
export class SearchComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
    private loader: LoadingService,
    private helper: HelperService
  ) {
    this.dataService.setViewState('workspace');
    this.setMostViewedCategory();
  }

  user = this.dataService.getSessionObj().user;
  activityId = this.dataService.getSessionObj().activityId;
  private context = "elasticsearch/searchDocumentSuggestion";
  searchField = new FormControl('');
  categoryField = new FormControl(''); 
  questionData: any; 
  isLoading = false;
  categoryList: any; 
  categoryIcons = CategoryIcons;

  ngOnInit() {
    this.loader.show();
    this.loadCategories();
    this.initAutoSearch();
    this.resetActivityId();
  }

  ngOnDestroy(){
    this.loader.show();
  }

  resetActivityId(){
    if(this.user.role == 'operator' && !this.activityId){
      let activityId = uuid();
      this.activityId = activityId;
      this.dataService.setLocalStorageObj({activityId:activityId});
    }
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
              return this.dataService.loadData(this.context, { SuggestionTerm: value, CategoryId: this.categoryField.value })
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

  viewDetail(obj: any){
    this.searchField.setValue(obj.QuestionText);
    this.dataService.modifyNavData(0);
    //this.dataService.setDocumentDetail(obj);
    this.saveUserActivity(obj.QuestionId, null);
    this.router.navigate(['/details',obj.QuestionId]);
  }

  search(keyword: any, category: string){
    if(keyword) {
      this.saveUserActivity(null, keyword);
      this.router.navigate(['/results',keyword,category]);
    }
  }

  viewByCategory(category: any){
    this.saveUserActivity(category.CategoryName, null)
    this.router.navigate(['/results','byCategory',category.CategoryId]);
  }

  onCategoryChange(CategoryId: any) {
    this.searchField.setValue('');
  }

  loadCategories(){
    this.dataService.getData('elasticsearch/getCategory').subscribe((res) => {
      this.loader.hide();
      if(res && res.Response.Code == 200) {
        this.categoryList = res.lstCategory;
      }
    })
  }

  setMostViewedCategory(){
    this.dataService.setMostViewedStatus({ categoryId: "" });
  }

  saveUserActivity(questionId:any, searchText: any){
    if(this.user.role == 'operator'){
      // let activityId = uuid();
     // this.dataService.setActivityId(activityId);
     //this.dataService.setSharedObj({activityId:activityId});
    //  this.dataService.setLocalStorageObj({activityId:activityId});
      let activityData = {
        UserId: this.user.userData.UserId,
        ActivityId: this.activityId,
        QuestionId: questionId,
        SearchText: searchText
      }
      this.dataService.saveData('useractivity/insert', activityData).subscribe();
    }
  }

  addNewCategory(categoryCount:number){
    this.helper.openAddCategoryForm({
      CategoryId: categoryCount+1
    }).subscribe((data:any) => {
      if(data != 'close'){
        this.loadCategories();
      }
    });
  }

}
