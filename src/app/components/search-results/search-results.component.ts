import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { HelperService } from '../../services/helper.service';
import { LoadingService } from '../../services/loading.service';
import { forAnimation } from '../../animations/route-animation';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  animations: [
    forAnimation
  ]
})
export class SearchResultsComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private helper: HelperService,
    private loader: LoadingService
  ) {
    this.dataService.setViewState('workspace'); 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.setMostViewedCategory();
  }

  user = this.dataService.getSessionObj().user;
  activityId = this.dataService.getSessionObj().activityId;
  public results: any;
  public didYouMean: any;
  private context = {
    search: "elasticsearch/search",
    autoSearch: "elasticsearch/searchDocumentSuggestion",
    byCategory: "elasticsearch/levelbasedsearch"
  };
  questionData: any; 
  isLoading = false;
  public keyword = this.route.snapshot.paramMap.get('keyword');
  public categoryId = this.route.snapshot.paramMap.get('category');
  searchField = new FormControl('');
  categoryField = new FormControl('');
  categoryList:any ;
  selectedCategory: any;
  sharedData: any ;
  page: number = 1;

  ngOnInit() {
    this.setSearchValue();
    this.loadCategories();
    this.initAutoSearch();
    this.loadResults();
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

  loadResults(){
    if(this.keyword == 'byCategory') {
      let categoryData = {
        CategoryId: this.categoryId,
        LevelId: '1'
      };
      this.dataService.loadData(this.context.byCategory, categoryData).subscribe((res) => {
        this.loader.hide();
        if(res && res.Response.Code == 200){
          this.results = res.Documents;
        }
      })

    } else {
      let searchData = {
        SearchTerm: this.keyword, 
        CategoryId: this.categoryField.value
      };
      this.dataService.loadData(this.context.search, searchData).subscribe((res) => {
        this.loader.hide();
        if(res && res.Response.Code == 200) {
          this.results = res.Documents;
          this.didYouMean = res.DidYouMean;
        }
      });
    }
  }

  viewDetail(obj: any, keyword: string){
    if(keyword === 'none'){
      this.searchField.setValue(obj.QuestionText);
    }
    // if(keyword){
    //   let navData = {
    //     questionId: [keyword,this.categoryField.value],
    //     questionText: keyword,
    //     path: '/results'
    //   }
    //   this.dataService.setNavData(navData);
    // }
    this.dataService.modifyNavData(0);
    //this.dataService.setDocumentDetail(obj);
    this.saveUserActivity(obj.QuestionId,null);
    this.router.navigate(['/details',obj.QuestionId]);
  }

  search(keyword: any, category: string){
    if(keyword) {
      this.saveUserActivity(null, keyword);
      this.router.navigate(['/results',keyword,category]);
    }
  }

  onCategoryChange(CategoryId: any) {
    this.searchField.setValue('');
  }

  createRequest(){
    this.helper.openServiceRequestForm({}); 
  }

  loadCategories(){
    this.dataService.getData('elasticsearch/getCategory').subscribe((res) => {
      if(res && res.Response.Code == 200) {
        this.categoryList = res.lstCategory;
        this.selectedCategory = this.categoryList.filter(obj => obj.CategoryId == this.categoryId)[0];
      }
    })
  }

  setSearchValue(){
    if(this.keyword != 'byCategory'){
      this.searchField.setValue(this.keyword);
    }
    this.categoryField.setValue(this.categoryId);
  }

  createQuestion(){
    this.helper.openFormDialog({ currentCategory: this.selectedCategory });
  }

  setMostViewedCategory(){
    this.dataService.setMostViewedStatus({ categoryId: this.categoryId });
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

}
