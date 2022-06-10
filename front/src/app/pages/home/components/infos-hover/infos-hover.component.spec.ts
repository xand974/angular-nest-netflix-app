import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosHoverComponent } from './infos-hover.component';

describe('InfosHoverComponent', () => {
  let component: InfosHoverComponent;
  let fixture: ComponentFixture<InfosHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosHoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
