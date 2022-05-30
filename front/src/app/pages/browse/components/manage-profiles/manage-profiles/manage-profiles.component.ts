import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
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

  public loading: boolean;

  constructor(
    private ref: NbDialogRef<ManageProfilesComponent>,
    private browseService: BrowseService
  ) {
    this.profiles = [];
    this.onEdit = new EventEmitter<Partial<ProfileModel>>();
    this.onRemove = new EventEmitter<string>();
    this.loading = false;
  }

  ngOnInit(): void {}

  public dismiss() {
    this.ref.close({
      data: 'close',
    });
  }

  async edit(data: Partial<ProfileModel>) {
    try {
      this.loading = true;
      const { _id, ...rest } = data;
      if (!_id) return;
      await this.browseService.updateProfile(_id, rest);
      this.loading = false;
      this.onEdit.emit(data);
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  async remove(id: string) {
    this.loading = true;
    await this.browseService.removeProfile(id);
    this.onRemove.emit(id);
    this.loading = false;
  }
}
