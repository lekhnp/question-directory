import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../components/search/search.component';
import { SearchResultsComponent } from '../components/search-results/search-results.component';
import { QuestionDetailsComponent } from '../components/question-details/question-details.component';
import { LoginComponent } from '../components/login/login.component';
import { AnalyticsReportsComponent } from '../components/analytics-reports/analytics-reports.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/', 
    pathMatch: 'full' 
  },
  { 
    path: '',
    component: LoginComponent,
    data: {
      animation: 'LoginPage'
    }
  },
  { 
    path: 'search',
    component: SearchComponent,
    data: {
      animation: 'SearchPage'
    }
  },
  { 
    path: 'results/:keyword/:category',
    component: SearchResultsComponent,
    data: {
      animation: 'ResultsPage'
    }
  },
  { 
    path: 'details/:id',
    component: QuestionDetailsComponent,
    data: {
      animation: 'DetailsPage'
    }
  },
  { 
    path: 'analytics',
    component: AnalyticsReportsComponent,
    data: {
      animation: 'AnalyticsPage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
