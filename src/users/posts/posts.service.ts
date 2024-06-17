import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post } from 'src/schemas/PostSchema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost() {
    try {
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getAllPosts() {
    try {
      return this.postModel.find();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findPostById(id: string) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) {
        throw new HttpException('Bad Request', 404);
      }
      return this.postModel.findById(id);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
