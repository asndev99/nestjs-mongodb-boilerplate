import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
