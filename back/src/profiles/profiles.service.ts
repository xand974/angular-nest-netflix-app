import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schema/profiles.schema';
import { Model } from 'mongoose';
import { ProfileModel } from 'netflix-malet-types';

@Injectable()
export class ProfilesService {
  private logger = new Logger(ProfilesService.name);
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {}

  async create(_profile: ProfileModel) {
    const profile = new this.profileModel({ ..._profile });
    const newProfile = await profile.save();
    this.logger.log(
      `${profile.id} : new profile created for user${profile.userId}`,
    );
    return newProfile;
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

    const updatedProfile = await profile.updateOne({
      $set: { ...profile },
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
    await profile.delete();
  }
}
