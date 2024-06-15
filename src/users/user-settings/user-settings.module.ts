import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSettingSchema, UserSettings } from 'src/schemas/UserSetting';
import { UserSettingsController } from './user-settings.controller';
import { UserSettingsService } from './user-settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserSettings.name,
        schema: UserSettingSchema,
      },
    ]),
  ],
  controllers: [UserSettingsController],
  providers: [UserSettingsService],
})
export class UserSettingsModule {}
