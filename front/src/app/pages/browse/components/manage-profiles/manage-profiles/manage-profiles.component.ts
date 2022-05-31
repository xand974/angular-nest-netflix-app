import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { ProfileModel } from 'netflix-malet-types';
import { NbDialogRef } from '@nebular/theme';
import { BrowseService } from '../../../browse.service';

@Component({
  selector: 'malet-manage-profiles',
  templateUrl: './manage-profiles.component.html',
  styleUrls: ['./manage-profiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageProfilesComponent implements OnInit {
  @Input() profiles: ProfileModel[];
  @Output() onEdit: EventEmitter<Partial<ProfileModel>>;
  @Output() onRemove: EventEmitter<string>;
  private profilesToUpdate: Partial<ProfileModel>[];
  private profilesToDelete: string[];
  public loading: boolean;

  constructor(
    private ref: NbDialogRef<ManageProfilesComponent>,
    private browseService: BrowseService,
    private cdr: ChangeDetectorRef
  ) {
    this.profiles = [];
    this.profilesToUpdate = [];
    this.profilesToDelete = [];
    this.onEdit = new EventEmitter<Partial<ProfileModel>>();
    this.onRemove = new EventEmitter<string>();
    this.loading = false;
  }

  ngOnInit(): void {}

  public dismiss() {
    this.ref.close({
      data: 'close',
      profilesToUpdate: this.profilesToUpdate,
      profilesToDelete: this.profilesToDelete,
    });
  }

  async edit(data: Partial<ProfileModel>) {
    try {
      this.loading = true;
      const { _id, ...rest } = data;
      if (!_id) return;
      await this.browseService.updateProfile(_id, rest);
      this.profilesToUpdate.push(data);
      this.loading = false;
      this.cdr.detectChanges();
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  async remove(id: string) {
    try {
      this.loading = true;
      await this.browseService.removeProfile(id);
      this.profilesToDelete.push(id);
      const filtered = this.profiles.filter((item) => item._id !== id);
      this.profiles = [...filtered];
      this.loading = false;
      this.cdr.detectChanges();
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }
}
