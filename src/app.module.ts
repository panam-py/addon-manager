import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { AddonModule } from './addon/addon.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, BrandModule, AddonModule, DatabaseModule, AuthModule],
})
export class AppModule {}
