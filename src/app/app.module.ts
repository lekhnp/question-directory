import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './components/root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/app-material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';

import { MostViewedSidebarComponent } from './components/most-viewed-sidebar/most-viewed-sidebar.component';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LoginComponent } from './components/login/login.component';
import { ServiceRequestComponent } from './components/service-request/service-request.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { WasHelpfulComponent } from './components/was-helpful/was-helpful.component';
import { LoadingComponent } from './components/loading/loading.component';
import { QuestionTreeViewComponent } from './components/question-tree-view/question-tree-view.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { AddCategoryFormComponent } from './components/add-category-form/add-category-form.component';
import { AnalyticsReportsComponent } from './components/analytics-reports/analytics-reports.component';
import { DailyFeedbackChartComponent } from './components/daily-feedback-chart/daily-feedback-chart.component';
import { OverallFeedbackChartComponent } from './components/overall-feedback-chart/overall-feedback-chart.component';
import { CategoryBiseFeedbackChartsComponent } from './components/category-bise-feedback-charts/category-bise-feedback-charts.component';
import { DailyServiceRequestChartComponent } from './components/daily-service-request-chart/daily-service-request-chart.component';
import { CategoryBiseServiceRequestChartComponent } from './components/category-bise-service-request-chart/category-bise-service-request-chart.component';
import { QuestionSearchChartComponent } from './components/question-search-chart/question-search-chart.component';
import { TextSearchChartComponent } from './components/text-search-chart/text-search-chart.component';
import { FeedbackTableComponent } from './components/feedback-table/feedback-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MostViewedSidebarComponent,
    HeaderToolbarComponent,
    SearchComponent,
    SearchResultsComponent,
    QuestionDetailsComponent,
    QuestionFormComponent,
    TruncatePipe,
    LoginComponent,
    ServiceRequestComponent,
    FeedbackFormComponent,
    WasHelpfulComponent,
    LoadingComponent,
    QuestionTreeViewComponent,
    ClickStopPropagationDirective,
    AddCategoryFormComponent,
    AnalyticsReportsComponent,
    DailyFeedbackChartComponent,
    OverallFeedbackChartComponent,
    CategoryBiseFeedbackChartsComponent,
    DailyServiceRequestChartComponent,
    CategoryBiseServiceRequestChartComponent,
    QuestionSearchChartComponent,
    TextSearchChartComponent,
    FeedbackTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
    NgxPaginationModule,
    ChartsModule
  ],
  providers: [],
  entryComponents: [
    QuestionFormComponent,
    ServiceRequestComponent,
    FeedbackFormComponent,
    AddCategoryFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
