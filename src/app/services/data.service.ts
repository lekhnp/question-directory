import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': '',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  // to update data of sub question throw service
  private subQuesDataSource = new BehaviorSubject(0);
  subQuesStatus = this.subQuesDataSource.asObservable();

  // to update data of sub question throw service
  private quesCountDataSource = new BehaviorSubject(0);
  questionCount = this.quesCountDataSource.asObservable();

  // to update most viewed count throw service
  private mostViewedDataSource = new BehaviorSubject({ count: 0 });
  mostViewedStatus = this.mostViewedDataSource.asObservable();

  // below var are to store/share document detail
  private documentDataSource = new BehaviorSubject({});
  documentDetails = this.documentDataSource.asObservable();

  private navDataSource = new BehaviorSubject([]);
  breadcrumbData = this.navDataSource.asObservable();

  private dataSource = new BehaviorSubject({});
  sharedObj = this.dataSource.asObservable();
  
  baseUrl = environment.baseUrl;

  setDocumentDetail(data: any) {
    this.documentDataSource.next(data);
  }

  setSubQuesStatus() {
    let count: number;
    this.subQuesStatus.subscribe((num) => {
      count = num;
      count++;
    });
    this.subQuesDataSource.next(count);
  }

  setQuestionCount() {
    let count: number;
    this.questionCount.subscribe((num) => {
      count = num;
      count++;
    });
    this.quesCountDataSource.next(count);
  }

  setMostViewedStatus(data?:any) {
    let count: number;
    let dataObj: any = {};
    this.mostViewedStatus.subscribe((obj:any) => {
      dataObj = obj;
      dataObj.count++;
    });
    this.mostViewedDataSource.next({ ...dataObj, ...data }); 
  }

  setNavData(data: any) {
    let navData = [];
    this.breadcrumbData.subscribe((navObj) => {
      navData = navObj;
    });
    let isFound = navData.every(obj => obj.questionId != data.questionId)
    if(isFound){
      navData.push(data);
    }
    this.navDataSource.next(navData);
  }

  modifyNavData(index: number) {
    let navData = [];
    this.breadcrumbData.subscribe((navObj) => {
      navData = navObj;
    });
    navData.splice(index);
    this.navDataSource.next(navData);
  }

  setSharedObj(data: {}) {
    let dataObj: {};
    let shareObj: {};
    this.sharedObj.subscribe((obj) => {
      dataObj = obj;
      shareObj = { ...dataObj, ...data };
    });
    this.dataSource.next(shareObj);
  }

  getData(context: string) {
    let url = `${this.baseUrl}${context}`;
    return this.httpClient.get<any>(url,httpOptions);
  }

  loadData(context: string, data: any) {
    let url = `${this.baseUrl}${context}`;
    return this.httpClient.post<any>(url,data,httpOptions);
  }

  saveData(context: string, data: any) {
    let url = `${this.baseUrl}${context}`;
    return this.httpClient.post<any>(url,data,httpOptions);
  }

  setViewState(view: string) {
    this.dataSource.next({
      viewState: view
    });
  }

  setActivityId(id: string) {
    this.dataSource.next({
      activityId: id
    });
  }

  setLocalStorageObj(data: {}) {
    let dataObj = JSON.parse(sessionStorage.getItem("sessionObj"));
    let storedObj = { ...dataObj, ...data };
    sessionStorage.setItem("sessionObj", JSON.stringify(storedObj))
  }

  getSessionObj() {
    return JSON.parse(sessionStorage.getItem("sessionObj"));
  }

  clearSessionObj() {
    sessionStorage.clear();
  }

}
