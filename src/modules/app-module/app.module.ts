import { Module } from '@nestjs/common';
import { UserModule } from '../user-module/user.module';
import { ProfileModule } from '../profile-module/profile.module';

@Module({
  imports: [UserModule, ProfileModule],
  controllers: [],
  providers: [

  ],
})
export class AppModule { }
