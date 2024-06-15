import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/UserSchema';
import { UserSettingsModule } from './user-settings/user-settings.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    UserSettingsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
