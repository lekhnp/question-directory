import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  public isLoading = new BehaviorSubject<boolean>(true);

  show(){
    this.isLoading.next(true);
  }

  hide(){
    //setTimeout(() => {
      this.isLoading.next(false);
    //},500);
  }
  
}
