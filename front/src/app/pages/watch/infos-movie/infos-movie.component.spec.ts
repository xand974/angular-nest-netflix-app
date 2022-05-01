import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosMovieComponent } from './infos-movie.component';

describe('InfosMovieComponent', () => {
  let component: InfosMovieComponent;
  let fixture: ComponentFixture<InfosMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
