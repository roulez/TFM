import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPublicationViewComponent } from './new-publication-view.component';

describe('NewPublicationViewComponent', () => {
  let component: NewPublicationViewComponent;
  let fixture: ComponentFixture<NewPublicationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPublicationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPublicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
