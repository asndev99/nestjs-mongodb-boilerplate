import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/UserSchema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSettings } from 'src/schemas/UserSetting';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    try {
      if (settings) {
        const newSettings = new this.userSettingsModel(settings);
        const savedNewSettings = await newSettings.save();
        const newUser = new this.userModel({
          ...createUserDto,
          settings: savedNewSettings._id,
        });
        return newUser.save();
      }
      const newUser = await this.userModel.create(createUserDto);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getUsers() {
    try {
      return this.userModel.find().populate('settings');
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getUserById(id: string) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) {
        throw new HttpException('User not found', 404);
      }
      const user = await this.userModel.findById(id).populate('settings');
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) {
        throw new HttpException('User not found', 404);
      }
      return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async deleteUser(id: string) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) {
        throw new HttpException('Invalid id', 404);
      }
      return await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
