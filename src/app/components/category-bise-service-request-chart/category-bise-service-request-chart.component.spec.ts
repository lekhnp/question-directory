import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBiseServiceRequestChartComponent } from './category-bise-service-request-chart.component';

describe('CategoryBiseServiceRequestChartComponent', () => {
  let component: CategoryBiseServiceRequestChartComponent;
  let fixture: ComponentFixture<CategoryBiseServiceRequestChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBiseServiceRequestChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBiseServiceRequestChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
