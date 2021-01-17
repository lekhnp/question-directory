import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostViewedSidebarComponent } from './most-viewed-sidebar.component';

describe('MostViewedSidebarComponent', () => {
  let component: MostViewedSidebarComponent;
  let fixture: ComponentFixture<MostViewedSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostViewedSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostViewedSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
