import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSearchChartComponent } from './question-search-chart.component';

describe('QuestionSearchChartComponent', () => {
  let component: QuestionSearchChartComponent;
  let fixture: ComponentFixture<QuestionSearchChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSearchChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSearchChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
