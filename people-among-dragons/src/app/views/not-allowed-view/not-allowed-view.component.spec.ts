import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAllowedViewComponent } from './not-allowed-view.component';

describe('NotAllowedViewComponent', () => {
  let component: NotAllowedViewComponent;
  let fixture: ComponentFixture<NotAllowedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAllowedViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAllowedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
