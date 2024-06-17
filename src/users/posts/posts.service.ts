import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post } from 'src/schemas/PostSchema';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/schemas/UserSchema';
import { timeStamp } from 'console';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPost({ userId, ...createPostDto }: CreatePostDto) {
    try {
      console.log(createPostDto);
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new HttpException('User Not Found', 404);
      }
      const newPost = await this.postModel.create(createPostDto);
      await user.updateOne({ $push: { posts: newPost._id } });
      return newPost;
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
