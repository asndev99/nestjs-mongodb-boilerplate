import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/UserSchema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userModel.create(createUserDto);
      return newUser.save();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getUsers() {
    try {
      return this.userModel.find();
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
      const user = await this.userModel.findById(id);
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
