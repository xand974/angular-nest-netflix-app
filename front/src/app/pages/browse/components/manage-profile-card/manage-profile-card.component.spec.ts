import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProfileCardComponent } from './manage-profile-card.component';

describe('ManageProfileCardComponent', () => {
  let component: ManageProfileCardComponent;
  let fixture: ComponentFixture<ManageProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProfileCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
