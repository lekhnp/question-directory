import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoadingService } from '../../services/loading.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';
import { pageAnimation } from '../../animations/route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    pageAnimation 
  ]
})
export class AppComponent {

  constructor(
    private dataService: DataService,
    private loader: LoadingService,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher
  ){
    this.initLoading();
    this.mobileQuery = media.matchMedia('(max-width: 700px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
      this.initSidenav();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  mobileQuery: MediaQueryList;
  sharedData: any ;
  isSidenavOpen = false;
  loading = true;
  private _mobileQueryListener: () => void;
  isSidenavToggle = false;

  ngOnInit() {
    this.initSharedData();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  initSharedData(){
    this.dataService.sharedObj.subscribe((data) => {
      this.sharedData = data;
      this.initSidenav();
    });
  }

  initSidenav(){
    if(this.mobileQuery.matches) {
      this.isSidenavOpen = false;
    } else {
      if(this.sharedData.viewState && !this.isSidenavToggle){
        this.isSidenavOpen = true;
      } else {
        this.isSidenavOpen = false;
      }
    }
  }

  toggleSidebar(event:boolean){
    this.isSidenavToggle = event;
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  initLoading(){
    this.loader.isLoading.subscribe((state) => {
      this.loading = state;
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
