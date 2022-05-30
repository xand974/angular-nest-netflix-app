import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ProfileModel } from 'netflix-malet-types';

@Component({
  selector: 'malet-manage-profile-card',
  templateUrl: './manage-profile-card.component.html',
  styleUrls: ['./manage-profile-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageProfileCardComponent implements OnInit {
  @Input() profile: ProfileModel;
  @Output() onEdit: EventEmitter<Partial<ProfileModel>>;
  @Output() onRemove: EventEmitter<string>;
  @ViewChild('imgRef') imgRef: ElementRef<HTMLImageElement>;

  private dataToUpdate: Partial<ProfileModel>;
  public editEnabled: boolean;
  public loading: boolean;
  public photoURL: SafeUrl;

  /**
   * @param {DomSanitizer} sanitizer
   */
  constructor(private sanitizer: DomSanitizer) {
    this.profile = {} as ProfileModel;
    this.dataToUpdate = {};
    this.imgRef = {} as ElementRef<HTMLImageElement>;

    this.onEdit = new EventEmitter<Partial<ProfileModel>>();
    this.onRemove = new EventEmitter<string>();

    this.editEnabled = false;
    this.loading = false;
    this.photoURL = '';
  }

  /**
   * on init
   */
  ngOnInit(): void {
    this.dataToUpdate = { ...this.dataToUpdate, _id: this.profile._id };
    this.photoURL = this.profile.photoURL ?? '';
  }

  /**
   * @description
   * set edited to true
   */
  edit() {
    this.editEnabled = true;
  }

  /**
   * on name change
   * @EventEmitter
   * @param {Event} event
   */
  onNameChange(event: any) {
    const text = event.target.innerHTML;
    this.dataToUpdate = { ...this.dataToUpdate, name: text };
  }

  /**
   * remove
   */
  remove() {
    this.onRemove.emit(this.profile._id);
  }

  /**
   * edit done
   */
  editDone() {
    this.onEdit.emit(this.dataToUpdate);
    this.editEnabled = false;
  }

  /**
   *
   * @param {Event & {target : {files : any[] }}} event
   * @returns
   */
  uploadImg(event: any) {
    this.loading = true;
    const file = event.target.files[0];
    if (!file) return;
    const blob = URL.createObjectURL(file);
    this.photoURL = this.sanitizer.bypassSecurityTrustUrl(blob);
    event.target.files = [];
    this.loading = false;
  }
}
