import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletopViewComponent } from './tabletop-view.component';

describe('TabletopViewComponent', () => {
  let component: TabletopViewComponent;
  let fixture: ComponentFixture<TabletopViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabletopViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabletopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
