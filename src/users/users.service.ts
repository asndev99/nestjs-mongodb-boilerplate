import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
