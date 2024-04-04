import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbMenuSetComponent } from './breadcrumb-menu-set.component';

describe('BreadcrumbMenuSetComponent', () => {
  let component: BreadcrumbMenuSetComponent;
  let fixture: ComponentFixture<BreadcrumbMenuSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbMenuSetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcrumbMenuSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
