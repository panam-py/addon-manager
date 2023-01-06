import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { AddonModule } from './addon/addon.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, BrandModule, AddonModule, DatabaseModule],
})
export class AppModule {}
