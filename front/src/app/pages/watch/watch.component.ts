import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchStore } from './watch.store';
import { HomeService } from '../home/home.service';
import { MovieModel } from 'netflix-malet-types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WatchStore],
})
export class WatchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoControl') videoControl: ElementRef<HTMLVideoElement>;
  movie$: Observable<MovieModel | null>;
  public id: string;
  public isPause: boolean;
  private mouseMoving: boolean;
  private trackInterval: any;
  private trackTimeout: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cStore: WatchStore,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef
  ) {
    this.id = '';
    this.movie$ = this.cStore.movie$;
    this.videoControl = {} as ElementRef<HTMLVideoElement>;
    this.isPause = false;
    this.mouseMoving = false;
  }

  ngAfterViewInit(): void {
    this.subscribeToPlayPause();
  }

  ngOnInit(): void {
    this.initParam();
    this.initMovie();
    // this.initInterval();
  }

  private initInterval() {
    this.trackInterval = setInterval(() => {
      if (this.isPause && !this.mouseMoving) {
        this.isPause = true;
      }
    }, 1000);
  }

  initParam() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (!movieId || movieId === null) {
      this.router.navigate(['/home']);
      return;
    }
    this.id = movieId;
  }

  initMovie() {
    this.cStore.setLoading(true);
    try {
      this.cStore.setMovie(this.homeService.getMovieById(this.id));
      this.cStore.setLoading(false);
    } catch (err) {
      this.cStore.setLoading(false);
      this.cStore.setError(true);
    }
  }

  public subscribeToPlayPause(): void {
    if (!this.videoControl.nativeElement) return;
    this.videoControl.nativeElement.onpause = (event) => {
      setTimeout(() => {
        this.displayInfos(true);
      }, 1000);
      return;
    };
    this.videoControl.nativeElement.onplay = (event) => {
      this.displayInfos(false);
      return;
    };
  }

  private displayInfos(value: boolean) {
    this.isPause = value;
    this.cdr.detectChanges();
  }

  //#region HostListener
  @HostListener('mousemove')
  public onGlobalMouseMove() {
    this.mouseMoving = true;
    if (this.isPause) {
      this.isPause = false;
    }
  }
  //#endregion

  ngOnDestroy(): void {
    clearInterval(this.trackInterval);
  }
}
