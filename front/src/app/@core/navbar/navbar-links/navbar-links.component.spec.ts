import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLinksComponent } from './navbar-links.component';

describe('NavbarLinksComponent', () => {
  let component: NavbarLinksComponent;
  let fixture: ComponentFixture<NavbarLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
