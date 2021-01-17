import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WasHelpfulComponent } from './was-helpful.component';

describe('WasHelpfulComponent', () => {
  let component: WasHelpfulComponent;
  let fixture: ComponentFixture<WasHelpfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WasHelpfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WasHelpfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
