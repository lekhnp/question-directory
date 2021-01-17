import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBiseFeedbackChartsComponent } from './category-bise-feedback-charts.component';

describe('CategoryBiseFeedbackChartsComponent', () => {
  let component: CategoryBiseFeedbackChartsComponent;
  let fixture: ComponentFixture<CategoryBiseFeedbackChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBiseFeedbackChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBiseFeedbackChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
