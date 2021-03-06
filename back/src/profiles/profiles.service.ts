import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schema/profiles.schema';
import { Model } from 'mongoose';
import { ProfileModel } from 'netflix-malet-types';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProfilesService {
  private logger = new Logger(ProfilesService.name);
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
    private readonly userService: UsersService,
  ) {}

  async create(_profile: ProfileModel, userId: string) {
    const isDefault = await this.isDefault(userId);
    const canUpdateCount = await this.userService.checkProfileCount(userId);
    if (!canUpdateCount)
      throw new HttpException(
        'cannot create another profile',
        HttpStatus.BAD_REQUEST,
      );
    const profileData = {
      name: _profile.name,
      photoURL: _profile.photoURL,
      preferences: [],
      default: isDefault ? false : true,
      userId: userId,
    } as ProfileModel;
    const profile = new this.profileModel(profileData);
    const newProfile = await profile.save();
    await this.userService.addProfileCount(userId);
    this.logger.log(
      `${profile.id} : new profile created for user${profile.userId}`,
    );
    return newProfile;
  }

  async isDefault(userId: string) {
    const allProfiles = await this.findAllFromUserId(userId);
    for (const profile of allProfiles) {
      if (profile.default) {
        return true;
      }
    }
    return false;
  }

  async getOne(name: string): Promise<Profile> {
    const profile = await this.profileModel.findOne({ name });
    if (!profile)
      throw new HttpException('no profile found', HttpStatus.BAD_REQUEST);
    this.logger.log(`profile found ${profile.id}`);

    return profile;
  }

  async getById(id: string) {
    const profile = await this.profileModel.findById({ id });
    if (!profile)
      throw new HttpException('no profile found', HttpStatus.BAD_REQUEST);
    this.logger.log(`profile found ${profile.id}`);

    return profile;
  }

  async findAllFromUserId(userId: string) {
    const profiles = await this.profileModel.find({ userId });
    if (!profiles)
      throw new HttpException('no user found', HttpStatus.BAD_REQUEST);
    this.logger.log(`all profiles found with userId: ${userId}`);

    return profiles;
  }

  public async updateOne(_profile: ProfileModel) {
    const profile = await this.profileModel.findById(_profile._id);
    if (!profile)
      throw new HttpException(
        `no profile found for ${_profile._id}`,
        HttpStatus.NOT_FOUND,
      );

    const updatedProfile = await profile.update({
      $set: { ..._profile },
      new: true,
    });
    return updatedProfile;
  }

  public async deleteOne(id: string) {
    const profile = await this.profileModel.findById(id);
    if (!profile)
      throw new HttpException(
        `no profile found for ${id}`,
        HttpStatus.NOT_FOUND,
      );
    await this.userService.removeProfileCount(profile.userId);
    await profile.delete();
  }
}
