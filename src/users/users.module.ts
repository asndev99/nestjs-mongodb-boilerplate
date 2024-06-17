import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/UserSchema';
import { UserSettingSchema, UserSettings } from 'src/schemas/UserSetting';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserSettings.name,
        schema: UserSettingSchema,
      },
    ]),
    PostsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
