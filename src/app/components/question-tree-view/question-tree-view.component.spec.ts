import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTreeViewComponent } from './question-tree-view.component';

describe('QuestionTreeViewComponent', () => {
  let component: QuestionTreeViewComponent;
  let fixture: ComponentFixture<QuestionTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
